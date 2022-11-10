import { Superhero } from "@core/entity/superhero";
import { SuperheroRepository } from "@core/repository/superhero";

export class GetAllHeroes {
  constructor (private readonly heroRepository: SuperheroRepository) {}

  async execute (): Promise<Superhero[]> {
    const heroes = await this.heroRepository.getAll();
    if (!heroes) throw new Error("Heroes not found");
    return heroes;
  }
}