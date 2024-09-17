import type { Rule } from "eslint";
import type { Node } from "estree";
import { getRuleName } from "../utils.js";

// TODO: If https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2454 is accepted, migrate this rule to `eslint-plugin-unicorn`
const name = getRuleName(import.meta.url);
/**
 * If an array is empty, calling reduce will cause runtime error.
 * This rule force to pass an initial value when calling `reduce`/`reduceRight` method.
 * This rule doesn't handle call/apply/bind cases, and their corresponding Reflect apis.
 */
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "When calling `reduce` or `reduceRight`, an initial value is required.",
    },
    messages: {
      [`${name}/error`]:
        "When calling `reduce` or `reduceRight`, an initial value is required.",
    },
  },
  create: (context) => ({
    "CallExpression[callee.type='MemberExpression'][callee.property.name=/^(reduce|reduceRight)$/][arguments.length=1]":
      (node: Node) => {
        context.report({ node, messageId: `${name}/error` });
      },
  }),
};
export const requireReduceInitialValue = { name, rule };
