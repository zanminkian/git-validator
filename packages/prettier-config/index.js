// @ts-check
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

const requireResolve = createRequire(import.meta.url).resolve;

const configFilePaths = ["js", "ts", "json"].map((i) =>
  path.resolve(process.cwd(), `tailwind.config.${i}`),
);
const index = (
  await Promise.all(
    configFilePaths.map(async (filepath) =>
      fs
        .access(filepath)
        .then(() => true)
        .catch(() => false),
    ),
  )
).findIndex(Boolean);
const tailwindConfig = configFilePaths[index];

export default {
  plugins: [
    requireResolve("prettier-plugin-curly"),
    requireResolve("prettier-plugin-packagejson"),
    ...(tailwindConfig ? [requireResolve("prettier-plugin-tailwindcss")] : []),
  ],
  ...(tailwindConfig ? { tailwindConfig } : {}),
  printWidth: 100, // 120 may be too long
};
