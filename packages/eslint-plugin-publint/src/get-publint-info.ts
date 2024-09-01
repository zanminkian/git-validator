import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Message, Result } from "publint";
import type { Pkg } from "publint/utils";

/**
 * Sync function of `(await import('publint')).publint()`.
 * If publint provides sync function, this function should be deleted.
 */
function publint(pkgDir: string): Result {
  // publint doesn't provide sync function
  const publintPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "publint.cli.js",
  );
  return JSON.parse(
    // eslint-disable-next-line n/no-sync
    childProcess.execSync(`node ${publintPath} ${pkgDir}`, {
      encoding: "utf8",
    }),
  );
}

export interface PublintInfo {
  pkg: Pkg;
  messages: Message[];
}

const cache = new Map<string, PublintInfo>();
export function getPublintInfo(pkgPath: string): PublintInfo {
  const info = cache.get(pkgPath);
  if (info) {
    return info;
  }

  const result = {
    // eslint-disable-next-line n/no-sync
    pkg: JSON.parse(fs.readFileSync(pkgPath, "utf8")),
    messages: publint(path.dirname(pkgPath)).messages,
  };
  cache.set(pkgPath, result);
  return result;
}
