import { Exception } from ".";

export class HeroAlreadyExists extends Exception {
  constructor (message: string, spanishMessage?: string) {
    super(message, spanishMessage);
  }
}