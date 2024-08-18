import { test } from "../test.spec.js";
import { rule } from "./no-dynamic-import.js";

const valid = [
  'import("foo")',
  'import("./foo")',
  'await import("foo")',
  'const foo = await import("foo")',
];

const invalid = [
  // 'import()',
  // 'await import()',
  "import(123)",
  "await import(123)",
  "import(`foo`)",
  "import(foo)",
  "const foo = await import(foo)",
  // "import(foo, {})", // only ts support it, not ecmascript
  // 'import("foo", {})', // only ts support it, not ecmascript
];

test({ valid, invalid, ...rule });
