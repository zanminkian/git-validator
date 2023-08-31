const path = require("node:path");
const process = require("node:process");
const fs = require("node:fs");

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

module.exports = {
  ...(tailwindConfig ? { plugins: ["prettier-plugin-tailwindcss"], tailwindConfig } : {}),
  printWidth: 100, // 120 may be too long
};
