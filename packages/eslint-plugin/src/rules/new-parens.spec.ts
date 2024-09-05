import { test } from "../test.spec.js";
import { newParens } from "./new-parens.js";

const valid = ["const a = new Student();", "const a = new Student('jim');"];

const invalid = ["const a = new Student;"];

test({ valid, invalid, ...newParens });
