import prettierConfig from "eslint-config-prettier";
import base from "./base.js";
import baseConfig from "./base-config/index.js";
import tsConfig from "./ts-config.js";

export default [base, baseConfig, ...tsConfig, prettierConfig];
