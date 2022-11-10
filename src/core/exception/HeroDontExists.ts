import { Exception } from ".";

export class HeroDontExists extends Exception {
  constructor (message: string, spanishMessage?: string) {
    super(message, spanishMessage);
  }
}