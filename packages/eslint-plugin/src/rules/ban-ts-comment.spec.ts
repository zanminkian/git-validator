import { test } from "../test.spec.js";
import { rule } from "./ban-ts-comment.js";

const directives = ["@ts-ignore", "@ts-expect-error", "@ts-nocheck"];

const valid = directives.flatMap((d) => [
  // "//",
  // "/**/",
  `// '${d}'`,
  `// "${d}"`,
  `// "${d}" '${d}'`,
  `/** '${d}' */`,
  `/** "${d}" */`,
]);

const invalid = directives.flatMap((d) => [
  `// ${d}`,
  `/* ${d} */`,
  `/** ${d} "${d}" */`,
]);

test({ valid, invalid, ...rule });
