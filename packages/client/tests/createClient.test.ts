import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { createContract } from "@yuqijs/contract";

import { createClient } from "../src";

describe("createClient", () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("handles endpoints without required parameters", async () => {
    const mockData = { status: "healthy" };
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(mockData),
    });

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

  it("handles endpoints with required parameters", async () => {
    const mockData = { id: "123", name: "Test User" };
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(mockData),
    });

    const contract = createContract({
      users: {
        getUser: {
          path: "/users/:id",
          method: "GET",
          request: {
            params: z.object({
              id: z.string(),
            }),
          },
          responses: {
            200: z.object({
              id: z.string(),
              name: z.string(),
            }),
          },
        },
      },
    });

    const client = createClient(contract, "http://api.example.com");
    await client.users.getUser({ params: { id: "123" } });

    expect(mockFetch).toHaveBeenCalledWith(
      "http://api.example.com/users/123",
      expect.objectContaining<RequestInit>({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
  });

  it("merges default options with endpoint configuration", async () => {
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ status: "ok" }),
    });

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

    const defaultOptions = {
      headers: {
        Authorization: "Bearer token",
      },
    };

    const client = createClient(
      contract,
      "http://api.example.com",
      defaultOptions,
    );
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

  it("validates request parameters against the schema", async () => {
    const contract = createContract({
      users: {
        getUser: {
          path: "/users/:id",
          method: "GET",
          request: {
            params: z.object({
              id: z.string().min(3),
            }),
          },
          responses: {
            200: z.object({
              id: z.string(),
              name: z.string(),
            }),
          },
        },
      },
    });

    const client = createClient(contract, "http://api.example.com");

    await expect(
      client.users.getUser({
        params: { id: "12" },
      }),
    ).rejects.toThrow();
  });
});
