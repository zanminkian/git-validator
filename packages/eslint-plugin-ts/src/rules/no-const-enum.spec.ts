import { test } from "../test.spec.js";
import { rule } from "./no-const-enum.js";

const valid = ["enum E {}"];

const invalid = ["const enum E {}"];

test({ valid, invalid, ...rule });
