import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: resolve(__dirname, "../tsconfig.json"),
      include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
    }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "../src/core/index.ts"),
      name: "pd-form",
      fileName: "index",
    },
    minify: "esbuild",
    rollupOptions: {
      external: Object.keys(require("../package.json").peerDependencies || {}),
      output: {
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
        },
      },
    },
  },
});
