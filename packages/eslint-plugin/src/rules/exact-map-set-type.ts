import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "exact-map-set-type";
export const messageId = "exactMapSetType";
export const defaultOptions = [];
const description = "Disallow using Map and Set without type arguments.";
const message = "Map and Set should have type arguments.";

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
    Identifier: (node) => {
      if (!["Map", "Set"].includes(node.name)) {
        return;
      }
      const { parent } = node;
      if (parent.type === "NewExpression" && parent.arguments.length > 0) {
        return;
      }
      if (
        "typeArguments" in parent &&
        (parent.typeArguments?.params.length ?? 0) === 0
      ) {
        context.report({
          node,
          messageId,
        });
      }
    },
  }),
});
