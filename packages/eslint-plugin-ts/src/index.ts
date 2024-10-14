import { exactMapSetType } from "./rules/exact-map-set-type.js";
import { noConstEnum } from "./rules/no-const-enum.js";
import { noDeclaresInTsFile } from "./rules/no-declares-in-ts-file.js";
import { noExportAssignment } from "./rules/no-export-assignment.js";
import { noPropertyDecorator } from "./rules/no-property-decorator.js";
import { noUntypedEmptyArray } from "./rules/no-untyped-empty-array.js";

export const rules = {
  [exactMapSetType.name]: exactMapSetType.rule,
  [noConstEnum.name]: noConstEnum.rule,
  [noDeclaresInTsFile.name]: noDeclaresInTsFile.rule,
  [noExportAssignment.name]: noExportAssignment.rule,
  [noPropertyDecorator.name]: noPropertyDecorator.rule,
  [noUntypedEmptyArray.name]: noUntypedEmptyArray.rule,
};
