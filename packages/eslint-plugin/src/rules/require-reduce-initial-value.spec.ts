import { test } from "../test.spec.js";
import { requireReduceInitialValue } from "./require-reduce-initial-value.js";

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

test({ valid, invalid, ...requireReduceInitialValue });
