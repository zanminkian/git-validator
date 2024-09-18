import { argumentsLength } from "./rules/arguments-length.js";
import { noInstanceofBuiltin } from "./rules/no-instanceof-builtin.js";
import { noRestrictedLoops } from "./rules/no-restricted-loops.js";
import { noUnnecessaryTemplateString } from "./rules/no-unnecessary-template-string.js";

export const rules = {
  [argumentsLength.name]: argumentsLength.rule,
  [noInstanceofBuiltin.name]: noInstanceofBuiltin.rule,
  [noRestrictedLoops.name]: noRestrictedLoops.rule,
  [noUnnecessaryTemplateString.name]: noUnnecessaryTemplateString.rule,
};
