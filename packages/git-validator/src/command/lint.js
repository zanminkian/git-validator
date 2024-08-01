// @ts-check
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { execAsync, getBinPath, resolveConfig } from "../utils.js";

const requireResolve = createRequire(import.meta.url).resolve;

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, fix?: boolean, dryRun?: boolean}} options
 */
export async function lint(paths = [], options = {}) {
  const { update = false, fix = false, dryRun = false } = options;
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

  return execAsync(
    [
      "node",
      await getBinPath("eslint"),
      "--config",
      configPath,
      ...(shouldFix ? ["--fix"] : []),
      ...ps,
    ].join(" "),
    { topic: "📏 Checking linting", dryRun },
  );
}
