export interface HeroDao {
  pk: string;
  sk: string;
  name: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}
