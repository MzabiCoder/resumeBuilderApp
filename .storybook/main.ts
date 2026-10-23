import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  staticDirs: ["../public"],
  // Next builds CSS through @tailwindcss/turbopack; Storybook (Vite) needs the Vite plugin.
  viteFinal: async (cfg) => ({ ...cfg, plugins: [...(cfg.plugins ?? []), tailwindcss()] }),
};
export default config;
