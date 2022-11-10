import { HeroAlreadyExists } from "../exception/HeroAlreadyExist";
import { SuperheroRepository } from "../repository/superhero";

export class HeroAlreadyExistsValidation {
  constructor (private readonly heroRepository: SuperheroRepository) {}

  async validate (name: string): Promise<void> {
    const hero = await this.heroRepository.findByName(name);
    if (hero) {
      throw new HeroAlreadyExists(`Hero with name ${name} already exists`);
    }
  }
}