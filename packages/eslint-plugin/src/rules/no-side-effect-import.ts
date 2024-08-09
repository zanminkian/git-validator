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
export const rule = createSimpleRule({
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
      ImportDeclaration: (node) => {
        const { value } = node.source;
        if (typeof value !== "string") {
          return context.reportNode(node);
        }
        if (ignoreExps.some((exp) => exp.test(value))) {
          return;
        }
        if (node.specifiers.length <= 0) {
          context.reportNode(node);
        }
      },
    };
  },
});
