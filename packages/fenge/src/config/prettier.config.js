// @ts-check
import { resolveConfig } from "../utils.js";

export default (await resolveConfig("fenge"))?.config?.format ??
  (await resolveConfig("prettier"))?.config ??
  (await import("../re-export/prettier.config.js")).default;
