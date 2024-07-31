import { rule } from "./no-es6-getter-setter.js";
import { test } from "./utils.spec.js";

const valid = [
  "const foo = {bar: ()=>{}}",
  "const foo = {bar(){}}",
  "class A{bar: ()=>{}}",
  "class A{bar(){}}",
];

const invalid = [
  "const foo = {get bar(){}}",
  "const foo = {set bar(){}}",
  "class A{get bar(){}}",
  "class A{set bar(){}}",
];

test({ valid, invalid, ...rule });
