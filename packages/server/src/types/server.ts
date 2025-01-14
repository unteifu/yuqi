import type { AddressInfo } from "net";

export type Port = number & { readonly __brand: unique symbol };

export interface ServerDetails {
  host: string;
  port: Port;
}

export interface YuqiOptions {
  adapter?: ServerAdapter;
}

export interface ServerAdapter {
  listen(port: Port): Promise<ServerDetails>;
}

export type ServerAddress = string | AddressInfo | null;
