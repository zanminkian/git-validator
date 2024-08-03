import { rule } from "./no-side-effect-import.js";
import { test } from "./utils.spec.js";

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

test({ valid, invalid, ...rule });
