// @ts-check
import { resolveConfig } from "../utils.js";

const defaultConfig = { "*": ["./node_modules/.bin/git-validator format -u"] };
export default (await resolveConfig("lint-staged"))?.config ?? defaultConfig;
