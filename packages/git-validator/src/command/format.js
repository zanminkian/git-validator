// @ts-check
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { dir, exists, resolveConfig } from "../utils.js";

const requireResolve = createRequire(import.meta.url).resolve;

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, write?: boolean}} options
 */
export async function format(paths = [], options = {}) {
  const { update, write } = options;
  const shouldWrite = update || write;

  const cwd = process.cwd();
  const ps = (paths.length === 0 ? [cwd] : paths).map((p) =>
    path.resolve(cwd, p),
  );

  const prettierIgnore = path.join(cwd, ".prettierignore");
  const gitIgnore = path.join(cwd, ".gitignore");
  const ignores = [
    ...((await exists(prettierIgnore))
      ? [prettierIgnore]
      : [path.join(dir(import.meta.url), "..", "prettierignore")]),
    ...((await exists(gitIgnore)) ? [gitIgnore] : []),
  ].flatMap((p) => ["--ignore-path", p]);
  const configPath =
    (await resolveConfig("prettier"))?.filepath ??
    requireResolve("@git-validator/prettier-config");

  const child = spawn(
    "node",
    [
      path.join(dir(import.meta.url), "..", "bin", "prettier.js"),
      "--check",
      ...ignores,
      "--config",
      configPath,
      ...(shouldWrite ? ["--write"] : []),
      ...ps,
    ],
    { stdio: "inherit" },
  );
  return await new Promise((resolve, reject) => {
    child.on("error", (err) => reject(err));
    child.on("close", (code, signal) => resolve({ code, signal }));
  });
}
