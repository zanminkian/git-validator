import { test } from "../test.js";
import { name, rule } from "./exact-dependency-version.js";

const valid = [
  { peerDependencies: { foo: "^1.0.0", bar: "1.0.0-beta.1" } },
  { foo: { foo: "^1.0.0", bar: "1.0.0-beta.1" } },
  { dependencies: { foo: "1.0.0", bar: "2.0.0-beta", baz: "3.0.0-beta.0" } },
  { devDependencies: { foo: "workspace:*" }, dependencies: { bar: "1.0.0" } },
];

const invalid = [
  { dependencies: { foo: "^1.0.0" } },
  { devDependencies: { foo: "~1.0.0" } },
  { dependencies: { foo: "01.0.0" } },
  { dependencies: { foo: "1.0.00" } },
  { dependencies: { foo: "1.0" } },
  { dependencies: { foo: "2.0-tmp" } },
  { dependencies: { foo: "workspace:^" } },
  { devDependencies: { foo: "workspace:*" }, dependencies: { bar: "^1.0.0" } },
];

await test({ name, rule, valid, invalid });
