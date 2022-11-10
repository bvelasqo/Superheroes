import { Superhero } from "@core/entity/superhero";
import { SuperheroRepository } from "@core/repository/superhero";
import { HeroAlreadyExistsValidation } from "@core/service/HeroAlreadyExists";
import { HeroNotFound } from "@core/service/HeroNotFound";

export class UpdateHero {
  constructor (
    private readonly heroRepository: SuperheroRepository,
  ) {}

  async execute (hero: Superhero): Promise<Superhero> {
    const validations = new HeroNotFound(this.heroRepository);
    await validations.validateId(hero.name);
    const validationsTo = new HeroAlreadyExistsValidation(this.heroRepository);
    await validationsTo.validate(hero.name);
    return await this.heroRepository.update(hero);
  }
}