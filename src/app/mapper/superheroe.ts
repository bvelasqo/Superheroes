import { Superhero } from "@core/entity/superhero";
import { HeroDao } from "@db/dao/hero";
import { SuperheroDto } from "../dto/superheroe";

export class MapperSuperhero {
  static toCore(superheroe: SuperheroDto): Superhero {
    return {
      id: superheroe.id,
      name: superheroe.name.toLowerCase(),
      description: superheroe.description,
      image: superheroe.image
    };
  }

  static toDto(superheroe: Superhero): SuperheroDto {
    return {
      id: superheroe.id,
      name: superheroe.name.toLowerCase(),
      description: superheroe.description,
      image: superheroe.image
    };
  }

  static toDtoList(superheroeList: Superhero[]): SuperheroDto[] {
    return superheroeList.map(superheroe => {
      return {
        id: superheroe.id,
        name: superheroe.name.toLowerCase(),
        description: superheroe.description,
        image: superheroe.image
      };
    });
  }

  static toCoreList(superheroeList: SuperheroDto[]): Superhero[] {
    return superheroeList.map(superheroe => {
      return {
        id: superheroe.id,
        name: superheroe.name.toLowerCase(),
        description: superheroe.description,
        image: superheroe.image
      };
    });
  }

  static toPersistence(superheroe: Superhero): HeroDao {
    return {
      pk: 'hero',
      sk: `${superheroe.name.toLowerCase()}#${superheroe.id}`,
      name: superheroe.name.toLowerCase(),
      description: superheroe.description,
      image: superheroe.image,
      createdAt: superheroe.createdAt,
      updatedAt: superheroe.updatedAt
    };
  }

  static toCoreFromPersistence(superheroe: HeroDao): Superhero {
    return {
      id: superheroe.sk.split('#')[1],
      name: superheroe.name.toLowerCase(),
      description: superheroe.description,
      image: superheroe.image,
      createdAt: superheroe.createdAt,
      updatedAt: superheroe.updatedAt
    };
  }

  static toCoreListFromPersistence(superheroeList: HeroDao[]): Superhero[] {
    return superheroeList.map(superheroe => {
      return {
        id: superheroe.sk.split('#')[1],
        name: superheroe.name.toLowerCase(),
        description: superheroe.description,
        image: superheroe.image,
        createdAt: superheroe.createdAt,
        updatedAt: superheroe.updatedAt
      };
    });
  }

  static toPersistenceList(superheroeList: Superhero[]): HeroDao[] {
    return superheroeList.map(superheroe => {
      return {
        pk: 'hero',
        sk: `${superheroe.name}#${superheroe.id}`,
        name: superheroe.name.toLowerCase(),
        description: superheroe.description,
        image: superheroe.image,
        createdAt: superheroe.createdAt,
        updatedAt: superheroe.updatedAt
      };
    });
  }
}