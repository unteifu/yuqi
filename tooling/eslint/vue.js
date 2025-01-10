import vuePlugin from "eslint-plugin-vue";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  {
    ...vuePlugin.configs["recommended"],
    files: ["**/*.ts", "**/*.vue"],
  },
];
