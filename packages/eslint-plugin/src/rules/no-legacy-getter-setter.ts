import { createSimpleRule, getRuleName } from "../utils.js";

export default createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow using legacy getter and setter.",
  create: (context) => ({
    "[property.name=/^__(define|lookup)[GS]etter__$/]": (node) => {
      context.reportNode(node);
    },
  }),
});
