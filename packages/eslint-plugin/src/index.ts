import { banTsComment } from "./rules/ban-ts-comment.js";
import { newParens } from "./rules/new-parens.js";
import { noDirectoryImports } from "./rules/no-directory-imports.js";
import { noDynamicImport } from "./rules/no-dynamic-import.js";
import { noForIn } from "./rules/no-for-in.js";
import { noGitIgnoredImports } from "./rules/no-git-ignored-imports.js";
import { noInstanceofBuiltin } from "./rules/no-instanceof-builtin.js";
import { noPhantomDepImports } from "./rules/no-phantom-dep-imports.js";
import { noRelativeParentImports } from "./rules/no-relative-parent-imports.js";
import { noRenameExports } from "./rules/no-rename-exports.js";
import { noRenameImports } from "./rules/no-rename-imports.js";
import { noSideEffectImport } from "./rules/no-side-effect-import.js";
import { noTsFileImports } from "./rules/no-ts-file-imports.js";
import { noUnnecessaryTemplateString } from "./rules/no-unnecessary-template-string.js";
import { preferGlobalThis } from "./rules/prefer-global-this.js";
import { preferShortestRelativePath } from "./rules/prefer-shortest-relative-path.js";
import { requireReduceInitialValue } from "./rules/require-reduce-initial-value.js";

export const rules = {
  [banTsComment.name]: banTsComment.rule,
  [newParens.name]: newParens.rule,
  [noDirectoryImports.name]: noDirectoryImports.rule,
  [noDynamicImport.name]: noDynamicImport.rule,
  [noForIn.name]: noForIn.rule,
  [noGitIgnoredImports.name]: noGitIgnoredImports.rule,
  [noInstanceofBuiltin.name]: noInstanceofBuiltin.rule,
  [noPhantomDepImports.name]: noPhantomDepImports.rule,
  [noRelativeParentImports.name]: noRelativeParentImports.rule,
  [noRenameExports.name]: noRenameExports.rule,
  [noRenameImports.name]: noRenameImports.rule,
  [noSideEffectImport.name]: noSideEffectImport.rule,
  [noTsFileImports.name]: noTsFileImports.rule,
  [noUnnecessaryTemplateString.name]: noUnnecessaryTemplateString.rule,
  [preferGlobalThis.name]: preferGlobalThis.rule,
  [preferShortestRelativePath.name]: preferShortestRelativePath.rule,
  [requireReduceInitialValue.name]: requireReduceInitialValue.rule,
};
