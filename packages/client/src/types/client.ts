import type { z } from "zod";

import type { ContractCollection, ContractObject } from "@yuqijs/contract";

type InferResponse<T> = T extends z.ZodTypeAny ? z.infer<T> : never;

export type ResponseType<T extends ContractObject> = {
  [K in keyof T["responses"]]: {
    status: K;
    data: InferResponse<T["responses"][K]>;
  };
}[keyof T["responses"]];

export type RequestParams<T extends ContractObject> = T["request"] extends {
  params: z.ZodType;
}
  ? { params: z.infer<T["request"]["params"]> }
  : T["request"] extends { body: z.ZodType }
    ? { body: z.infer<T["request"]["body"]> }
    : Record<string, never>;

export type HasRequiredParams<T extends ContractObject> = T["request"] extends
  | { params: z.ZodType }
  | { body: z.ZodType }
  ? true
  : false;

export type ClientFromContract<T extends ContractCollection> = {
  [K in keyof T]: T[K] extends ContractObject
    ? HasRequiredParams<T[K]> extends true
      ? (config: RequestParams<T[K]>) => Promise<ResponseType<T[K]>>
      : (config?: RequestParams<T[K]>) => Promise<ResponseType<T[K]>>
    : T[K] extends ContractCollection
      ? ClientFromContract<T[K]>
      : never;
};
