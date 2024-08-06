// @ts-check
import defaultConfig from "@git-validator/prettier-config";
import { resolveConfig } from "../utils.js";

export default (await resolveConfig("prettier"))?.config ?? defaultConfig;
