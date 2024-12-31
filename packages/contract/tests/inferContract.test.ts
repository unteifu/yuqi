import { describe, expect, it } from "vitest";
import { z } from "zod";

import type { InferRequestSchema, InferResponseSchema } from "../src";
import { createContract } from "../src";

describe("Infer Contract Types", () => {
  const _contract = createContract();

  const _basicContract = _contract.router({
    test: {
      method: "GET",
      path: "/test",
      query: z.object({
        page: z.string().transform(Number),
      }),
      body: z.object({
        name: z.string(),
      }),
      params: z.object({
        id: z.string(),
      }),
      responses: {
        SUCCESS: z.object({
          data: z.string(),
        }),
        ERROR: z.object({
          message: z.string(),
        }),
      },
    },
  });

  it("should infer request schema types with all fields", () => {
    type Request = InferRequestSchema<(typeof _basicContract)["test"]>;
    const requestData: Request = {
      query: { page: 1 },
      body: { name: "test" },
      params: { id: "123" },
    };

    expect(requestData.query.page).toEqual(1);
    expect(requestData.body.name).toEqual("test");
    expect(requestData.params.id).toEqual("123");
  });

  it("should infer response schema types", () => {
    type SuccessResponse = InferResponseSchema<
      (typeof _basicContract)["test"],
      "SUCCESS"
    >;

    type ErrorResponse = InferResponseSchema<
      (typeof _basicContract)["test"],
      "ERROR"
    >;

    const successData: SuccessResponse = {
      data: "test",
    };

    const errorData: ErrorResponse = {
      message: "error",
    };

    expect(successData.data).toEqual("test");
    expect(errorData.message).toEqual("error");
  });

  it("should handle endpoints with partial request schemas", () => {
    const _partialContract = _contract.router({
      minimal: {
        method: "POST",
        path: "/minimal",
        body: z.object({
          value: z.number(),
        }),
        responses: {
          SUCCESS: z.object({
            result: z.boolean(),
          }),
        },
      },
    });

    type MinimalRequest = InferRequestSchema<
      (typeof _partialContract)["minimal"]
    >;

    const requestData: MinimalRequest = {
      body: { value: 42 },
      query: undefined,
      params: undefined,
    };

    expect(requestData.body.value).toEqual(42);
    expect(requestData.query).toBeUndefined();
    expect(requestData.params).toBeUndefined();
  });
});
