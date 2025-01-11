import baseConfig, { restrictEnvAccess } from "@yuqijs/eslint-config/base";
import vueConfig from "@yuqijs/eslint-config/vue";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".vitepress/cache/**", ".vitepress/dist/**"],
  },
  ...baseConfig,
  ...vueConfig,
  ...restrictEnvAccess,
];
