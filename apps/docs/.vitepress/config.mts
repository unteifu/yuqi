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
  description: "A VitePress Site",
  appearance: false,
  lastUpdated: true,
  markdown: {
    theme,
    codeTransformers: [transformerTwoslash()],
  },
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
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/unteifu/yuqi" },
      { icon: "discord", link: "https://discord.com/invite/4tsmYvgWKQ" },
    ],
  },
});
