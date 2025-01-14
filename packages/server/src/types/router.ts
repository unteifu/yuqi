import type { IncomingMessage, ServerResponse } from "node:http";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type Handler = (
  req: IncomingMessage,
  res: ServerResponse,
) => void | Promise<void>;
