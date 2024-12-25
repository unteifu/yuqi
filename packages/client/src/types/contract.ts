import type { ContractCollection, ContractObject } from "@yuqijs/contract";

export function isContractObject(
  value: ContractObject | ContractCollection,
): value is ContractObject {
  return "path" in value;
}
