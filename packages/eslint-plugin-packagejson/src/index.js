import { processor } from "./processor.js";
import bottomDefault from "./rules/bottom-default.js";
import noDependenciesInWorkspaceRoot from "./rules/no-dependencies-in-workspace-root.js";
import privateWorkspaceRoot from "./rules/private-workspace-root.js";
import requiredRepository from "./rules/required-repository.js";
import topTypes from "./rules/top-types.js";
import typeModule from "./rules/type-module.js";

export { processor };

export default {
  rules: {
    "bottom-default": bottomDefault,
    "type-module": typeModule,
    "no-dependencies-in-workspace-root": noDependenciesInWorkspaceRoot,
    "top-types": topTypes,
    "private-workspace-root": privateWorkspaceRoot,
    "required-repository": requiredRepository,
  },
  processors: { processor },
};
