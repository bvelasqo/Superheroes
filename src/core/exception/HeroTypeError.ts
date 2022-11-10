import { Exception } from ".";

export class HeroTypeError extends Exception {
  constructor (message: string, spanishMessage?: string) {
    super(message, spanishMessage);
  }
}