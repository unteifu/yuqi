import type { z } from "zod";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface BaseEndpoint {
  path: string;
  method: HttpMethod;
  responses: Record<string, z.ZodTypeAny>;
  query?: z.ZodTypeAny;
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
}

interface Router {
  readonly __routerBrand: unique symbol;
}

export type RouterInput = Record<string, BaseEndpoint | Router>;

export type TypedRouter<T extends RouterInput> = {
  readonly [K in keyof T]: T[K];
} & Router;
