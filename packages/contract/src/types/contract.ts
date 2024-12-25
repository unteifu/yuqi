import type { z } from "zod";

import type { HttpMethod, RequestConfig } from "./http";

export interface ContractObject {
  path: string;
  method: HttpMethod;
  request?: RequestConfig;
  responses: Record<number, z.ZodTypeAny>;
}

export interface ContractCollection {
  [K: string]: ContractObject | ContractCollection;
}
