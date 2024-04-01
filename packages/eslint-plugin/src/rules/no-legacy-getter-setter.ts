import { createSimpleRule } from "../utils.js";

export default createSimpleRule({
  name: "no-legacy-getter-setter",
  message: "Disallow using legacy getter and setter.",
  create: (context) => ({
    "[property.name=/^__(define|lookup)[GS]etter__$/]": (node) => {
      context.reportNode(node);
    },
  }),
});
