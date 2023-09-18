// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

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
  plugins: ["prettier-plugin-curly", ...(tailwindConfig ? ["prettier-plugin-tailwindcss"] : [])],
  ...(tailwindConfig ? { tailwindConfig } : {}),
  printWidth: 100, // 120 may be too long
};
