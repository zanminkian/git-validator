import banTsComment from "./rules/ban-ts-comment.js";
import exactMapSetType from "./rules/exact-map-set-type.js";
import newParens from "./rules/new-parens.js";
import noConstEnum from "./rules/no-const-enum.js";
import noDeclaresInTsFile from "./rules/no-declares-in-ts-file.js";
import noDynamicImport from "./rules/no-dynamic-import.js";
import noEs6GetterSetter from "./rules/no-es6-getter-setter.js";
import noExportAssignment from "./rules/no-export-assignment.js";
import noForIn from "./rules/no-for-in.js";
import noGitIgnoredImports from "./rules/no-git-ignored-imports.js";
import noInstanceofBuiltin from "./rules/no-instanceof-builtin.js";
import noLegacyGetterSetter from "./rules/no-legacy-getter-setter.js";
import noPropertyDecorator from "./rules/no-property-decorator.js";
import noRelativeParentImports from "./rules/no-relative-parent-imports.js";
import noTsFileImports from "./rules/no-ts-file-imports.js";
import noUnnecessaryTemplateString from "./rules/no-unnecessary-template-string.js";
import noUntypedEmptyArray from "./rules/no-untyped-empty-array.js";
import preferGlobalThis from "./rules/prefer-global-this.js";
import preferShortestRelativePath from "./rules/prefer-shortest-relative-path.js";
import requireReduceInitialValue from "./rules/require-reduce-initial-value.js";

export default {
  rules: {
    [banTsComment.name]: banTsComment.rule,
    [exactMapSetType.name]: exactMapSetType.rule,
    [newParens.name]: newParens.rule,
    [noConstEnum.name]: noConstEnum.rule,
    [noDeclaresInTsFile.name]: noDeclaresInTsFile.rule,
    [noDynamicImport.name]: noDynamicImport.rule,
    [noEs6GetterSetter.name]: noEs6GetterSetter.rule,
    [noExportAssignment.name]: noExportAssignment.rule,
    [noForIn.name]: noForIn.rule,
    [noGitIgnoredImports.name]: noGitIgnoredImports.rule,
    [noInstanceofBuiltin.name]: noInstanceofBuiltin.rule,
    [noLegacyGetterSetter.name]: noLegacyGetterSetter.rule,
    [noPropertyDecorator.name]: noPropertyDecorator.rule,
    [noRelativeParentImports.name]: noRelativeParentImports.rule,
    [noTsFileImports.name]: noTsFileImports.rule,
    [noUnnecessaryTemplateString.name]: noUnnecessaryTemplateString.rule,
    [noUntypedEmptyArray.name]: noUntypedEmptyArray.rule,
    [preferGlobalThis.name]: preferGlobalThis.rule,
    [preferShortestRelativePath.name]: preferShortestRelativePath.rule,
    [requireReduceInitialValue.name]: requireReduceInitialValue.rule,
  },
};
