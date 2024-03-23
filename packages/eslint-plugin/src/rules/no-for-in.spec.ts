import { messageId, rule, ruleName } from "./no-for-in.js";
import { test } from "./utils.spec.js";

const valid = [
  "for(const i of arr) {}",
  "for(let i = 0; i < arr.length; i++) {}",
];

const invalid = ["for(const i in arr) {}"];

test({ valid, invalid, messageId, rule, ruleName });
