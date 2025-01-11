import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { createCssVariablesTheme } from "shiki/core";
import { defineConfig } from "vitepress";

const theme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-",
  fontStyle: true,
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "YuqiJS",
  description:
    "YuqiJS is an End-To-End Typesafe library designed to streamline API development with TypeScript. By offering a powerful suite of tools for defining, validating, and consuming APIs, YuqiJS ensures complete type safety across the entire stack. With a focus on predictability, maintainability, and developer experience, it simplifies the process of building robust and scalable APIs while eliminating duplication and reducing runtime errors. Whether you're working on a monolith, microservices, or a modern frontend-backend architecture, YuqiJS empowers you to deliver APIs with confidence and consistency.",
  appearance: false,
  lastUpdated: true,
  markdown: {
    theme,
    codeTransformers: [transformerTwoslash()],
  },
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap",
        rel: "stylesheet",
      },
    ],
  ],
  cleanUrls: true,
  themeConfig: {
    logo: "/yuqi.webp",
    siteTitle: false,
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Playground", link: "/playground" }],
    sidebar: [
      {
        text: '<i class="fa-solid fa-layer-group"></i> Foundations',
        items: [{ text: "Introduction", link: "/introduction" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/unteifu/yuqi" },
      { icon: "discord", link: "https://discord.com/invite/4tsmYvgWKQ" },
    ],
  },
});
