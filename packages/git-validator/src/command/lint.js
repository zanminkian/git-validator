// @ts-check
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { dir, resolveConfig } from "../utils.js";

const requireResolve = createRequire(import.meta.url).resolve;

/**
 * @param {Array<string>} paths
 * @param {{update?: boolean, fix?: boolean}} options
 */
export async function lint(paths = [], options = {}) {
  const { update, fix } = options;
  const shouldFix = update || fix;

  const cwd = process.cwd();
  const ps = (paths.length === 0 ? [cwd] : paths).map((p) =>
    path.resolve(cwd, p),
  );

  let configPath = (await resolveConfig("eslint"))?.filepath;
  if (!configPath) {
    process.env["ESLINT_USE_FLAT_CONFIG"] = "true";
    configPath = requireResolve("@git-validator/eslint-config");
  }

  console.log("Checking linting...");
  const child = spawn(
    "node",
    [
      path.join(dir(import.meta.url), "..", "bin", "eslint.js"),
      "--config",
      configPath,
      ...(shouldFix ? ["--fix"] : []),
      ...ps,
    ],
    {
      stdio: "inherit",
    },
  );
  return await new Promise((resolve, reject) => {
    child.on("error", (err) => reject(err));
    child.on("close", (code, signal) => resolve({ code, signal }));
  });
}
