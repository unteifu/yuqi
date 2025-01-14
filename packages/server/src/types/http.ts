import type { IncomingMessage, ServerResponse } from "http";

export interface Context {
  req: IncomingMessage;
  res: ServerResponse;
}
