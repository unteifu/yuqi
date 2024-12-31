// src/tests/nested-endpoints.test.ts
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { createContract } from "@yuqijs/contract";

import { createClient } from "../src";

describe("Nested Endpoints", () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("handles nested route structures", async () => {
    const contract = createContract({
      api: {
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
          posts: {
            create: {
              path: "/users/:userId/posts",
              method: "POST",
              request: {
                params: z.object({
                  userId: z.string(),
                }),
                body: z.object({
                  title: z.string(),
                  content: z.string(),
                }),
              },
              responses: {
                200: z.object({
                  id: z.string(),
                  title: z.string(),
                }),
              },
            },
          },
        },
      },
    });

    const client = createClient(contract, "http://api.example.com");

    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ id: "123", name: "John Doe" }),
    });

    await client.api.users.getUser({
      params: { id: "123" },
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "http://api.example.com/users/123",
      expect.objectContaining<RequestInit>({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    mockFetch.mockClear();
    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ id: "post-1", title: "New Post" }),
    });

    await client.api.users.posts.create({
      params: { userId: "123" },
      body: { title: "New Post", content: "Content" },
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "http://api.example.com/users/123/posts",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          title: "New Post",
          content: "Content",
        }),
      }),
    );
  });

  it("supports composing contracts through nesting", async () => {
    const userContract = createContract({
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
    });

    const apiContract = createContract({
      v1: {
        users: userContract,
      },
    });

    const client = createClient(apiContract, "http://api.example.com");

    mockFetch.mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ id: "123", name: "John Doe" }),
    });

    await client.v1.users.getUser({
      params: { id: "123" },
    });

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
});
