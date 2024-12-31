import type { RouterDefinition, TypedRouter } from "./types/contract";

export function createRouter<T extends RouterDefinition>(
  routes: T,
): TypedRouter<T> {
  return routes as TypedRouter<T>;
}

export class ContractBuilder {
  router<T extends RouterDefinition>(routes: T): TypedRouter<T> {
    return createRouter(routes);
  }
}

export function createContract(): ContractBuilder {
  return new ContractBuilder();
}
