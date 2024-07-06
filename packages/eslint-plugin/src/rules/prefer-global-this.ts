import { createSimpleRule, getRuleName } from "../utils.js";

export default createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow `global` or `self` object and prefer `globalThis`",
  create: (context) => ({
    Program: (node) => {
      const banned = ["global", "self"];
      // Report variables declared elsewhere
      const scope = context.sourceCode.getScope(node);
      scope.variables.forEach((v) => {
        if (banned.includes(v.name)) {
          v.references.forEach((ref) => {
            context.reportNode(ref.identifier);
          });
        }
      });
      // Report variables not declared at all
      scope.through.forEach((ref) => {
        if (banned.includes(ref.identifier.name)) {
          context.reportNode(ref.identifier);
        }
      });
    },
  }),
});
