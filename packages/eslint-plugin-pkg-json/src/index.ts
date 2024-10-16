import { processor } from "./processor.js";
import * as bottomDefault from "./rules/bottom-default.js";
import * as exactDependencyVersion from "./rules/exact-dependency-version.js";
import * as noConflictTypes from "./rules/no-conflict-types.js";
import * as noDependenciesInWorkspaceRoot from "./rules/no-dependencies-in-workspace-root.js";
import * as noLifecycleScript from "./rules/no-lifecycle-script.js";
import * as noNonstandardProperty from "./rules/no-nonstandard-property.js";
import * as noTypesDependencyInWorkspaceRoot from "./rules/no-types-dependency-in-workspace-root.js";
import * as privateWorkspaceRoot from "./rules/private-workspace-root.js";
import * as requiredEngines from "./rules/required-engines.js";
import * as requiredHashbang from "./rules/required-hashbang.js";
import * as requiredRepository from "./rules/required-repository.js";
import * as topTypes from "./rules/top-types.js";
import * as typeModule from "./rules/type-module.js";

export const rules = Object.fromEntries(
  [
    bottomDefault,
    exactDependencyVersion,
    noConflictTypes,
    noDependenciesInWorkspaceRoot,
    noLifecycleScript,
    noNonstandardProperty,
    noTypesDependencyInWorkspaceRoot,
    privateWorkspaceRoot,
    requiredEngines,
    requiredHashbang,
    requiredRepository,
    topTypes,
    typeModule,
  ].map((i) => [i.name, i.rule]),
);
export const processors = { processor };
