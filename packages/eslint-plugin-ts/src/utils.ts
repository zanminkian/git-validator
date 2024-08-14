import path from "node:path";
import { fileURLToPath } from "node:url";
import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type {
  RuleContext,
  RuleListener,
} from "@typescript-eslint/utils/ts-eslint";

export interface Context<O> extends Omit<RuleContext<string, O[]>, "report"> {
  reportNode: (node: TSESTree.Node | TSESTree.Token) => void;
}

export function createSimpleRule<O>(options: {
  name: string;
  message: string;
  create: (context: Context<O>) => RuleListener;
  schema?: JSONSchema4[];
  defaultOptions?: O[];
}) {
  const { name, message, create, schema = [], defaultOptions = [] } = options;
  const messageId = name;

  const rule = ESLintUtils.RuleCreator((ruleName) => ruleName)({
    name,
    meta: {
      type: "problem",
      docs: {
        description: message,
      },
      schema,
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

export function getRuleName(importMetaUrl: string) {
  // remove '.js' extension
  return path.basename(fileURLToPath(importMetaUrl)).slice(0, -3);
}
