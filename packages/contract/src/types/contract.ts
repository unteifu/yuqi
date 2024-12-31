import type { z } from "zod";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface BaseEndpoint {
  path: string;
  method: HttpMethod;
  responses: {
    SUCCESS: z.ZodTypeAny;
    [key: string]: z.ZodTypeAny;
  };
  query?: z.ZodTypeAny;
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
}

export interface RouterDefinition {
  [K: string]: BaseEndpoint | RouterDefinition;
}

export type TypedRouter<T extends RouterDefinition> = {
  readonly [K in keyof T]: T[K] extends BaseEndpoint
    ? T[K]
    : T[K] extends RouterDefinition
      ? TypedRouter<T[K]>
      : never;
};
