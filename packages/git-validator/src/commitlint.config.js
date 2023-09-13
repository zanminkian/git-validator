// @ts-check
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cosmiconfig } from "cosmiconfig";

const __dirname = dirname(fileURLToPath(import.meta.url));

const defaultConfig = { extends: ["@commitlint/config-conventional"] };

export default (await cosmiconfig("commitlint").search(join(__dirname, "..")))?.config ??
  defaultConfig;
