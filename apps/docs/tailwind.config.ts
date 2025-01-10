import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@yuqijs/tailwind-config/web";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    ...baseConfig.content,
    "./components/**/*.vue",
    "./.vitepress/**/*.css",
  ],
  presets: [baseConfig],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
    },
  },
} satisfies Config;
