import { Superhero } from "../entity/superhero";

export interface SuperheroRepository {
  create(superhero: Superhero): Promise<Superhero>;
  update(superhero: Superhero): Promise<Superhero>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<Superhero>;
  getAll(): Promise<Superhero[]>;
  findByName(name: string): Promise<Superhero>;
}
