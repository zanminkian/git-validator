import { newParens } from "./rules/new-parens.js";
import { noForIn } from "./rules/no-for-in.js";
import { noInstanceofBuiltin } from "./rules/no-instanceof-builtin.js";
import { noUnnecessaryTemplateString } from "./rules/no-unnecessary-template-string.js";
import { requireReduceInitialValue } from "./rules/require-reduce-initial-value.js";

export const rules = {
  [newParens.name]: newParens.rule,
  [noForIn.name]: noForIn.rule,
  [noInstanceofBuiltin.name]: noInstanceofBuiltin.rule,
  [noUnnecessaryTemplateString.name]: noUnnecessaryTemplateString.rule,
  [requireReduceInitialValue.name]: requireReduceInitialValue.rule,
};
