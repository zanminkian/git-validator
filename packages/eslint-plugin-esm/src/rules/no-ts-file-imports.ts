import { create, createRule, getRuleName } from "../common.js";

export const noTsFileImports = createRule({
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
  const file = source.split("/").at(-1);
  if (!file || file.includes(".d.")) {
    return true;
  }
  return [".ts", ".cts", ".mts", ".tsx"].some((ext) => file.endsWith(ext));
}
