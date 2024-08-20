import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "../test.spec.js";
import { name, rule } from "./required-hashbang.js";

const dir = path.dirname(fileURLToPath(import.meta.url));

const valid = [
  { code: {}, filename: undefined },
  { code: { name: "foo" }, filename: undefined },
  { code: { bin: {} }, filename: undefined },
  {
    code: { bin: "./good.js" },
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
  {
    code: { bin: { foo: "./good.js", bar: "./good.js" } },
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
];

const invalid = [
  { code: { bin: 123 }, filename: undefined },
  { code: { bin: [] }, filename: undefined },
  { code: { bin: { foo: true } }, filename: undefined },
  {
    code: { bin: "./no-existing.js" },
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
  {
    code: { bin: "./bad.js" },
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
  {
    code: { bin: { foo: "./bad.js" } },
    filename: path.join(dir, "../../test/required-hashbang/package.json"),
  },
];

await test({ name, rule, valid, invalid });
