// @ts-check
import { resolveConfig } from "./utils.js";

const defaultConfig = { extends: ["@commitlint/config-conventional"] };
export default (await resolveConfig("commitlint"))?.config ?? defaultConfig;
