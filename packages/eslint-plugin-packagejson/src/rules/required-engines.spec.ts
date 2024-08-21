import path from "node:path";
import process from "node:process";
import { test } from "../test.spec.js";
import { name, rule } from "./required-engines.js";

const valid = [
  { code: {}, filename: "" },
  { code: {}, filename: undefined },
  {
    code: { engines: { node: "1.0.0" } },
    filename: path.join(process.cwd(), "package.json"),
  },
];
const invalid = [
  { code: {}, filename: path.join(process.cwd(), "package.json") },
  {
    code: { engines: null },
    filename: path.join(process.cwd(), "package.json"),
  },
  { code: { engines: {} }, filename: path.join(process.cwd(), "package.json") },
];

await test({ name, rule, valid, invalid });
