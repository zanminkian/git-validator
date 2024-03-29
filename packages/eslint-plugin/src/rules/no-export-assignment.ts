import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "no-export-assignment";
export const messageId = "noExportAssignment";
export const defaultOptions = [];
const description = "Disallow using `export =` statement.";
const message =
  "Do not use `export =` statement. Use `export default` instead.";

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
  create: (context) => {
    const extension = context.filename.split(".").pop();
    if (!["ts", "tsx", "mts", "cts"].includes(extension ?? "")) {
      return {};
    }
    return {
      TSExportAssignment: (node) => {
        context.report({
          node,
          messageId,
        });
      },
    };
  },
});
