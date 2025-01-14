import type { IncomingMessage, ServerResponse } from "node:http";

import type { Context, Handler, HTTPMethod } from "./types/router";
import { Response } from "./response";

interface Route {
  method: HTTPMethod;
  path: string;
  handler: Handler;
}

export class Router {
  private routes: Route[] = [];

  public addRoute(method: HTTPMethod, path: string, handler: Handler): this {
    this.routes.push({ method, path, handler });
    return this;
  }

  public async handleRequest(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    const route = this.routes.find(
      (r) => r.method === req.method && r.path === req.url,
    );

    const response = new Response(res);

    if (!route) {
      response.status(404).send("Not Found");
      return;
    }

    try {
      const context: Context = { req, res: response };
      await route.handler(context);
    } catch (error) {
      console.error("Error handling request:", error);
      if (error instanceof Error) {
        response.status(500).json({
          error: "Internal Server Error",
          message: error.message,
        });
      } else {
        response.status(500).send("Internal Server Error");
      }
    }
  }
}
