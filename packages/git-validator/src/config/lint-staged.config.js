// @ts-check
import { resolveConfig } from "../utils.js";

const defaultConfig = { "*": ["npx git-validator -w"] };
export default (await resolveConfig("lint-staged"))?.config ?? defaultConfig;
