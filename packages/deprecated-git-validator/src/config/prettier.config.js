// @ts-check
import { resolveConfig } from "../utils.js";

export default (await resolveConfig("prettier"))?.config ??
  (await import("@git-validator/prettier-config")).default;
