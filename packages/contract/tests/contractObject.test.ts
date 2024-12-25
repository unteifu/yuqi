import { describe, expect, it } from "vitest";
import { z } from "zod";

import type {
  InferRequestSchema,
  InferResponseSchema,
} from "../src/types/infer";
import { createContract } from "../src/contracts";

describe("Contract Creation", () => {
  it("should create a contract with params, query and body", () => {
    const contract = createContract({
      updateUser: {
        path: "/users/:id",
        method: "PUT",
        request: {
          params: z.object({ id: z.string() }),
          query: z.object({ version: z.number() }),
          body: z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
          }),
        },
        responses: {
          200: z.object({ success: z.boolean() }),
          400: z.object({ errors: z.array(z.string()) }),
          404: z.object({ error: z.string() }),
        },
      },
    });

    expect(contract.updateUser.request).toHaveProperty("params");
    expect(contract.updateUser.request).toHaveProperty("query");
    expect(contract.updateUser.request).toHaveProperty("body");

    const paramsSchema = contract.updateUser.request.params as z.ZodObject<
      Record<string, z.ZodType>
    >;
    const querySchema = contract.updateUser.request.query as z.ZodObject<
      Record<string, z.ZodType>
    >;
    const bodySchema = contract.updateUser.request.body as z.ZodObject<
      Record<string, z.ZodType>
    >;

    expect(Object.keys(paramsSchema.shape)).toEqual(["id"]);
    expect(Object.keys(querySchema.shape)).toEqual(["version"]);
    expect(Object.keys(bodySchema.shape)).toEqual(["name", "email"]);
  });
});

describe("Contract Type Inference", () => {
  const contract = createContract({
    updateUser: {
      path: "/users/:id",
      method: "PUT",
      request: {
        params: z.object({ id: z.string() }),
        query: z.object({ version: z.number() }),
        body: z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
        }),
      },
      responses: {
        200: z.object({ success: z.boolean() }),
        400: z.object({ errors: z.array(z.string()) }),
        404: z.object({ error: z.string() }),
      },
    },
  });

  it("should infer request types and validate at runtime", () => {
    expect(contract.updateUser.path).toBe("/users/:id");
    expect(contract.updateUser.method).toBe("PUT");

    type Request = InferRequestSchema<(typeof contract)["updateUser"]>;

    const request: Request = {
      params: { id: "123" },
      query: { version: 1 },
      body: { name: "John", email: "test@test.com" },
    };

    const paramsSchema = contract.updateUser.request.params as z.ZodObject<{
      id: z.ZodString;
    }>;
    const querySchema = contract.updateUser.request.query as z.ZodObject<{
      version: z.ZodNumber;
    }>;
    const bodySchema = contract.updateUser.request.body as z.ZodObject<{
      name: z.ZodOptional<z.ZodString>;
      email: z.ZodOptional<z.ZodString>;
    }>;

    expect(paramsSchema.parse(request.params)).toEqual({ id: "123" });
    expect(querySchema.parse(request.query)).toEqual({ version: 1 });
    expect(bodySchema.parse(request.body)).toEqual({
      name: "John",
      email: "test@test.com",
    });
  });

  it("should infer response types and validate at runtime", () => {
    type SuccessResponse = InferResponseSchema<
      (typeof contract)["updateUser"],
      200
    >;
    type ErrorResponse = InferResponseSchema<
      (typeof contract)["updateUser"],
      404
    >;

    const successResponse: SuccessResponse = {
      success: true,
    };

    const errorResponse: ErrorResponse = {
      error: "User not found",
    };

    const successSchema = contract.updateUser.responses[200] as z.ZodObject<{
      success: z.ZodBoolean;
    }>;
    const errorSchema = contract.updateUser.responses[404] as z.ZodObject<{
      error: z.ZodString;
    }>;

    expect(successSchema.parse(successResponse)).toEqual({ success: true });
    expect(errorSchema.parse(errorResponse)).toEqual({
      error: "User not found",
    });
  });

  it("should infer partial request types and validate at runtime", () => {
    const partialContract = createContract({
      getUser: {
        path: "/users/:id",
        method: "GET",
        request: {
          params: z.object({ id: z.string() }),
        },
        responses: {
          200: z.object({ name: z.string() }),
        },
      },
    });

    expect(partialContract.getUser.path).toBe("/users/:id");
    expect(partialContract.getUser.method).toBe("GET");

    type PartialRequest = InferRequestSchema<
      (typeof partialContract)["getUser"]
    >;

    const request: PartialRequest = {
      params: { id: "123" },
    };

    const paramsSchema = partialContract.getUser.request.params as z.ZodObject<{
      id: z.ZodString;
    }>;
    expect(paramsSchema.parse(request.params)).toEqual({ id: "123" });
  });

  it("should handle deeply nested contracts correctly", () => {
    const nestedContract = createContract({
      api: {
        v1: {
          users: {
            getUser: {
              path: "/v1/users/:id",
              method: "GET",
              request: {
                params: z.object({ id: z.string() }),
              },
              responses: {
                200: z.object({ id: z.string() }),
              },
            },
          },
        },
      },
    });

    type DeepRequest = InferRequestSchema<
      (typeof nestedContract)["api"]["v1"]["users"]["getUser"]
    >;

    const request: DeepRequest = {
      params: { id: "123" },
    };

    expect(nestedContract.api.v1.users.getUser.path).toBe("/v1/users/:id");
    expect(nestedContract.api.v1.users.getUser.method).toBe("GET");

    const paramsSchema = nestedContract.api.v1.users.getUser.request
      .params as z.ZodObject<{ id: z.ZodString }>;
    expect(paramsSchema.parse(request.params)).toEqual({ id: "123" });
  });

  it("should handle empty requests correctly", () => {
    const emptyContract = createContract({
      healthCheck: {
        path: "/health",
        method: "GET",
        responses: {
          200: z.object({ status: z.string() }),
        },
      },
    });

    type EmptyRequest = InferRequestSchema<
      (typeof emptyContract)["healthCheck"]
    >;
    const _request: EmptyRequest = {};

    expect(() => emptyContract).not.toThrow();

    expect(emptyContract.healthCheck.path).toBe("/health");
    expect(emptyContract.healthCheck.method).toBe("GET");
  });
});
