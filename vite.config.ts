import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import vitePluginWASM from "vite-plugin-wasm";

export default defineConfig({
  plugins: [sveltekit(), vitePluginWASM()],
  ssr: {
    noExternal: ["three"],
  },
});
