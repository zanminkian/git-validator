// @ts-check
import { resolveConfig } from "../utils.js";

const defaultConfig = {
  "*": [
    "./node_modules/.bin/git-validator format -u",
    "./node_modules/.bin/git-validator lint",
  ],
};
export default (await resolveConfig("lint-staged"))?.config ?? defaultConfig;
