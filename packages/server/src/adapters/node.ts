import { createServer } from "node:http";
import type { Server } from "node:http";

import type { Router } from "../router";
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
  private router: Router;

  constructor(router: Router) {
    this.router = router;
    this.server = createServer((req, res) => {
      void this.router.handleRequest(req, res).catch((error) => {
        console.error("Unhandled error in request handler:", error);
        if (!res.writableEnded) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      });
    });
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
