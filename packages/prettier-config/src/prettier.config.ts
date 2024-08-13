import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

const resolve = createRequire(import.meta.url).resolve;

const tailwindConfig = await getTailwindConfig();

export default {
  plugins: [
    "prettier-plugin-packagejson",
    "prettier-plugin-curly",
    "@ianvs/prettier-plugin-sort-imports",
    ...(tailwindConfig ? ["prettier-plugin-tailwindcss"] : []),
  ].map((moduleName) => resolve(moduleName)),
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  ...(tailwindConfig ? { tailwindConfig } : {}),
};

async function getTailwindConfig() {
  return (
    await Promise.all(
      ["js", "ts", "json"]
        .map((i) => path.resolve(process.cwd(), `tailwind.config.${i}`))
        .map(async (filepath) =>
          (await exists(filepath)) ? filepath : undefined,
        ),
    )
  ).find(Boolean);
}

async function exists(filepath: string) {
  return await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);
}
