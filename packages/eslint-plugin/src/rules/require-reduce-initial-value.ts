import type { Node } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

// TODO: If https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2454 is accepted, migrate this rule to `eslint-plugin-unicorn`
/**
 * If an array is empty, calling reduce will cause runtime error.
 * This rule force to pass an initial value when calling `reduce`/`reduceRight` method.
 * This rule doesn't handle call/apply/bind cases, and their corresponding Reflect apis.
 */
export const requireReduceInitialValue = createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "When calling `reduce` or `reduceRight`, an initial value is required.",
  create: (context) => ({
    "CallExpression[callee.type='MemberExpression'][callee.property.name=/^(reduce|reduceRight)$/][arguments.length=1]":
      (node: Node) => {
        context.reportNode(node);
      },
  }),
});
