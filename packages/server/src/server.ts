import type { Handler } from "./types/router";
import type { ServerAdapter, ServerDetails, YuqiOptions } from "./types/server";
import { NodeHTTPAdapter } from "./adapters/node";
import { Router } from "./router";
import { validatePort } from "./utils/port";

export default class Yuqi {
  private adapter: ServerAdapter;
  private router: Router;

  constructor(options: YuqiOptions = {}) {
    this.router = new Router();
    this.adapter = options.adapter ?? new NodeHTTPAdapter(this.router);
  }

  public get(path: string, handler: Handler): this {
    this.router.addRoute("GET", path, handler);
    return this;
  }

  public post(path: string, handler: Handler): this {
    this.router.addRoute("POST", path, handler);
    return this;
  }

  public put(path: string, handler: Handler): this {
    this.router.addRoute("PUT", path, handler);
    return this;
  }

  public delete(path: string, handler: Handler): this {
    this.router.addRoute("DELETE", path, handler);
    return this;
  }

  public patch(path: string, handler: Handler): this {
    this.router.addRoute("PATCH", path, handler);
    return this;
  }

  public listen(
    port: number,
    callback?: (details: ServerDetails) => void,
  ): this {
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
