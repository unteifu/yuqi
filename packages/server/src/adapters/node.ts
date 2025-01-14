import { createServer } from "node:http";
import type { Server } from "node:http";

import type {
  Port,
  ServerAdapter,
  ServerAddress,
  ServerDetails,
} from "../types/server";

function formatAddress(address: ServerAddress, port: Port): ServerDetails {
  if (!address) {
    throw new Error("Server address not available");
  }

  return {
    host: typeof address === "string" ? address : address.address,
    port,
  };
}

export class NodeHTTPAdapter implements ServerAdapter {
  private server: Server;

  constructor() {
    this.server = createServer();
  }

  listen(port: Port): Promise<ServerDetails> {
    return new Promise((resolve) => {
      this.server.listen(port, () => {
        const address = this.server.address();
        resolve(formatAddress(address, port));
      });
    });
  }
}
