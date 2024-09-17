import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

// TODO: If https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2453 is accepted, migrate this rule to `eslint-plugin-unicorn`
/**
 * Only allow `while` and `for-of` loops. `for`, `for-in`, `do-while` and `for-await-of` loops are disallowed.
 * Visit https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2453 for more details.
 */
export const noRestrictedLoops = createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "Only allow `while` and `for-of` loops. `for`, `for-in`, `do-while` and `for-await-of` loops are disallowed.",
  create: (context) => ({
    ":matches(ForStatement, ForInStatement, DoWhileStatement, ForOfStatement[await=true])":
      (node: Node) => {
        context.reportNode(node);
      },
  }),
});
