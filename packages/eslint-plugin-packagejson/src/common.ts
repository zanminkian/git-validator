import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export async function isWorkspace() {
  const CWD = process.cwd();
  const ROOT_PKG_JSON_PATH = path.join(CWD, "package.json");
  const PNPM_WSP_YAML = path.join(CWD, "pnpm-workspace.yaml");
  const PNPM_WSP_YML = path.join(CWD, "pnpm-workspace.yml");

  return (
    ((await exists(ROOT_PKG_JSON_PATH)) &&
      JSON.parse(await fs.readFile(ROOT_PKG_JSON_PATH, "utf8")).workspaces) ||
    (await exists(PNPM_WSP_YAML)) ||
    (await exists(PNPM_WSP_YML))
  );
}

export function getRootPackageJsonPath() {
  return path.join(process.cwd(), "package.json");
}

async function exists(filepath: string) {
  return await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);
}
