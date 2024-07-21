// @ts-check
import childProcess from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import ora from "ora";
import { prettierignore } from "prettier-ignore";
import { dir, exists, getSpentTime, resolveConfig } from "../utils.js";

const requireResolve = createRequire(import.meta.url).resolve;

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, write?: boolean}} options
 */
export async function format(paths = [], options = {}) {
  const startTime = Date.now();
  const spinner = ora("Checking formatting...").start();
  const { update, write } = options;
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

  return new Promise((resolve) => {
    childProcess.exec(
      [
        "node",
        path.join(dir(import.meta.url), "..", "bin", "prettier.js"),
        "--log-level",
        "warn",
        ...ignores,
        "--config",
        configPath,
        "--ignore-unknown",
        ...(shouldWrite ? ["--write"] : ["--check"]),
        ...ps,
      ].join(" "),
      { env: { FORCE_COLOR: "true", ...process.env }, encoding: "buffer" },
      (error, stdout, stderr) => {
        if (error) {
          spinner.fail(
            `Checking formatting failed in ${getSpentTime(startTime)}`,
          );
        } else {
          spinner.succeed(
            `Checking formatting succeeded in ${getSpentTime(startTime)}`,
          );
        }
        process.stdout.write(stdout);
        process.stderr.write(stderr);
        return resolve(error?.code ?? 0);
      },
    );
  });
}
