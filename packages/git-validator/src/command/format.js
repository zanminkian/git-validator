// @ts-check
import path from "node:path";
import process from "node:process";
import { prettierignore } from "prettier-ignore";
import { dir, execAsync, exists, getBinPath } from "../utils.js";

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, write?: boolean, dryRun?: boolean}} options
 */
export async function format(paths = [], options = {}) {
  const { update = false, write = false, dryRun = false } = options;

  const cwd = process.cwd();
  const prettierIgnore = path.join(cwd, ".prettierignore");
  const gitIgnore = path.join(cwd, ".gitignore");
  const ignores = [
    ...((await exists(prettierIgnore)) ? [prettierIgnore] : []),
    ...((await exists(gitIgnore)) ? [gitIgnore] : []),
    prettierignore,
  ].flatMap((p) => ["--ignore-path", p]);
  return execAsync(
    [
      // "node",
      await getBinPath("prettier"),
      "--log-level",
      "warn",
      ...ignores,
      "--config",
      path.join(dir(import.meta.url), "..", "config", "prettier.config.js"),
      "--ignore-unknown",
      ...(update || write ? ["--write"] : ["--check"]),
      ...(paths.length <= 0 ? ["."] : paths).map((p) => path.resolve(cwd, p)),
    ],
    { topic: "💃 Checking formatting", dryRun },
  );
}
