import { rule } from "./no-const-enum.js";
import { test } from "./utils.spec.js";

const valid = ["enum E {}"];

const invalid = ["const enum E {}"];

test({ valid, invalid, ...rule });
