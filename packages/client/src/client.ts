import type { ContractCollection, ContractObject } from "@yuqijs/contract";

import type { ClientFromContract } from "./types/client";
import { isContractObject } from "./types/contract";
import { interpolatePath } from "./utils/path";

export function createClient<T extends ContractCollection>(
  contract: T,
  baseUrl: string,
  defaultOptions?: RequestInit,
): ClientFromContract<T> {
  function buildClient(
    contractPart: ContractCollection,
  ): Record<string, unknown> {
    const client: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(contractPart)) {
      if (isContractObject(value)) {
        client[key] = createEndpoint(value);
      } else {
        client[key] = buildClient(value);
      }
    }

    return client;
  }

  function createEndpoint(endpoint: ContractObject) {
    return async (config?: Record<string, unknown>) => {
      const url = new URL(baseUrl);

      if (config?.params && endpoint.request?.params) {
        const validatedParams = endpoint.request.params.parse(
          config.params,
        ) as Record<string, string | number | boolean | null | undefined>;
        url.pathname = interpolatePath(endpoint.path, validatedParams);
      } else {
        url.pathname = endpoint.path;
      }

      if (config?.query && endpoint.request?.query) {
        const validatedQuery = endpoint.request.query.parse(
          config.query,
        ) as Record<string, string | number | boolean | null | undefined>;

        Object.entries(validatedQuery).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const fetchOptions: RequestInit = {
        ...defaultOptions,
        method: endpoint.method,
        headers: {
          ...defaultOptions?.headers,
          "Content-Type": "application/json",
        },
      };

      if (config?.body && endpoint.request?.body) {
        const validatedBody = endpoint.request.body.parse(
          config.body,
        ) as Record<string, unknown>;
        fetchOptions.body = JSON.stringify(validatedBody);
      }

      const response = await fetch(url.toString(), fetchOptions);
      const data = await response.json();

      return {
        status: response.status,
        data,
      };
    };
  }

  return buildClient(contract) as ClientFromContract<T>;
}
