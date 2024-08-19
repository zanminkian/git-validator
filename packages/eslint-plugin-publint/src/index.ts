import { createRule } from "./create-rule.js";
import { processor } from "./processor.js";

export const rules = {
  suggestion: createRule("suggestion"),
  warning: createRule("warning"),
  error: createRule("error"),
};

export const processors = { processor };
