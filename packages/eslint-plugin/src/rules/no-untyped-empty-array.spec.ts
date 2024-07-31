import { rule } from "./no-untyped-empty-array.js";
import { test } from "./utils.spec.js";

const valid = [
  "const arr: number[] = []",
  "const arr: any[] = []",
  "const arr = [] as unknown[]",
  "const arr = ['foo']",
  "const arr = [[]]",
  "const arr = [{}]",
  "class A {names = []}",
];

const invalid = [
  "const arr = []",
  "let arr = []",
  "var arr = []",
  "let arr1=[],arr2",
  "var arr1,arr2=[]",
];

test({ valid, invalid, ...rule });
