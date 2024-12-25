import { describe, expect, it } from "vitest";

import { interpolatePath } from "../src/utils/path";

describe("interpolatePath", () => {
  it("replaces a single path parameter correctly", () => {
    const path = "/users/:id";
    const params = { id: "123" };

    const result = interpolatePath(path, params);

    expect(result).toBe("/users/123");
  });

  it("handles multiple path parameters", () => {
    const path = "/organizations/:orgId/users/:userId";
    const params = { orgId: "456", userId: "789" };

    const result = interpolatePath(path, params);

    expect(result).toBe("/organizations/456/users/789");
  });

  it("properly encodes special characters in parameter values", () => {
    const path = "/users/:name";
    const params = { name: "John Doe & Sons" };

    const result = interpolatePath(path, params);

    expect(result).toBe("/users/John%20Doe%20%26%20Sons");
  });

  it("handles numeric parameter values", () => {
    const path = "/items/:id/quantity/:amount";
    const params = { id: 123, amount: 456 };

    const result = interpolatePath(path, params);

    expect(result).toBe("/items/123/quantity/456");
  });

  it("handles boolean parameter values", () => {
    const path = "/features/:enabled";
    const params = { enabled: true };

    const result = interpolatePath(path, params);

    expect(result).toBe("/features/true");
  });

  it("throws error for missing parameters", () => {
    const path = "/users/:id";
    const params = {} as Record<string, string>;

    expect(() => interpolatePath(path, params)).toThrow(
      "Missing required path parameters: id",
    );
  });

  it("throws error for null parameter values", () => {
    const path = "/users/:id";
    const params = { id: null };

    expect(() => interpolatePath(path, params)).toThrow(
      'Path parameter "id" cannot be null or undefined',
    );
  });

  it("throws error for undefined parameter values", () => {
    const path = "/users/:id";
    const params = { id: undefined };

    expect(() => interpolatePath(path, params)).toThrow(
      'Path parameter "id" cannot be null or undefined',
    );
  });
});
