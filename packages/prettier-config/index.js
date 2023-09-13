// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const configFilePaths = ["js", "ts", "json"].map((i) =>
  path.resolve(process.cwd(), `tailwind.config.${i}`),
);
const promiseFlags = configFilePaths.map(async (filepath) =>
  fs
    .access(filepath)
    .then(() => true)
    .catch(() => false),
);
const flags = await Promise.all(promiseFlags);
const index = flags.findIndex(Boolean);

export default {
  plugins: ["prettier-plugin-curly", ...(index >= 0 ? ["prettier-plugin-tailwindcss"] : [])],
  ...(index >= 0 ? { tailwindConfig: configFilePaths[index] } : {}),
  printWidth: 100, // 120 may be too long
};
