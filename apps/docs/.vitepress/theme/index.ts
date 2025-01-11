// https://vitepress.dev/guide/custom-theme
import type { EnhanceAppContext, Theme } from "vitepress";
import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import DefaultTheme from "vitepress/theme-without-fonts";

import Layout from "../../components/Layout.vue";

import "./style.css";
import "@shikijs/vitepress-twoslash/style.css";

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue);
  },
} satisfies Theme;
