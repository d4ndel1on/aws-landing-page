import {CfnOutput, Duration, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Distribution, ViewerProtocolPolicy} from "aws-cdk-lib/aws-cloudfront";
import {BlockPublicAccess, Bucket} from "aws-cdk-lib/aws-s3";
import {S3Origin} from "aws-cdk-lib/aws-cloudfront-origins";
import {AttributeType, BillingMode, Table} from "aws-cdk-lib/aws-dynamodb";
import * as path from "path";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Architecture, Runtime} from "aws-cdk-lib/aws-lambda";
import {RetentionDays} from "aws-cdk-lib/aws-logs";
import {HttpApi} from "@aws-cdk/aws-apigatewayv2-alpha";
import {HttpLambdaIntegration} from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import {Effect, PolicyStatement} from "aws-cdk-lib/aws-iam";


export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createFrontendInfrastructure()
    this.createBackendInfrastructure()

  }

  private createFrontendInfrastructure = () => {
    const hostingBucket = new Bucket(this, 'FrontendBucket', {
      autoDeleteObjects: true,
      bucketName: 'lightning-talk-frontend',
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const distribution = new Distribution(this, 'CloudfrontDistribution', {
      comment: 'lightning talk distribution',
      defaultBehavior: {
        origin: new S3Origin(hostingBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    new CfnOutput(this, 'CloudFrontURL', {
      value: distribution.domainName,
      description: 'The distribution URL',
      exportName: 'CloudfrontURL',
    });

    new CfnOutput(this, 'BucketName', {
      value: hostingBucket.bucketName,
      description: 'The name of the S3 bucket',
      exportName: 'BucketName',
    });
  }

  private createBackendInfrastructure = () => {
    const table = new Table(this, 'Table', {
      billingMode: BillingMode.PROVISIONED,
      readCapacity: 25,
      writeCapacity: 25,
      tableName: 'lightning-talk-table',
      partitionKey: {type: AttributeType.STRING, name: 'key'},
    })


    const apiLambda = new NodejsFunction(this, 'ApiLambda', {
      runtime: Runtime.NODEJS_18_X,
      timeout: Duration.seconds(5),
      architecture: Architecture.ARM_64,
      memorySize: 128,
      environment: {
        TABLE: table.tableName,
      },
      functionName: `lightning-talk-api`,
      entry: path.join(__dirname, '../src/api.ts'),
      logRetention: RetentionDays.ONE_MONTH,
      handler: 'handler',
    })

    table.grantReadWriteData(apiLambda)

    apiLambda.grantPrincipal.addToPrincipalPolicy(new PolicyStatement({
      actions: ['ses:SendEmail'],
      resources: ['*'],
      effect: Effect.ALLOW,
    }))

    const api = new HttpApi(this, 'HttpApi', {
      apiName: 'lightning-talk',
      defaultIntegration: new HttpLambdaIntegration('api-integration', apiLambda),
    })

    new CfnOutput(this, 'ApiURL', {
      value: api.apiEndpoint,
      exportName: 'ApiURL',
    })
  }
}
