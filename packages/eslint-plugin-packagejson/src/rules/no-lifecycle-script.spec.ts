import { test } from "../test.spec.js";
import { name, rule } from "./no-lifecycle-script.js";

const valid = [
  {},
  { private: true, scripts: { postinstall: "foo" } },
  { foo: { postinstall: "bar" } },
];

const invalid = [
  { private: false, scripts: { postinstall: "foo" } },
  { scripts: { preinstall: "foo" } },
  { scripts: { install: "foo" } },
  { scripts: { postinstall: "foo" } },
  { scripts: { preuninstall: "foo" } },
  { scripts: { uninstall: "foo" } },
  { scripts: { postuninstall: "foo" } },
];

await test({ name, rule, valid, invalid });
