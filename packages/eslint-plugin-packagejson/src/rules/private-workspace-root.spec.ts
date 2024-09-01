import path from "node:path";
import process from "node:process";
import { test } from "../test.spec.js";
import { name, rule } from "./private-workspace-root.js";

const valid = [
  {
    code: {},
    filename: path.join(process.cwd(), "./package.json"),
  },
  {
    code: { private: true },
    filename: path.join(process.cwd(), "../../package.json"),
  },
];
const invalid = [
  {
    code: {},
    filename: path.join(process.cwd(), "../../package.json"),
  },
  {
    code: { private: false },
    filename: path.join(process.cwd(), "../../package.json"),
  },
  {
    code: { private: "true" },
    filename: path.join(process.cwd(), "../../package.json"),
  },
];

await test({ name, rule, valid, invalid });
