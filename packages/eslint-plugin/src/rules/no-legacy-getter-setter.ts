import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "no-legacy-getter-setter";
export const messageId = "noLegacyGetterSetter";
export const defaultOptions = [];
const description = "Disallow using legacy getter and setter.";
const message =
  "It's deprecated. Use `Object.defineProperty` or `Object.getOwnPropertyDescriptor` instead.";

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
    "[property.name=/^__(define|lookup)[GS]etter__$/]": (node) => {
      context.report({
        node,
        messageId,
      });
    },
  }),
});
