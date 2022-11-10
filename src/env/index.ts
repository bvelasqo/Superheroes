import dotenv from 'dotenv';

dotenv.config(
  { path: `${process.env.NODE_ENV ?? 'production'}.env` },
);

console.log(`Running in ${process.env.NODE_ENV ?? 'production'} mode`);

const env = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  host: process.env.HOST,
  dynamodb: {
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
    apiVersion: process.env.AWS_DYNAMODB_API_VERSION,
    tableName: process.env.AWS_DYNAMODB_TABLE_NAME,
  },
};
console.log(['environment variables: ', env]);

export default env;
