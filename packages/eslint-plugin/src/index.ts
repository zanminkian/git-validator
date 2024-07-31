import { rule as banTsComment } from "./rules/ban-ts-comment.js";
import { rule as exactMapSetType } from "./rules/exact-map-set-type.js";
import { rule as newParens } from "./rules/new-parens.js";
import { rule as noConstEnum } from "./rules/no-const-enum.js";
import { rule as noDeclaresInTsFile } from "./rules/no-declares-in-ts-file.js";
import { rule as noDynamicImport } from "./rules/no-dynamic-import.js";
import { rule as noEs6GetterSetter } from "./rules/no-es6-getter-setter.js";
import { rule as noExportAssignment } from "./rules/no-export-assignment.js";
import { rule as noForIn } from "./rules/no-for-in.js";
import { rule as noGitIgnoredImports } from "./rules/no-git-ignored-imports.js";
import { rule as noInstanceofBuiltin } from "./rules/no-instanceof-builtin.js";
import { rule as noLegacyGetterSetter } from "./rules/no-legacy-getter-setter.js";
import { rule as noPropertyDecorator } from "./rules/no-property-decorator.js";
import { rule as noRelativeParentImports } from "./rules/no-relative-parent-imports.js";
import { rule as noTsFileImports } from "./rules/no-ts-file-imports.js";
import { rule as noUnnecessaryTemplateString } from "./rules/no-unnecessary-template-string.js";
import { rule as noUntypedEmptyArray } from "./rules/no-untyped-empty-array.js";
import { rule as preferGlobalThis } from "./rules/prefer-global-this.js";
import { rule as preferShortestRelativePath } from "./rules/prefer-shortest-relative-path.js";
import { rule as requireReduceInitialValue } from "./rules/require-reduce-initial-value.js";

export const rules = {
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
};
