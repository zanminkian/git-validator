import prettierConfig from "eslint-config-prettier";
import baseConfig from "./base-config/index.js";
import tsConfig from "./ts-config.js";

export default [baseConfig, ...tsConfig, prettierConfig];
