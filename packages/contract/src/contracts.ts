import type { RouterInput, TypedRouter } from "./types/contract";

function createRouter<T extends RouterInput>(routes: T): TypedRouter<T> {
  return routes as TypedRouter<T>;
}

export class ContractBuilder {
  router<T extends RouterInput>(routes: T): TypedRouter<T> {
    return createRouter(routes);
  }
}

export function createContract(): ContractBuilder {
  return new ContractBuilder();
}
