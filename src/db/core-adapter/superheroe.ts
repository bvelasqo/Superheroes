import { Superhero } from "@core/entity/superhero";
import { SuperheroRepository } from "@core/repository/superhero";
import { randomUUID } from "crypto";
import { DynamoDB, DynamoDBFunctions } from "../aws/dynamodb";
import { Errors } from "../aws/exceptions";

export class SuperheroDynamoDBRepository implements SuperheroRepository {
  private readonly dynamodb: DynamoDBFunctions;
  public errors: Errors | null;

  constructor() {
    this.dynamodb = DynamoDB.getInstance();
    this.errors = null;
  }

  async create(hero: Superhero): Promise<Superhero> {
    const params = {
      TableName: "superheroes",
      Item: {
        pk: {
          S: 'hero'
        },
        sk: {
          S: `${hero.name}#${randomUUID()}`
        },
        name: {
          S: hero.name
        },
        description: {
          S: hero.description
        },
        image: {
          S: hero.image
        },
        createdAt: {
          S: new Date().toISOString()
        },
        updatedAt: {
          S: new Date().toISOString()
        }
      }
    };
    const result = await this.dynamodb.putItem(params, (err, data) => {
      if (err) {
        this.errors = err;
        throw new Error(err.code);
      }
      return data;
    });
    return await result.promise().then(() => hero).catch((e) => { throw new Error(e) });
  }

  async get (id: string): Promise<Superhero> {
    const params = {
      TableName: "superheroes",
      Key: {
        pk: {
          S: id
        },
      }
    };
    const result = await this.dynamodb.getItem(params, (err, data) => {
      if (err) {
        this.errors = err;
        throw new Error(err.code);
      }
      return data;
    });
    return await result.promise().then((data) => {
      const item = data.Item;
      if (!item) throw new Error("Hero not found");
      return {
        id: item.sk.S?.split('#')[1] || '',
        name: item.name.S || '',
        description: item.description.S,
        image: item.image.S
      } as Superhero;
    }
    ).catch((e) => { throw new Error(e) });
  }

  async getAll(): Promise<Superhero[]> {
    const params = {
      TableName: "superheroes",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": {
          S: "hero"
        }
      }
    };
    const result = await this.dynamodb.query(params, (err, data) => {
      if (err) {
        this.errors = err;
        throw new Error(err.code);
      }
      return data;
    });
    return await result.promise().then((data) => {
      const items = data.Items;
      if (!items) throw new Error("Heroes not found");
      return items.map((item) => {
        return {
          id: item.sk.S?.split('#')[1] || '',
          name: item.name.S || '',
          description: item.description.S,
          image: item.image.S
        } as Superhero;
      });
    }
    ).catch((e) => { throw new Error(e) });
  }

  async findByName(name: string): Promise<Superhero> {
    const params = {
      TableName: "superheroes",
      KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": {
          S: "hero"
        },
        ":sk": {
          S: name
        }
      }
    };
    const result = await this.dynamodb.query(params, (err, data) => {
      if (err) {
        this.errors = err;
        throw new Error(err.code);
      }
      return data;
    });
    return await result.promise().then((data) => {
      const items = data.Items;
      if (!items) throw new Error("Heroes not found");
      return items.map((item) => {
        return {
          id: item.sk.S?.split('#')[1] || '',
          name: item.name.S || '',
          description: item.description.S,
          image: item.image.S
        } as Superhero;
      })[0];
    }
    ).catch((e) => { throw new Error(e) });
  }

  async update(hero: Superhero): Promise<Superhero> {
    const params = {
      TableName: "superheroes",
      Key: {
        pk: {
          S: 'hero'
        },
        sk: {
          S: `${hero.name}#${hero.id}`
        }
      },
      UpdateExpression: "set description = :description, image = :image, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":description": {
          S: hero.description
        },
        ":image": {
          S: hero.image
        },
        ":updatedAt": {
          S: new Date().toISOString()
        }
      },
      ReturnValues: "UPDATED_NEW"
    };
    const result = await this.dynamodb.updateItem(params, (err, data) => {
      if (err) {
        this.errors = err;
        throw new Error(err.code);
      }
      return data;
    });
    return await result.promise().then(() => hero).catch((e) => { throw new Error(e) });
  }

  async delete (id: string): Promise<void> {
    const params = {
      TableName: "superheroes",
      Key: {
        pk: {
          S: 'hero'
        },
        sk: {
          S: id
        }
      }
    };
    const result = await this.dynamodb.deleteItem(params, (err, data) => {
      if (err) {
        this.errors = err;
        throw new Error(err.code);
      }
      return data;
    });
    const data = await result.promise().catch((e) => { throw new Error(e) });
    if (!data) throw new Error("Hero not found");
  }

}