import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using for-in statement.",
  create: (context) => ({
    ForInStatement: (node) => {
      context.reportNode(node);
    },
  }),
});
