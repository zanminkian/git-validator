// @ts-check
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { prettierignore } from "prettier-ignore";
import { execAsync, exists, getBinPath, resolveConfig } from "../utils.js";

const requireResolve = createRequire(import.meta.url).resolve;

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, write?: boolean, dryRun?: boolean}} options
 */
export async function format(paths = [], options = {}) {
  const { update = false, write = false, dryRun = false } = options;
  const shouldWrite = update || write;

  const cwd = process.cwd();
  const ps = (paths.length === 0 ? [cwd] : paths).map((p) =>
    path.resolve(cwd, p),
  );

  const prettierIgnore = path.join(cwd, ".prettierignore");
  const gitIgnore = path.join(cwd, ".gitignore");
  const ignores = [
    ...((await exists(prettierIgnore)) ? [prettierIgnore] : []),
    ...((await exists(gitIgnore)) ? [gitIgnore] : []),
    prettierignore,
  ].flatMap((p) => ["--ignore-path", p]);
  const configPath =
    (await resolveConfig("prettier"))?.filepath ??
    requireResolve("@git-validator/prettier-config");

  return execAsync(
    [
      // "node",
      await getBinPath("prettier"),
      "--log-level",
      "warn",
      ...ignores,
      "--config",
      configPath,
      "--ignore-unknown",
      ...(shouldWrite ? ["--write"] : ["--check"]),
      ...ps,
    ],
    { topic: "💃 Checking formatting", dryRun },
  );
}
