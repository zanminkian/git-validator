import { create } from "../check-import.js";
import { createSimpleRule, getRuleName } from "../utils.js";

const depth = 3;

export default createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow to import module from relative parent path too deeply.",
  create: (context) => create(context, checkDepth),
});

function checkDepth(_filename: string, source: string) {
  return new RegExp(`^(\\.\\./){${depth},}`).test(source);
}
