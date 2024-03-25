import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "no-property-decorator";
export const messageId = "noPropertyDecorator";
export const defaultOptions = [];
const description = "Disallow using property decorator.";
const message =
  "Do not use property decorator. Consider adding `declare` keyword in front of the property to fix it.";

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
    PropertyDefinition: (node) => {
      if (node.parent.type !== "ClassBody") {
        return;
      }
      if (node.decorators.length > 0 && !node.declare) {
        context.report({ node, messageId });
      }
    },
  }),
});
