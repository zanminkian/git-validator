// @ts-check
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cosmiconfig } from "cosmiconfig";

const __dirname = dirname(fileURLToPath(import.meta.url));

const defaultConfig = { "*": ["npx git-validator -u"] };

export default (await cosmiconfig("lint-staged").search(join(__dirname, "..")))?.config ??
  defaultConfig;
