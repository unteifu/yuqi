import baseConfig, { restrictEnvAccess } from "@yuqijs/eslint-config/base";
import nextjsConfig from "@yuqijs/eslint-config/nextjs";
import reactConfig from "@yuqijs/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
