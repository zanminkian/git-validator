import rule from "./no-relative-parent-imports.js";
import { test } from "./utils.spec.js";

const valid = [
  "import foo from 'foo'",
  "import 'foo'",
  "require('foo')",
  "import('foo')",

  "import foo from '.foo'",
  "import foo from './foo'",
  "import foo from '../foo'",
  "import foo from '../../foo'",
];

const invalid = [
  "import foo from '../../../foo'",
  "import '../../../foo'",
  "require('../../../foo')",
  "import('../../../foo')",

  "import foo from '../../../../foo'",
];

test({ valid, invalid, ...rule });
