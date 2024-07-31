import { createSimpleRule, getRuleName } from "../utils.js";

export const rule = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using es6 getter and setter.",
  create: (context) => ({
    ObjectExpression: (node) => {
      node.properties
        .filter((p) => "kind" in p && (p.kind === "get" || p.kind === "set"))
        .forEach((p) => context.reportNode(p));
    },
    ClassBody: (node) => {
      node.body
        .filter((p) => "kind" in p && (p.kind === "get" || p.kind === "set"))
        .forEach((p) => context.reportNode(p));
    },
  }),
});
