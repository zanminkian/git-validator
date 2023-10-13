import fs from "node:fs/promises";
import path from "node:path";

const CWD = process.cwd();
const ROOT_PKG_JSON_PATH = path.join(CWD, "package.json");
const PNPM_WSP_YAML = path.join(CWD, "pnpm-workspace.yaml");
const PNPM_WSP_YML = path.join(CWD, "pnpm-workspace.yml");

const isWorkspace =
  ((await exists(ROOT_PKG_JSON_PATH)) &&
    JSON.parse(await fs.readFile(ROOT_PKG_JSON_PATH, "utf8")).workspaces) ||
  (await exists(PNPM_WSP_YAML)) ||
  (await exists(PNPM_WSP_YML));

const messageId = "noDependenciesInWorkspaceRoot";
const message = "Should not install packages into dependencies in workspace root";

export default {
  meta: {
    messages: {
      [messageId]: message,
    },
  },
  create: (context) => {
    const filename = context.getFilename();
    return {
      "Program > ExportDefaultDeclaration > ObjectExpression": (node) => {
        if (isWorkspace && filename === ROOT_PKG_JSON_PATH) {
          const depsNode = node.properties.find((p) => p.key.value === "dependencies");
          if (depsNode) {
            return context.report({
              node: depsNode,
              messageId,
            });
          }
        }
      },
    };
  },
};

/**
 * @param {string} filepath
 */
export async function exists(filepath) {
  return await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);
}
