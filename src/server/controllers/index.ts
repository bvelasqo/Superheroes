import { SuperheroDto } from '@app/dto/superheroe';
import { MapperSuperhero } from '@app/mapper/superheroe';
import { CreateHero } from '@app/services/createHero';
import { DeleteHero } from '@app/services/deleteHero';
import { GetAllHeroes } from '@app/services/getAllHeroes';
import { GetHero } from '@app/services/getHero';
import { SuperheroDynamoDBRepository } from '@db/core-adapter/superheroe';
import { NextFunction, Request, Response } from 'express';

export class HeroController {
  static dynamoDbHeroRepository = new SuperheroDynamoDBRepository();

  static  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hero = req.body as SuperheroDto;
      const superhero = MapperSuperhero.toCore(hero);
      const creator = new CreateHero(this.dynamoDbHeroRepository);
      const createdHero = await creator.execute(superhero);
      res.status(201).json(MapperSuperhero.toDto(createdHero));
    } catch (err) {
      next(err);
    }
  }

  static async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const deleter = new DeleteHero(this.dynamoDbHeroRepository);
      await deleter.execute(id);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  static async get (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const getter = new GetHero(this.dynamoDbHeroRepository);
      const hero = await getter.execute(id);
      res.status(200).json(MapperSuperhero.toDto(hero));
    } catch (err) {
      next(err);
    }
  }

  static async getAll (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const getter = new GetAllHeroes(this.dynamoDbHeroRepository);
      const heroes = await getter.execute();
      res.status(200).json(heroes.map(MapperSuperhero.toDto));
    } catch (err) {
      next(err);
    }
  }

  static async update (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const hero = req.body as SuperheroDto;
      const superhero = MapperSuperhero.toCore(hero);
      const creator = new CreateHero(this.dynamoDbHeroRepository);
      const createdHero = await creator.execute(superhero);
      res.status(201).json(MapperSuperhero.toDto(createdHero));
    } catch (err) {
      next(err);
    }
  }
}
