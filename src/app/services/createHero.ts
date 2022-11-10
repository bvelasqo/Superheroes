import { Superhero } from "@core/entity/superhero";
import { SuperheroRepository } from "@core/repository/superhero";
import { HeroAlreadyExistsValidation } from "@core/service/HeroAlreadyExists";

export class CreateHero {
  private readonly _heroRepository: SuperheroRepository;

  constructor (heroRepository: SuperheroRepository) {
    this._heroRepository = heroRepository;
  }

  async execute (hero: Superhero): Promise<Superhero> {
    const validations = new HeroAlreadyExistsValidation(this._heroRepository);
    await validations.validate(hero.name);
    return await this._heroRepository.create(hero);
  }
}