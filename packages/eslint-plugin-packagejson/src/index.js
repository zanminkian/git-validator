import { processor } from "./processor.js";
import noDependenciesInWorkspaceRoot from "./rules/no-dependencies-in-workspace-root.js";
import typeModule from "./rules/type-module.js";

export { processor };

export default {
  rules: {
    "type-module": typeModule,
    "no-dependencies-in-workspace-root": noDependenciesInWorkspaceRoot,
  },
};
