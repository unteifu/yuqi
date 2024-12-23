import { z } from "zod";

import type { InferRequest, InferResponse } from "@yuqijs/contract";
import { createContract } from "@yuqijs/contract";

// Define User contracts
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
        email: z.string(),
      }),
      404: z.object({
        error: z.string(),
      }),
    },
  },
  updateUser: {
    path: "/users/:id",
    method: "PUT",
    request: {
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
      }),
    },
    responses: {
      200: z.object({
        success: z.boolean(),
      }),
      404: z.object({
        error: z.string(),
      }),
    },
  },
});

// Create API with embedded contracts
const contract = createContract({
  users: userContract,
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

// Infer types from nested contracts
type GetUserRequest = InferRequest<(typeof contract)["users"]["getUser"]>;
// { params: { id: string } }

type GetUserResponse = InferResponse<
  (typeof contract)["users"]["getUser"],
  200
>;
// { id: string, name: string, email: string }
