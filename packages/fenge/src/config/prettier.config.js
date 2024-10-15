// @ts-check
import { resolveConfig } from "../utils.js";

export default (await resolveConfig("prettier"))?.config ??
  (await import("@fenge/prettier-config")).default;
