import env from '@env/index';
import AWS from '../aws';

export class DynamoDB {
  public static TABLE_NAME: string = env.dynamodb.tableName ?? 'Hero';
  private static _INSTANCE: AWS.DynamoDB;
  private static readonly options_dev: AWS.DynamoDB.ClientConfiguration = { region: env.dynamodb.region, endpoint: env.dynamodb.endpoint, apiVersion: env.dynamodb.apiVersion };
  private static readonly options_prod: AWS.DynamoDB.ClientConfiguration = { region: env.dynamodb.region, apiVersion: env.dynamodb.apiVersion };

  static getInstance (): AWS.DynamoDB {
    if (this._INSTANCE == null) {
      const options = env.environment === 'development' ? this.options_dev : this.options_prod;
      console.log(['DynamoDB info', 'getInstance', options]);
      this._INSTANCE = new AWS.DynamoDB(options);
    }
    return this._INSTANCE;
  }

  public static async start (): Promise<void> {
    return await DynamoDB.getInstance().createTable({
      TableName: DynamoDB.TABLE_NAME,
      AttributeDefinitions: [
        {
          AttributeName: 'TENANT',
          AttributeType: 'S',
        },
        {
          AttributeName: 'SK',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'TENANT',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'SK',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    }, (error, data) => {
      if (error != null) {
        switch (error.code) {
          case 'ResourceInUseException':
            console.info(['DynamoDB info', 'start', 'Table already exists']);
            break;
          default:
            console.error(['DynamoDB Error', 'start', error]);
            throw new Error(error.message);
        }
      } else {
        console.info(['DynamoDB info', 'start', data.TableDescription]);
      }
    }).on('build', (request) => {
      console.info(['DynamoDB info', 'start', 'build', request.httpRequest]);
    }).promise().then((data) => {
      console.info(['DynamoDB info', 'start', 'promise', data]);
    }).catch((error) => {
      if (error.code === 'ResourceInUseException') {
        console.info(['DynamoDB info', 'start', 'Table already exists']);
      }
    });
  }
}

export type DynamoDBFunctions = AWS.DynamoDB;
