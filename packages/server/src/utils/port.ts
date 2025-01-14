import type { Port } from "../types/server";

export function validatePort(value: number): Port {
  if (!Number.isInteger(value) || value < 0 || value > 65535) {
    throw new Error("Port must be an integer between 0 and 65535");
  }
  return value as Port;
}
