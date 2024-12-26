import { join, dirname } from "path";
import type { StorybookConfig } from "@storybook/react-vite";
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  stories: [
    "../storybook-tests/**/*.mdx",
    "../storybook-tests/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  async viteFinal(config) {
    return {
      ...config,
      assetsInclude: [...config.assetsInclude as string[], "README.md"],
    };
  },
} satisfies StorybookConfig;
export default config;
