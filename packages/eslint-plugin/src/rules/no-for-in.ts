import { createSimpleRule } from "../utils.js";

export default createSimpleRule({
  name: "no-for-in",
  message: "Disallow using for-in statement.",
  create: (context) => ({
    ForInStatement: (node) => {
      context.reportNode(node);
    },
  }),
});
