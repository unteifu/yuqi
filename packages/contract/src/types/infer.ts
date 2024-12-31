import type { z } from "zod";

import type { BaseEndpoint } from "./contract";

export interface InferRequestSchema<T extends BaseEndpoint> {
  query: T extends { query: z.ZodType } ? z.infer<T["query"]> : undefined;
  body: T extends { body: z.ZodType } ? z.infer<T["body"]> : undefined;
  params: T extends { params: z.ZodType } ? z.infer<T["params"]> : undefined;
}

export type InferResponseSchema<
  T extends BaseEndpoint,
  Code extends keyof T["responses"],
> = T["responses"][Code] extends z.ZodType
  ? z.infer<T["responses"][Code]>
  : never;
