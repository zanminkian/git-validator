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
  ...(index >= 0
    ? { plugins: ["prettier-plugin-tailwindcss"], tailwindConfig: configFilePaths[index] }
    : {}),
  printWidth: 100, // 120 may be too long
};
