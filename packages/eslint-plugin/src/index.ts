import { rule as banTsComment } from "./rules/ban-ts-comment.js";
import { rule as newParens } from "./rules/new-parens.js";
import { rule as noDirectoryImports } from "./rules/no-directory-imports.js";
import { rule as noDynamicImport } from "./rules/no-dynamic-import.js";
import { rule as noForIn } from "./rules/no-for-in.js";
import { rule as noGitIgnoredImports } from "./rules/no-git-ignored-imports.js";
import { rule as noInstanceofBuiltin } from "./rules/no-instanceof-builtin.js";
import { rule as noPhantomDepImports } from "./rules/no-phantom-dep-imports.js";
import { rule as noRelativeParentImports } from "./rules/no-relative-parent-imports.js";
import { rule as noSideEffectImport } from "./rules/no-side-effect-import.js";
import { rule as noTsFileImports } from "./rules/no-ts-file-imports.js";
import { rule as noUnnecessaryTemplateString } from "./rules/no-unnecessary-template-string.js";
import { rule as preferGlobalThis } from "./rules/prefer-global-this.js";
import { rule as preferShortestRelativePath } from "./rules/prefer-shortest-relative-path.js";
import { rule as requireReduceInitialValue } from "./rules/require-reduce-initial-value.js";

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
  [noSideEffectImport.name]: noSideEffectImport.rule,
  [noTsFileImports.name]: noTsFileImports.rule,
  [noUnnecessaryTemplateString.name]: noUnnecessaryTemplateString.rule,
  [preferGlobalThis.name]: preferGlobalThis.rule,
  [preferShortestRelativePath.name]: preferShortestRelativePath.rule,
  [requireReduceInitialValue.name]: requireReduceInitialValue.rule,
};
