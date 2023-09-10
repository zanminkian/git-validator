// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const cwd = process.cwd();
const tsPath = path.resolve(cwd, "tailwind.config.ts");
const jsPath = path.resolve(cwd, "tailwind.config.js");
const jsonPath = path.resolve(cwd, "tailwind.config.json");

const tailwindConfig = (await fs
  .access(tsPath)
  .then(() => true)
  .catch(() => false))
  ? tsPath
  : (await fs
      .access(jsPath)
      .then(() => true)
      .catch(() => false))
  ? jsPath
  : (await fs
      .access(jsonPath)
      .then(() => true)
      .catch(() => false))
  ? jsonPath
  : undefined;

export default {
  ...(tailwindConfig ? { plugins: ["prettier-plugin-tailwindcss"], tailwindConfig } : {}),
  printWidth: 100, // 120 may be too long
};
