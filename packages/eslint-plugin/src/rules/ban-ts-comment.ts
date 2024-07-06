import { createSimpleRule, getRuleName } from "../utils.js";

export default createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using ts comment to suppress compilation errors.",
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
        context.reportNode(comment);
      });
    },
  }),
});
