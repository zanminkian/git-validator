import { create } from "../check-import.js";
import { createSimpleRule, getRuleName } from "../utils.js";

export default createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Disallow importing from a declaration style file or a ts file",
  create: (context) => create(context, check),
});

function check(filename: string, source: string) {
  // disabled this rule in declaration files
  if (
    [".d.ts", ".d.cts", ".d.mts", ".d.tsx"].some((ext) =>
      filename.endsWith(ext),
    )
  ) {
    return false;
  }
  return [
    ".d.js",
    ".d.cjs",
    ".d.mjs",
    ".d.jsx",
    ".ts",
    ".cts",
    ".mts",
    ".tsx",
  ].some((ext) => source.endsWith(ext));
}
