import { describe, expect, it } from "vitest";
import { z } from "zod";

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
