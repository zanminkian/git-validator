import path from "node:path";
import process from "node:process";
import { test } from "../test.spec.js";
import { name, rule } from "./no-dependencies-in-workspace-root.js";

const valid = [
  {
    code: { dependencies: {} },
    filename: path.join(process.cwd(), "./package.json"),
  },
  {
    code: { dependencies: { foo: "bar" } },
    filename: path.join(process.cwd(), "./package.json"),
  },
  {
    code: { devDependencies: {} },
    filename: path.join(process.cwd(), "../../package.json"),
  },
];
const invalid = [
  {
    code: { dependencies: {} },
    filename: path.join(process.cwd(), "../../package.json"),
  },
  {
    code: { devDependencies: {}, dependencies: { foo: "bar" } },
    filename: path.join(process.cwd(), "../../package.json"),
  },
];

await test({ name, rule, valid, invalid });
