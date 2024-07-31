import { rule } from "./no-unnecessary-template-string.js";
import { test } from "./utils.spec.js";

const valid = [
  "'abc'",
  '"def"',
  "`ab${cd}ef`", // eslint-disable-line no-template-curly-in-string
  "`\n`",
  "`abc\n`",
  "`\nabc`",
  "`a\nbc`",
];

const invalid = ["``", "`abc`", "`abc\\n`", "`\\nabc`", "`a\\nbc`"];

test({ valid, invalid, ...rule });
