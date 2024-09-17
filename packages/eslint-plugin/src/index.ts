import { noInstanceofBuiltin } from "./rules/no-instanceof-builtin.js";
import { noRestrictedLoops } from "./rules/no-restricted-loops.js";
import { noUnnecessaryTemplateString } from "./rules/no-unnecessary-template-string.js";
import { requireReduceInitialValue } from "./rules/require-reduce-initial-value.js";

export const rules = {
  [noInstanceofBuiltin.name]: noInstanceofBuiltin.rule,
  [noRestrictedLoops.name]: noRestrictedLoops.rule,
  [noUnnecessaryTemplateString.name]: noUnnecessaryTemplateString.rule,
  [requireReduceInitialValue.name]: requireReduceInitialValue.rule,
};
