import { test } from "../test.spec.js";
import { noUnnecessaryTemplateString } from "./no-unnecessary-template-string.js";

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

test({ valid, invalid, ...noUnnecessaryTemplateString });
