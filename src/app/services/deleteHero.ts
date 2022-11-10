import { SuperheroRepository } from "@core/repository/superhero";
import { HeroNotFound } from "@core/service/HeroNotFound";

export class DeleteHero {
  constructor (
    private readonly heroRepository: SuperheroRepository,
  ) {}

  async execute (id: string): Promise<void> {
    const validations = new HeroNotFound(this.heroRepository);
    await validations.validateId(id);
    return await this.heroRepository.delete(id);
  }
}
