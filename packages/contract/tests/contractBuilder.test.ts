import { describe, expect, it } from "vitest";
import { z } from "zod";

import type { InferRequestSchema, InferResponseSchema } from "../src";
import { createContract } from "../src";

describe("Contract Builder", () => {
  const y = createContract();

  const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
  });

  const postContract = y.router({
    getPosts: {
      method: "GET",
      path: "/posts",
      query: z.object({
        page: z.string().transform(Number).optional(),
        limit: z.string().transform(Number).optional(),
        search: z.string().optional(),
      }),
      responses: {
        SUCCESS: z.array(
          z.object({
            id: z.number(),
            title: z.string(),
            content: z.string(),
            authorId: z.number(),
          }),
        ),
        BAD_REQUEST: z.object({
          message: z.string(),
        }),
      },
    },
    getPost: {
      method: "GET",
      path: "/posts/:id",
      params: z.object({
        id: z.string(),
      }),
      responses: {
        SUCCESS: z.object({
          id: z.number(),
          title: z.string(),
          content: z.string(),
          author: UserSchema,
        }),
        NOT_FOUND: z.object({
          message: z.string(),
        }),
      },
    },
    createPost: {
      method: "POST",
      path: "/posts",
      body: z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
      responses: {
        SUCCESS: z.object({
          id: z.number(),
          title: z.string(),
          content: z.string(),
        }),
        VALIDATION_ERROR: z.object({
          errors: z.array(
            z.object({
              field: z.string(),
              message: z.string(),
            }),
          ),
        }),
      },
    },
  });

  const _contract = y.router({
    posts: postContract,
  });

  it("should validate request schemas match expected types", () => {
    type GetPostsRequest = InferRequestSchema<
      (typeof postContract)["getPosts"]
    >;

    const querySchema = z.object({
      page: z.number().optional(),
      limit: z.number().optional(),
      search: z.string().optional(),
    });

    const _testQuery: GetPostsRequest["query"] = {
      page: 1,
      limit: 10,
      search: "test",
    };

    expect(() => querySchema.parse(_testQuery)).not.toThrow();

    type CreatePostRequest = InferRequestSchema<
      (typeof postContract)["createPost"]
    >;

    const bodySchema = z.object({
      title: z.string().min(1),
      content: z.string().min(1),
    });

    const _testBody: CreatePostRequest["body"] = {
      title: "Test Post",
      content: "Test Content",
    };

    expect(() => bodySchema.parse(_testBody)).not.toThrow();
  });

  it("should validate response schemas match expected types", () => {
    type SuccessResponse = InferResponseSchema<
      (typeof postContract)["getPosts"],
      "SUCCESS"
    >;

    const responseSchema = z.array(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        authorId: z.number(),
      }),
    );

    const _testResponse: SuccessResponse = [
      {
        id: 1,
        title: "Test Post",
        content: "Test Content",
        authorId: 1,
      },
    ];

    expect(() => responseSchema.parse(_testResponse)).not.toThrow();

    type ErrorResponse = InferResponseSchema<
      (typeof postContract)["createPost"],
      "VALIDATION_ERROR"
    >;

    const errorSchema = z.object({
      errors: z.array(
        z.object({
          field: z.string(),
          message: z.string(),
        }),
      ),
    });

    const _testError: ErrorResponse = {
      errors: [
        {
          field: "title",
          message: "Title is required",
        },
      ],
    };

    expect(() => errorSchema.parse(_testError)).not.toThrow();
  });
});
