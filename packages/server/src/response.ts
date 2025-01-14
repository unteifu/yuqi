import type { ServerResponse } from "http";

import type { ResponseOptions } from "./types/router";

export class Response implements ResponseOptions {
  private statusCode = 200;
  private responseHeaders: Record<string, string> = {};

  constructor(private res: ServerResponse) {}

  status(code: number): this {
    this.statusCode = code;
    return this;
  }

  header(name: string, value: string): this {
    this.responseHeaders[name] = value;
    return this;
  }

  headers(headers: Record<string, string>): this {
    this.responseHeaders = { ...this.responseHeaders, ...headers };
    return this;
  }

  type(contentType: string): this {
    return this.header("Content-Type", contentType);
  }

  json<T>(data: T): void {
    this.type("application/json");
    this.writeResponse(JSON.stringify(data));
  }

  send(data: string): string {
    this.type("text/plain");
    this.writeResponse(data);
    return data;
  }

  redirect(url: string, code = 302): void {
    this.status(code).header("Location", url);
    this.writeResponse("");
  }

  private writeResponse(data: string): void {
    if (!this.res.headersSent) {
      this.res.writeHead(this.statusCode, this.responseHeaders);
    }
    this.res.end(data);
  }
}
