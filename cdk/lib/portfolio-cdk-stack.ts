import { RemovalPolicy, Stack, StackProps, Duration, CfnOutput, Fn } from "aws-cdk-lib"
import { Construct } from "constructs"
import { Bucket } from "aws-cdk-lib/aws-s3"
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment"
import { RetentionDays } from "aws-cdk-lib/aws-logs"
import { Function, Runtime, Code, FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda"
import { PriceClass, AllowedMethods, CachePolicy, Distribution, OriginAccessIdentity, OriginRequestCookieBehavior, OriginRequestHeaderBehavior, OriginRequestPolicy, OriginRequestQueryStringBehavior } from "aws-cdk-lib/aws-cloudfront"
import { HttpOrigin, S3Origin } from "aws-cdk-lib/aws-cloudfront-origins"

import "dotenv/config"

export class PortfolioCdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        const referer = process.env.REFERER ?? ""

        const nuxt3Bucket = new Bucket(this, "nuxt3Bucket", {
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        })

        const lambda = new Function(this, "nitro", {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset("../nuxt3/.output/server"),
            handler: "index.handler",
            timeout: Duration.seconds(5),
            memorySize: 512,
            logRetention: RetentionDays.ONE_MONTH,
        })

        const functionUrl = lambda.addFunctionUrl({
            authType: FunctionUrlAuthType.NONE,
        })

        const nuxt3Oai = new OriginAccessIdentity(this, "nuxt3Oai")

        const nuxt3BucketOrigin = new S3Origin(nuxt3Bucket, {
            originAccessIdentity: nuxt3Oai,
        })

        const lambdaOrigin = new HttpOrigin(Fn.select(2, Fn.split("/", functionUrl.url)), {
            customHeaders: { referer }
        })

        const distribution = new Distribution(this, "cdn", {
            priceClass: PriceClass.PRICE_CLASS_200,
            defaultBehavior: {
                origin: lambdaOrigin,
                allowedMethods: AllowedMethods.ALLOW_ALL,
                originRequestPolicy: new OriginRequestPolicy(this, "lambdaOriginRequestPolicy", {
                    headerBehavior: OriginRequestHeaderBehavior.none(),
                    cookieBehavior: OriginRequestCookieBehavior.all(),
                    queryStringBehavior: OriginRequestQueryStringBehavior.all(),
                }),
                cachePolicy: new CachePolicy(this, "lambdaCachePolicy", {
                    minTtl: Duration.seconds(0),
                    defaultTtl: Duration.seconds(0),
                    maxTtl: Duration.seconds(0),
                })
            },
            additionalBehaviors: {
                "/*.*": {
                    origin: nuxt3BucketOrigin,
                    allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
                    originRequestPolicy: new OriginRequestPolicy(this, "nuxt3OriginRequestPolicy", {
                        headerBehavior: OriginRequestHeaderBehavior.none(),
                        cookieBehavior: OriginRequestCookieBehavior.none(),
                        queryStringBehavior: OriginRequestQueryStringBehavior.none(),
                    }),
                    cachePolicy: new CachePolicy(this, "nuxt3CachePolicy", {
                        cookieBehavior: OriginRequestCookieBehavior.none(),
                        minTtl: Duration.hours(1),
                        defaultTtl: Duration.hours(2),
                        maxTtl: Duration.hours(3),
                    }),
                }
            }
        })

        new BucketDeployment(this, "nuxt3BucketDeployment", {
            sources: [Source.asset("../nuxt3/.output/publi")],
            destinationBucket: nuxt3Bucket,
            logRetention: RetentionDays.ONE_MONTH,
            distribution,
        })

        new CfnOutput(this, "FUNCTION", {
            value: functionUrl.url,
        })

        new CfnOutput(this, "CDN", {
            value: `https://${distribution.distributionDomainName}`
        })
    }
}