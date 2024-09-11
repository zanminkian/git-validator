import type { ImportDeclaration } from "estree";
import { createSimpleRule, getRuleName } from "../utils.js";

const ignores = [
  "^reflect-metadata$",
  // https://github.com/vitejs/vite/blob/main/packages/vite/client.d.ts
  "(?<!\\.module)\\.css$",
  "(?<!\\.module)\\.scss$",
  "(?<!\\.module)\\.sass$",
  "(?<!\\.module)\\.less$",
  "(?<!\\.module)\\.styl$",
  "(?<!\\.module)\\.stylus$",
  "(?<!\\.module)\\.pcss$",
  "(?<!\\.module)\\.sss$",
];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
export const noSideEffectImport = createSimpleRule({
  name: getRuleName(import.meta.url),
  message:
    "Side effect import is often used for polyfills and css. It's unsafe to use it.",
  create: (context) => {
    if (
      [".d.ts", ".d.cts", ".d.mts", ".d.tsx"].some((ext) =>
        context.filename.endsWith(ext),
      )
    ) {
      return {};
    }
    const ignoreExps = ignores.map((ignore) => new RegExp(ignore));
    return {
      "ImportDeclaration[specifiers.length=0]": (node: ImportDeclaration) => {
        if (
          ignoreExps.some((exp) =>
            exp.test(node.source.value?.toString() ?? ""),
          )
        ) {
          return;
        }
        context.reportNode(node);
      },
    };
  },
});
