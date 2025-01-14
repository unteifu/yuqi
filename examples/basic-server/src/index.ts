import { Yuqi } from "@yuqijs/server";

const app = new Yuqi();

app
  .get("/test", ({ res }) => {
    res.json({ message: "Hello from Yuqi!" });
  })
  .get("/error", () => {
    throw new Error("Test error handling");
  })
  .get("/async", async ({ res }) => {
    const data = await Promise.resolve({ message: "Async route working" });
    res.json(data);
  })
  .listen(3000, ({ host, port }) => {
    console.log(`Server running at ${host}:${port}`);
    console.log("\nTest endpoints:");
    console.log("- GET http://localhost:3000/test");
    console.log("- GET http://localhost:3000/error");
    console.log("- GET http://localhost:3000/async");
  });

export type AppType = typeof app;
