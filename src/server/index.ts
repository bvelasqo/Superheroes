import { DynamoDB } from "@db/aws/dynamodb";
import { App } from "./app";

try {
  const app = new App();
  DynamoDB.start().then(() => {
    app.start().catch((error) => {
      if (error.code === 'EADDRINUSE') {
        console.log('Port already in use');
      } else {
        console.error(error);
      }
    });
  });
} catch (error) {
  console.log(error);
}
