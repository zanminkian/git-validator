import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils";
import type {
  RuleContext,
  RuleListener,
} from "@typescript-eslint/utils/ts-eslint";

interface Context extends RuleContext<string, unknown[]> {
  reportNode: (node: TSESTree.Node | TSESTree.Token) => void;
}

export function createSimpleRule(options: {
  name: string;
  message: string;
  create: (context: Context) => RuleListener;
}) {
  const { name, message, create } = options;
  const messageId = name;
  const defaultOptions: unknown[] = [];

  const rule = ESLintUtils.RuleCreator((ruleName) => ruleName)<
    typeof defaultOptions,
    typeof messageId
  >({
    name,
    meta: {
      type: "problem",
      docs: {
        description: message,
      },
      schema: [],
      messages: {
        [messageId]: message,
      },
    },
    defaultOptions,
    create: (context) => {
      const ctx = Object.assign({}, context, {
        reportNode: (node: TSESTree.Node | TSESTree.Token) =>
          context.report({ node, messageId }),
      });
      Object.setPrototypeOf(ctx, Object.getPrototypeOf(context));
      return create(ctx);
    },
  });

  return {
    name,
    rule,
  };
}
