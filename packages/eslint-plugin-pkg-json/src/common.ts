import fs from "node:fs";
import path from "node:path";

export function isWorkspaceRootPkg(pkgPath: string) {
  const dir = path.dirname(pkgPath);
  return (
    !!JSON.parse(fs.readFileSync(pkgPath, "utf8")).workspaces ||
    fs.existsSync(path.join(dir, "pnpm-workspace.yaml")) ||
    fs.existsSync(path.join(dir, "pnpm-workspace.yml"))
  );
}
