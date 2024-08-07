import { rule as exactMapSetType } from "./rules/exact-map-set-type.js";
import { rule as noConstEnum } from "./rules/no-const-enum.js";
import { rule as noDeclaresInTsFile } from "./rules/no-declares-in-ts-file.js";
import { rule as noExportAssignment } from "./rules/no-export-assignment.js";
import { rule as noPropertyDecorator } from "./rules/no-property-decorator.js";
import { rule as noUntypedEmptyArray } from "./rules/no-untyped-empty-array.js";

export const rules = {
  [exactMapSetType.name]: exactMapSetType.rule,
  [noConstEnum.name]: noConstEnum.rule,
  [noDeclaresInTsFile.name]: noDeclaresInTsFile.rule,
  [noExportAssignment.name]: noExportAssignment.rule,
  [noPropertyDecorator.name]: noPropertyDecorator.rule,
  [noUntypedEmptyArray.name]: noUntypedEmptyArray.rule,
};
