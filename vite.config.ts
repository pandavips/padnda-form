import type { UserConfig } from "vite";
import { defineConfig, mergeConfig } from "vite";

import baseConfig from "./config/base";

import libConfig from "./config/lib";

const modeConfig: Record<string, UserConfig> = {
  lib: libConfig,
};

export default defineConfig(({ mode }) => {
  return mergeConfig(baseConfig, modeConfig[mode]);
});
