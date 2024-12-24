<p align="center">
 <img src="../../assets/yuqi.webp" height="150"></img>
</p>
<p align="center">Build e2e typesafe REST API's magically 🪄</p>

<h2>@yuqijs/contract</h2>

<h3 align="center">Read the <a href="https://yuqijs.com">documentation</a> to get started 🚀</h3>

`@yuqijs/contract` is a package that helps you define your REST API through a contract to be consumed by your API client and server. It provides a simple and intuitive way to define your API contract using TypeScript and Zod.

<h2>Features</h2>

- Simple contract definition using Zod ✍️
- Nested contracts for better organization 📂
- Infer request and response types from contracts 🧙‍♂️
- Structured response definitions for each HTTP status codes 🚦
- Supports all HTTP methods 🚀

<h2>Installation</h2>

```bash
npm install @yuqijs/contract zod
pnpm add @yuqijs/contract zod
yarn add @yuqijs/contract zod
bun add @yuqijs/contract zod
```

<h2>Usage</h2>

<h4>Create a contract</h4>

```typescript
import type { InferRequest, InferResponse } from "@yuqijs/contract";
import { createContract } from "@yuqijs/contract";
import { z } from "zod";

// Define a contract
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

// Create contract collection with nested contracts
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
```

<h4>Infer contract request and response types</h4>

```typescript
import type { InferRequest, InferResponse } from "@yuqijs/contract";

// Infer types from nested contracts
type GetUserRequest = InferRequest<(typeof contract)["users"]["getUser"]>;
// { params: { id: string } }

type GetUserResponse = InferResponse<
  (typeof contract)["users"]["getUser"],
  200
>;
// { id: string, name: string, email: string }
```
