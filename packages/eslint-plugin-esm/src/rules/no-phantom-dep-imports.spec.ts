import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { test } from "../test.spec.js";
import { noPhantomDepImports } from "./no-phantom-dep-imports.js";

const valid = [
  { code: "import foo from '/foo'" },
  { code: "import foo from './foo'" },
  { code: "import foo from '../foo'" },
  { code: "import foo from 'node:foo'" },
  { code: "import type {Foo} from 'foo'" },
  {
    code: "import eslint from 'eslint'",
    filename: fileURLToPath(import.meta.url),
  },
];

const invalid = [
  { code: "import {type Foo} from 'foo'" },
  { code: "import foo from 'foo'", filename: fileURLToPath(import.meta.url) },
  {
    code: "import eslint from 'eslint'",
    filename: path.join(process.cwd(), "foo.js"),
  },
];

test({ valid, invalid, ...noPhantomDepImports });
