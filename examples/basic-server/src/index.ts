import { Yuqi } from "@yuqijs/server";

const app = new Yuqi();

app.listen(3000, ({ port }) => {
  console.log(`Server running on port ${port}`);
});

type AppType = typeof app;
