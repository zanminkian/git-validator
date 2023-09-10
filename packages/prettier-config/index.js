import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const cwd = process.cwd();
const tsPath = path.resolve(cwd, "tailwind.config.ts");
const jsPath = path.resolve(cwd, "tailwind.config.js");
const jsonPath = path.resolve(cwd, "tailwind.config.json");

const tailwindConfig = fs.existsSync(tsPath)
  ? tsPath
  : fs.existsSync(jsPath)
  ? jsPath
  : fs.existsSync(jsonPath)
  ? jsonPath
  : undefined;

export default {
  ...(tailwindConfig ? { plugins: ["prettier-plugin-tailwindcss"], tailwindConfig } : {}),
  printWidth: 100, // 120 may be too long
};
