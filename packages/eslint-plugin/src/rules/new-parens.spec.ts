import { messageId, rule, ruleName } from "./new-parens.js";
import { test } from "./utils.spec.js";

const valid = ["const a = new Student();", "const a = new Student('jim');"];

const invalid = ["const a = new Student;"];

test({ valid, invalid, messageId, rule, ruleName });
