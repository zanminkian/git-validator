import { noDirectoryImports } from "./rules/no-directory-imports.js";
import { noDynamicImport } from "./rules/no-dynamic-import.js";
import { noGitIgnoredImports } from "./rules/no-git-ignored-imports.js";
import { noPhantomDepImports } from "./rules/no-phantom-dep-imports.js";
import { noRelativeParentImports } from "./rules/no-relative-parent-imports.js";
import { noRenameExports } from "./rules/no-rename-exports.js";
import { noRenameImports } from "./rules/no-rename-imports.js";
import { noSideEffectImport } from "./rules/no-side-effect-import.js";
import { noTsFileImports } from "./rules/no-ts-file-imports.js";
import { preferShortestRelativePath } from "./rules/prefer-shortest-relative-path.js";

export const rules = {
  [noDirectoryImports.name]: noDirectoryImports.rule,
  [noDynamicImport.name]: noDynamicImport.rule,
  [noGitIgnoredImports.name]: noGitIgnoredImports.rule,
  [noPhantomDepImports.name]: noPhantomDepImports.rule,
  [noRelativeParentImports.name]: noRelativeParentImports.rule,
  [noRenameExports.name]: noRenameExports.rule,
  [noRenameImports.name]: noRenameImports.rule,
  [noSideEffectImport.name]: noSideEffectImport.rule,
  [noTsFileImports.name]: noTsFileImports.rule,
  [preferShortestRelativePath.name]: preferShortestRelativePath.rule,
};
