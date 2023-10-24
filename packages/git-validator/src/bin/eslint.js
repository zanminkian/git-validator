#!/usr/bin/env node
import { createRequire } from "node:module";
import { resolve } from "node:path";
import packageJson from "eslint/package.json" assert { type: "json" };

function getBinPath() {
  const requireResolve = createRequire(import.meta.url).resolve;
  const eslintPath = requireResolve("eslint/package.json").slice(0, -"/package.json".length);
  const bin = typeof packageJson.bin === "string" ? packageJson.bin : packageJson.bin.eslint;
  return resolve(eslintPath, bin);
}

// eslint-disable-next-line @git-validator/no-dynamic-import
await import(getBinPath());
