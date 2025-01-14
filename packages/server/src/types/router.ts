import type { IncomingMessage } from "node:http";

import type { Response } from "../response";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Route {
  method: HTTPMethod;
  path: string;
  handler: Handler;
}

export interface Context {
  req: IncomingMessage;
  res: Response;
}

export type Handler = (context: Context) => void | Promise<void>;

export interface HandlerContext {
  req: IncomingMessage;
  res: ResponseOptions;
}

export interface ResponseOptions {
  status(code: number): this;
  json<T>(data: T): void;
  send(data: string): string;
  header(name: string, value: string): this;
  headers(headers: Record<string, string>): this;
  type(contentType: string): this;
  redirect(url: string, code?: number): void;
}
