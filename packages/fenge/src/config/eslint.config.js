// @ts-check
import { resolveConfig } from "../utils.js";

export default (await resolveConfig("eslint"))?.config ??
  (await import("@fenge/eslint-config")).default;
