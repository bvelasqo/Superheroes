import { HeroDontExists } from "../exception/HeroDontExists";
import { SuperheroRepository } from "../repository/superhero";

export class HeroNotFound {
  constructor (private readonly heroRepository: SuperheroRepository) {}

  async validate (name: string): Promise<void> {
    const hero = await this.heroRepository.findByName(name);
    if (!hero) {
      throw new HeroDontExists(`Hero with name ${name} not found`);
    }
  }

  async validateId (id: string): Promise<void> {
    const hero = await this.heroRepository.get(id);
    if (!hero) {
      throw new HeroDontExists(`Hero with id ${id} not found`);
    }
  }
}