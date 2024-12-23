import type { z } from "zod";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestConfig {
  params?: z.ZodType;
  query?: z.ZodType;
  body?: z.ZodType;
  headers?: z.ZodType;
}

export interface ContractObject {
  path: string;
  method: HttpMethod;
  request?: RequestConfig;
  responses?: Record<number, z.ZodType>;
}

export interface ContractCollection {
  [K: string]: ContractObject | ContractCollection;
}

export function createContract<T extends ContractCollection>(contract: T): T {
  return contract;
}
