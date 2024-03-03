import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "ban-ts-comment";
export const messageId = "banTsComment";
export const defaultOptions = [];
const description = "Disallow using ts comment to suppress compilation errors.";
const message = "Do not use ts comment to suppress compilation errors.";

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
    Program: () => {
      const comments = context.sourceCode.getAllComments();

      comments.forEach((comment) => {
        const invalidItems = comment.value.match(
          /@ts-(?:expect-error|ignore|nocheck)/g,
        );
        const validItems = comment.value.match(
          /["']@ts-(?:expect-error|ignore|nocheck)["']/g,
        );
        if (validItems?.length === invalidItems?.length) {
          return;
        }
        context.report({
          node: comment,
          messageId,
        });
      });
    },
  }),
});
