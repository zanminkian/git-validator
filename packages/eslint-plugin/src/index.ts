import banTsComment from "./rules/ban-ts-comment.js";
import exactMapSetType from "./rules/exact-map-set-type.js";
import importRegex from "./rules/import-regex.js";
import newParens from "./rules/new-parens.js";
import noConstEnum from "./rules/no-const-enum.js";
import noDeclaresInTsFile from "./rules/no-declares-in-ts-file.js";
import noDynamicImport from "./rules/no-dynamic-import.js";
import noExportAssignment from "./rules/no-export-assignment.js";
import noForIn from "./rules/no-for-in.js";
import noInstanceofBuiltin from "./rules/no-instanceof-builtin.js";
import noLegacyGetterSetter from "./rules/no-legacy-getter-setter.js";
import noPropertyDecorator from "./rules/no-property-decorator.js";
import preferGlobalThis from "./rules/prefer-global-this.js";
import preferShortestRelativePath from "./rules/prefer-shortest-relative-path.js";

export default {
  rules: {
    [banTsComment.name]: banTsComment.rule,
    [exactMapSetType.name]: exactMapSetType.rule,
    [importRegex.name]: importRegex.rule,
    [newParens.name]: newParens.rule,
    [noConstEnum.name]: noConstEnum.rule,
    [noDeclaresInTsFile.name]: noDeclaresInTsFile.rule,
    [noDynamicImport.name]: noDynamicImport.rule,
    [noExportAssignment.name]: noExportAssignment.rule,
    [noForIn.name]: noForIn.rule,
    [noInstanceofBuiltin.name]: noInstanceofBuiltin.rule,
    [noLegacyGetterSetter.name]: noLegacyGetterSetter.rule,
    [noPropertyDecorator.name]: noPropertyDecorator.rule,
    [preferGlobalThis.name]: preferGlobalThis.rule,
    [preferShortestRelativePath.name]: preferShortestRelativePath.rule,
  },
};
