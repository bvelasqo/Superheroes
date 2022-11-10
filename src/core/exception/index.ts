export class Exception extends Error {
  spanishMessage?: string;

  constructor (message: string, spanishMessage?: string) {
    super(message);
    this.spanishMessage = spanishMessage;
  }
}
