import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "prefer-global-this";
export const messageId = "preferGlobalThis";
export const defaultOptions = [];
const description =
  "Disallow `global` or `self` object and prefer `globalThis`";
const message =
  "Do not use `global` or `self` object. Use `globalThis` instead";

export const rule = ESLintUtils.RuleCreator((name) => name)<
  typeof defaultOptions,
  typeof messageId
>({
  name: ruleName,
  meta: {
    type: "problem",
    docs: {
      description,
    },
    schema: [],
    messages: {
      [messageId]: message,
    },
  },
  defaultOptions,
  create: (context) => ({
    Program: (node) => {
      const banned = ["global", "self"];
      // Report variables declared elsewhere
      const scope = context.sourceCode.getScope(node);
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
  }),
});
