import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "prefer-global-this";
export const messageId = "preferGlobalThis";
export const defaultOptions = [];
const description =
  "Disallow `global` or `self` object and prefer `globalThis`";
const message =
  "Do not use `global` or `self` object. Use `globalThis` instead";

export const rule = ESLintUtils.RuleCreator((ruleName) => ruleName)<
  typeof defaultOptions,
  typeof messageId
>({
  name: ruleName,
  meta: {
    type: "problem",
    docs: {
      description,
      recommended: "recommended",
    },
    schema: [],
    messages: {
      [messageId]: message,
    },
  },
  defaultOptions,
  create: (context) => {
    const scope = context.getScope();
    return {
      Program: () => {
        const banned = ["global", "self"];
        // Report variables declared elsewhere
        scope.variables.forEach((v) => {
          if (banned.includes(v.name)) {
            v.references.forEach((ref) => {
              context.report({
                node: ref.identifier,
                messageId,
              });
            });
          }
        });
        // Report variables not declared at all
        scope.through.forEach((ref) => {
          if (banned.includes(ref.identifier.name)) {
            context.report({
              node: ref.identifier,
              messageId,
            });
          }
        });
      },
    };
  },
});
