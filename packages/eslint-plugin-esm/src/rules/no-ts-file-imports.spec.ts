import { test } from "../test.spec.js";
import { noTsFileImports } from "./no-ts-file-imports.js";

const codes = [
  "import foo from './foo.ts'",
  "import foo from './foo.cts'",
  "import foo from './foo.mts'",
  "import foo from './foo.tsx'",

  "import foo from 'foo.d.bar'",
  "import foo from './foo.d.bar'",
  "import foo from './foo/foo.d.bar'",

  "import foo from './foo.d.ts'",
  "import foo from './foo.d.cts'",
  "import foo from './foo.d.mts'",
  "import foo from './foo.d.tsx'",

  "import foo from './foo.d.js'",
  "import foo from './foo.d.cjs'",
  "import foo from './foo.d.mjs'",
  "import foo from './foo.d.jsx'",

  "import foo from '/foo.ts'",
  "import foo from '/foo.d.js'",
];

const invalid = codes.flatMap((code) => [
  { code, filename: "bar.js" },
  { code, filename: "bar" },
  { code, filename: "bar.ts" },
  { code, filename: "bar.tsx" },
]);
const valid = codes.flatMap((code) => [
  { code, filename: "bar.d.ts" },
  { code, filename: "bar.d.tsx" },
]);

test({ valid, invalid, ...noTsFileImports });
