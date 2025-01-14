import type { ServerAdapter, ServerDetails, YuqiOptions } from "./types/server";
import { NodeHTTPAdapter } from "./adapters/node";
import { validatePort } from "./utils/port";

export default class Yuqi {
  private adapter: ServerAdapter;

  constructor(options: YuqiOptions = {}) {
    this.adapter = options.adapter ?? new NodeHTTPAdapter();
  }

  public listen(port: number, callback?: (details: ServerDetails) => void) {
    const validatedPort = validatePort(port);

    this.adapter
      .listen(validatedPort)
      .then((details) => {
        callback?.(details);
      })
      .catch((err) => {
        console.error("Error starting server:", err);
      });

    return this;
  }
}
