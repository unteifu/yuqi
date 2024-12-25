import type { ContractCollection } from "./types/contract";

export function createContract<T extends ContractCollection>(contract: T): T {
  return contract;
}
