import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecrDeploy from 'cdk-ecr-deployment';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets';
import { FaissDockerImageEcrDeploymentCdkStackProps } from './FaissDockerImageEcrDeploymentCdkStackProps';

export class FaissDockerImageEcrDeploymentCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FaissDockerImageEcrDeploymentCdkStackProps) {
    super(scope, id, props);

    super(scope, id, props);

    const ecrRepository = new ecr.Repository(this, `${props.appName}-${props.environment}-DockerImageEcrRepository`, {
      repositoryName: props.repositoryName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteImages: true,
      encryption: ecr.RepositoryEncryption.AES_256,
      imageScanOnPush: true,
    });

    ecrRepository.addLifecycleRule({ maxImageAge: cdk.Duration.days(7), rulePriority: 1, tagStatus: ecr.TagStatus.UNTAGGED }); // delete images older than 7 days
    ecrRepository.addLifecycleRule({ maxImageCount: 4, rulePriority: 2, tagStatus: ecr.TagStatus.ANY }); // keep last 4 images

    const dockerImageAsset = new DockerImageAsset(this, `${props.appName}-${props.environment}-DockerImageAsset`, {
      directory: path.join(__dirname, '../coreservices'),
      platform: Platform.LINUX_ARM64,
    });

    new ecrDeploy.ECRDeployment(this, `${props.appName}-${props.environment}-DockerImageECRDeployment`, {
      src: new ecrDeploy.DockerImageName(dockerImageAsset.imageUri),
      dest: new ecrDeploy.DockerImageName(`${ecrRepository.repositoryUri}:${props.imageVersion}`),
    });
  }
}
