// @ts-check
import childProcess from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import ora from "ora";
import { dir, getSpentTime, resolveConfig } from "../utils.js";

const requireResolve = createRequire(import.meta.url).resolve;

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, fix?: boolean}} options
 */
export async function lint(paths = [], options = {}) {
  const startTime = Date.now();
  const spinner = ora("Checking linting...").start();
  const { update, fix } = options;
  const shouldFix = update || fix;

  const cwd = process.cwd();
  const ps = (paths.length === 0 ? [cwd] : paths).map((p) =>
    path.resolve(cwd, p),
  );

  let configPath = (await resolveConfig("eslint"))?.filepath;
  if (!configPath) {
    process.env["ESLINT_USE_FLAT_CONFIG"] = "true"; // TODO remove it
    configPath = requireResolve("@git-validator/eslint-config");
  }

  return new Promise((resolve) => {
    childProcess.exec(
      [
        "node",
        path.join(dir(import.meta.url), "..", "bin", "eslint.js"),
        "--config",
        configPath,
        ...(shouldFix ? ["--fix"] : []),
        ...ps,
      ].join(" "),
      { env: { FORCE_COLOR: "true", ...process.env }, encoding: "buffer" },
      (error, stdout, stderr) => {
        if (error) {
          spinner.fail(`Checking linting failed in ${getSpentTime(startTime)}`);
        } else {
          spinner.succeed(
            `Checking linting succeeded in ${getSpentTime(startTime)}`,
          );
        }
        process.stdout.write(stdout);
        process.stderr.write(stderr);
        return resolve(error?.code ?? 0);
      },
    );
  });
}
