import { test } from "../test.spec.js";
import { noExportAssignment } from "./no-export-assignment.js";

const valid = ["export default {}", "exports = {}", "module.exports = {}"];

const invalid = ["export = {}"];

test({ valid, invalid, ...noExportAssignment });
