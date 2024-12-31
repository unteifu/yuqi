import type { ContractCollection, ContractObject } from "@yuqijs/contract";

type InferSchemaType<T> = T extends { _output: unknown } ? T["_output"] : T;

export type ResponseType<T extends ContractObject> = {
  [K in keyof T["responses"]]: {
    status: K;
    data: InferSchemaType<T["responses"][K]>;
  };
}[keyof T["responses"]];

export type RequestParams<T extends ContractObject> = {
  [K in keyof T["request"]]: T["request"][K] extends { _output: unknown }
    ? Record<K, InferSchemaType<T["request"][K]>>
    : never;
}[keyof T["request"]] extends infer R
  ? [R] extends [never]
    ? Record<string, never>
    : R
  : Record<string, never>;

export type HasRequiredParams<T extends ContractObject> = T["request"] extends
  | { params: { _output: unknown } }
  | { body: { _output: unknown } }
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
