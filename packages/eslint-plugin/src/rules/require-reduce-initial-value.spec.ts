import { rule } from "./require-reduce-initial-value.js";
import { test } from "./utils.spec.js";

const valid = [
  "[].reduce(()=>123, 0)",
  "foo.reduce(()=>123, 0)",
  "foo.reduce(bar, baz)",
  "[].reduceRight(()=>123, 0)",
  "foo.reduceRight(()=>123, 0)",
  "foo.reduceRight(bar, baz)",

  "reduce(()=>123)",
  "foo.reduceLeft(()=>123)",
];
const invalid = [
  "[].reduce(()=>123)",
  "foo.reduce(()=>123)",
  "foo.reduce(bar)",
  "[].reduceRight(()=>123)",
  "foo.reduceRight(()=>123)",
  "foo.reduceRight(bar)",
];

test({ valid, invalid, ...rule });
