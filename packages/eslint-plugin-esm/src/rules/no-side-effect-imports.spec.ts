import { test } from "../test.spec.js";
import { noSideEffectImports } from "./no-side-effect-imports.js";

const valid = [
  "import 'reflect-metadata'",
  "import {} from 'reflect-metadata'",
  "import 'foo.css'",
  "import './foo.css'",
  "import 'module.css'",
  "import {foo} from 'foo'",
]
  .map((code) => ({ code, filename: "foo.ts" }))
  .concat({ code: "import 'foo'", filename: "foo.d.ts" });

const invalid = [
  "import 'foo'",
  "import './foo'",
  "import {} from 'foo'",
  "import {} from './foo'",
  "import './reflect-metadata'",
  "import './foo.module.css'",
  "import 'foo.module.css'",
].map((code) => ({ code, filename: "foo.ts" }));

test({ valid, invalid, ...noSideEffectImports });
