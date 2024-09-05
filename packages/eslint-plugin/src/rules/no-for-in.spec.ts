import { test } from "../test.spec.js";
import { noForIn } from "./no-for-in.js";

const valid = [
  "for(const i of arr) {}",
  "for(let i = 0; i < arr.length; i++) {}",
];

const invalid = ["for(const i in arr) {}"];

test({ valid, invalid, ...noForIn });
