import type { Preview } from "@storybook/nextjs-vite";
import { useEffect } from "react";
import { fontBody, fontDisplay } from "../src/styles/fonts";
import "../src/app/globals.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Colour theme (data-theme on <html>)",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, ctx) => {
      const theme = ctx.globals.theme as string;
      useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.classList.add(fontBody.variable, fontDisplay.variable);
      }, [theme]);
      return (
        <div className="bg-surface p-6 font-sans text-ink">
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    controls: { matchers: { color: /(background|color)$/i } },
    // axe runs on every story; violations fail `storybook test` / the a11y panel shows them.
    a11y: { test: "error" },
    // Storybook 10.6.2's app-router mock lacks LayoutRouterContext.parentRenderTree, which
    // Next 16.4's useRouter reads → every story crashes. No story needs the app router
    // (next/link works without it). Revisit when @storybook/nextjs-vite is upgraded.
    nextjs: { appDirectory: false },
  },
};
export default preview;
