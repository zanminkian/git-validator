#!/usr/bin/env node
// @ts-check
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

async function getBinPath() {
  const requireResolve = createRequire(import.meta.url).resolve;
  const packageJsonPath = requireResolve("eslint/package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
  const eslintPath = packageJsonPath.slice(0, -"/package.json".length);
  const binPath =
    typeof packageJson.bin === "string"
      ? packageJson.bin
      : packageJson.bin.eslint;
  return resolve(eslintPath, binPath);
}

// eslint-disable-next-line @git-validator/no-dynamic-import
await import(pathToFileURL(await getBinPath()).href); // compatible with windows
