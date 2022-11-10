import env from "@env/index";
import { Server } from "./server.class";

export class App {
  server?: Server;
  port?: string;

  async start (): Promise<void> {
    this.port = env.port ?? '2426';
    this.server = new Server(this.port);
    return await this.server.listen();
  }

  async stop (): Promise<void> {
    return await this.server?.stop();
  }
}