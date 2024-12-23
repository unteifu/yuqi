import type { Config } from "tailwindcss";
import { createPreset } from "fumadocs-ui/tailwind-plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@yuqijs/tailwind-config/web";

/** @type {import('tailwindcss').Config} */
export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.{ts,tsx}",
    "../../node_modules/fumadocs-ui/dist/**/*.js",
  ],
  presets: [
    baseConfig,
    createPreset({
      addGlobalColors: true,
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
    },
  },
} satisfies Config;
