import { messageId, rule, ruleName } from "./ban-ts-comment.js";
import { test } from "./utils.spec.js";

const directives = ["@ts-ignore", "@ts-expect-error", "@ts-nocheck"];

const valid = directives.flatMap((d) => [
  "//",
  "/**/",
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

test({ valid, invalid, messageId, rule, ruleName });
