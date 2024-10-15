// @ts-check
import { resolveConfig } from "../utils.js";

export default (await resolveConfig("fenge"))?.config?.lint ??
  (await resolveConfig("eslint"))?.config ??
  (await import("../re-export/eslint.config.js")).default;
