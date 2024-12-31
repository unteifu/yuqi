// src/tests/basic.test.ts
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { createContract } from "@yuqijs/contract";

import { createClient } from "../src";

describe("Client Basic Functionality", () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("handles endpoints without parameters", async () => {
    const contract = createContract({
      health: {
        check: {
          path: "/health",
          method: "GET",
          responses: {
            200: z.object({
              status: z.string(),
            }),
          },
        },
      },
    });

    const mockResponse = new Response(JSON.stringify({ status: "healthy" }), {
      status: 200,
    });

    mockFetch.mockResolvedValueOnce(mockResponse);

    const client = createClient(contract, "http://api.example.com");
    await client.health.check();

    expect(mockFetch).toHaveBeenCalledWith(
      "http://api.example.com/health",
      expect.objectContaining<RequestInit>({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
  });

  it("merges default options with endpoint configuration", async () => {
    const contract = createContract({
      health: {
        check: {
          path: "/health",
          method: "GET",
          responses: {
            200: z.object({
              status: z.string(),
            }),
          },
        },
      },
    });

    const mockResponse = new Response(JSON.stringify({ status: "healthy" }), {
      status: 200,
    });

    mockFetch.mockResolvedValueOnce(mockResponse);

    const client = createClient(contract, "http://api.example.com", {
      headers: {
        Authorization: "Bearer token",
      },
    });

    await client.health.check();

    expect(mockFetch).toHaveBeenCalledWith(
      "http://api.example.com/health",
      expect.objectContaining<RequestInit>({
        method: "GET",
        headers: {
          Authorization: "Bearer token",
          "Content-Type": "application/json",
        },
      }),
    );
  });
});
