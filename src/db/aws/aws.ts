import env from '@env/index';
import AWS from 'aws-sdk';

AWS.config.update({ region: env.dynamodb.region });

export default AWS;
