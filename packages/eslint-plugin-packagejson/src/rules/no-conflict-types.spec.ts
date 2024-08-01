import { test } from "../test.js";
import { name, rule } from "./no-conflict-types.js";

const valid = [
  {},
  {
    dependencies: { "@types/web": "1.0.0" },
    peerDependencies: { "@types/node": "2.0.0" },
  },
];
const invalid = [
  {
    dependencies: { "@types/web": "1.0.0", "@types/node": "2.0.0" },
    devDependencies: {},
  },
  {
    dependencies: {},
    devDependencies: { "@types/web": "1.0.0", "@types/node": "2.0.0" },
  },
  {
    dependencies: { "@types/web": "1.0.0" },
    devDependencies: { "@types/node": "2.0.0" },
  },
];

await test({ name, rule, valid, invalid, errors: 2 });
