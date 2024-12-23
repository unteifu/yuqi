import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import NavbarTitle from "~/components/NavbarTitle";

export const baseOptions: BaseLayoutProps = {
  links: [],
  githubUrl: "https://github.com/unteifu/yuqi",
  disableThemeSwitch: true,
  nav: {
    transparentMode: "always",
    title: <NavbarTitle />,
  },
};
