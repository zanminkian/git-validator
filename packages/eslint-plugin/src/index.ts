import * as importRegex from "./rules/import-regex";
import * as noConstEnum from "./rules/no-const-enum";
import * as noDeclaresInTsFile from "./rules/no-declares-in-ts-file";
import * as noDynamicImport from "./rules/no-dynamic-import";
import * as noExportAssignment from "./rules/no-export-assignment";
import * as noLegacyGetterSetter from "./rules/no-legacy-getter-setter";
import * as preferGlobalThis from "./rules/prefer-global-this";

/**
 * @internal
 */
export const rules = {
  [importRegex.ruleName]: importRegex.rule,
  [noConstEnum.ruleName]: noConstEnum.rule,
  [noDeclaresInTsFile.ruleName]: noDeclaresInTsFile.rule,
  [noDynamicImport.ruleName]: noDynamicImport.rule,
  [noExportAssignment.ruleName]: noExportAssignment.rule,
  [noLegacyGetterSetter.ruleName]: noLegacyGetterSetter.rule,
  [preferGlobalThis.ruleName]: preferGlobalThis.rule,
};
