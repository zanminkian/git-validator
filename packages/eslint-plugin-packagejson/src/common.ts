import fs from "node:fs";
import path from "node:path";

export function isWorkspaceRootPkg(pkgPath: string) {
  const dir = path.dirname(pkgPath);
  return (
    // eslint-disable-next-line n/no-sync
    !!JSON.parse(fs.readFileSync(pkgPath, "utf8")).workspaces ||
    // eslint-disable-next-line n/no-sync
    fs.existsSync(path.join(dir, "pnpm-workspace.yaml")) ||
    // eslint-disable-next-line n/no-sync
    fs.existsSync(path.join(dir, "pnpm-workspace.yml"))
  );
}
