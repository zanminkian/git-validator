import * as banTsComment from "./rules/ban-ts-comment.js";
import * as exactMapSetType from "./rules/exact-map-set-type.js";
import * as importRegex from "./rules/import-regex.js";
import * as noConstEnum from "./rules/no-const-enum.js";
import * as noDeclaresInTsFile from "./rules/no-declares-in-ts-file.js";
import * as noDynamicImport from "./rules/no-dynamic-import.js";
import * as noExportAssignment from "./rules/no-export-assignment.js";
import * as noForIn from "./rules/no-for-in.js";
import * as noInstanceofBuiltin from "./rules/no-instanceof-builtin.js";
import * as noLegacyGetterSetter from "./rules/no-legacy-getter-setter.js";
import * as preferGlobalThis from "./rules/prefer-global-this.js";
import * as preferShortestRelativePath from "./rules/prefer-shortest-relative-path.js";

export default {
  rules: {
    [banTsComment.ruleName]: banTsComment.rule,
    [exactMapSetType.ruleName]: exactMapSetType.rule,
    [importRegex.ruleName]: importRegex.rule,
    [noConstEnum.ruleName]: noConstEnum.rule,
    [noDeclaresInTsFile.ruleName]: noDeclaresInTsFile.rule,
    [noDynamicImport.ruleName]: noDynamicImport.rule,
    [noExportAssignment.ruleName]: noExportAssignment.rule,
    [noForIn.ruleName]: noForIn.rule,
    [noInstanceofBuiltin.ruleName]: noInstanceofBuiltin.rule,
    [noLegacyGetterSetter.ruleName]: noLegacyGetterSetter.rule,
    [preferGlobalThis.ruleName]: preferGlobalThis.rule,
    [preferShortestRelativePath.ruleName]: preferShortestRelativePath.rule,
  },
};
