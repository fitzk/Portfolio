import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    mdsvex({
      extensions: [".svelte", ".md"],
    }),
    vitePreprocess()
  ],
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === "production" ? "/Portfolio" : "",
    },
  },
  extensions: [".svelte", ".md"],
};

export default config;
