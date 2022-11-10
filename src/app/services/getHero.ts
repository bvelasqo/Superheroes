import { Superhero } from "@core/entity/superhero";
import { HeroDontExists } from "@core/exception/HeroDontExists";
import { SuperheroRepository } from "@core/repository/superhero";

export class GetHero {
  constructor (private readonly heroRepository: SuperheroRepository) {}

  async execute (id: string): Promise<Superhero> {
    const hero = await this.heroRepository.get(id);
    if (!hero) throw new HeroDontExists(`Hero with id ${id} not found`);
    return hero;
  }
}