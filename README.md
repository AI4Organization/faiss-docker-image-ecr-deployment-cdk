# CDK TypeScript Project for FAISS Docker Image ECR Deployment

This project contains the necessary configuration for deploying a FAISS Docker image to Amazon ECR using AWS CDK in TypeScript.

## Environment Variables

The deployment process uses the following environment variables, which need to be set in the `.env` file:

- `CDK_DEPLOY_REGIONS`: Comma-separated list of AWS regions where the stack will be deployed.
- `ENVIRONMENTS`: Comma-separated list of deployment environments (e.g., dev, staging, prod).
- `ECR_REPOSITORY_NAME`: Name of the ECR repository to be created or used.
- `APP_NAME`: Name of the application.
- `IMAGE_VERSION`: Version tag for the Docker image (default: 'latest').

## Project Structure

- `bin/`: Contains the CDK entry point file `faiss-docker-image-ecr-deployment-cdk.ts`.
- `lib/`: Includes the CDK stack definition and related constructs.
  - `FaissDockerImageEcrDeploymentCdkStackProps.ts`: Defines the interface for stack properties.
  - `faiss-docker-image-ecr-deployment-cdk-stack.ts`: CDK stack implementation for deploying the Docker image to ECR.
  - `faiss-docker-image-ecr-kms-deployment-cdk-stack.ts`: Alternative stack implementation using KMS for ECR encryption.
- `test/`: Jest test files for the CDK stack.
- `process-env-typed.ts`: Interface definition for typed environment variables.
- `process-env.d.ts`: Declaration of environment variables for TypeScript.

## Commands

- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm run watch`: Watches for changes and compiles TypeScript code in real-time.
- `npm run test`: Runs Jest tests defined in the `test/` directory.
- `npx cdk deploy`: Deploys the stack to AWS.

## Dependencies

- AWS CDK and related libraries for defining the infrastructure as code.
- `jest` and `ts-jest` for running tests.
- `dotenv` for loading environment variables from `.env` file.
- `typescript` for TypeScript support.

## Configuration Files

- `package.json`: Node.js project manifest with metadata and dependencies.
- `package-lock.json`: Lockfile with exact versions of dependencies.
- `tsconfig.json`: TypeScript compiler options.
- `jest.config.js`: Configuration for Jest testing framework.

## Usage

Before running deployment commands, ensure that the `.env` file is configured with the required environment variables. Then, use the provided npm scripts to build, watch, test, or deploy the CDK application.

## Security

The stack includes options for automatic image scanning on push and lifecycle rules for image retention in ECR. An alternative stack implementation demonstrates the use of KMS for ECR encryption.
