import { processor } from "./processor.js";
import bottomDefault from "./rules/bottom-default.js";
import exactDependencyVersion from "./rules/exact-dependency-version.js";
import noConflictTypes from "./rules/no-conflict-types.js";
import noDependenciesInWorkspaceRoot from "./rules/no-dependencies-in-workspace-root.js";
import noLifecycleScript from "./rules/no-lifecycle-script.js";
import noTypesDependencyInWorkspaceRoot from "./rules/no-types-dependency-in-workspace-root.js";
import privateWorkspaceRoot from "./rules/private-workspace-root.js";
import requiredEngines from "./rules/required-engines.js";
import requiredRepository from "./rules/required-repository.js";
import topTypes from "./rules/top-types.js";
import typeModule from "./rules/type-module.js";

export { processor };

export default {
  rules: {
    "bottom-default": bottomDefault,
    "exact-dependency-version": exactDependencyVersion,
    "no-conflict-types": noConflictTypes,
    "type-module": typeModule,
    "no-dependencies-in-workspace-root": noDependenciesInWorkspaceRoot,
    "no-lifecycle-script": noLifecycleScript,
    "no-types-dependency-in-workspace-root": noTypesDependencyInWorkspaceRoot,
    "top-types": topTypes,
    "private-workspace-root": privateWorkspaceRoot,
    "required-engines": requiredEngines,
    "required-repository": requiredRepository,
  },
  processors: { processor },
};
