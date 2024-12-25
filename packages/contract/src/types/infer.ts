import type { z } from "zod";

import type { ContractObject } from "./contract";

export type InferRequestSchema<T extends ContractObject> = {
  [K in keyof Required<T>["request"] as T["request"] extends Record<K, unknown>
    ? K
    : never]: T["request"] extends Record<K, z.ZodType>
    ? z.infer<T["request"][K]>
    : never;
};

export type InferResponseSchema<
  T extends ContractObject,
  Status extends keyof T["responses"],
> = T["responses"][Status] extends z.ZodType
  ? z.infer<T["responses"][Status]>
  : never;
