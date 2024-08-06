// @ts-check
import defaultConfig from "@git-validator/eslint-config";
import { resolveConfig } from "../utils.js";

export default (await resolveConfig("eslint"))?.config ?? defaultConfig;
