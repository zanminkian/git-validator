import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

const tailwindConfig = await getTailwindConfig();

export default {
  plugins: await Promise.all(
    [
      "prettier-plugin-curly",
      "prettier-plugin-packagejson",
      "@ianvs/prettier-plugin-sort-imports",
      ...(tailwindConfig ? ["prettier-plugin-tailwindcss"] : []),
    ].map(async (moduleName) => await getModulePath(moduleName)),
  ),
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  ...(tailwindConfig ? { tailwindConfig } : {}),
};

async function getTailwindConfig() {
  const configFilePaths = ["js", "ts", "json"].map((i) =>
    path.resolve(process.cwd(), `tailwind.config.${i}`),
  );
  const index = (
    await Promise.all(
      configFilePaths.map(async (filepath) => await exists(filepath)),
    )
  ).findIndex(Boolean);
  return configFilePaths[index];
}

async function getModulePath(moduleName: string) {
  const nodeModulePath = path.resolve(
    process.cwd(),
    "node_modules",
    moduleName,
  );
  if (await exists(nodeModulePath)) {
    return moduleName;
  } else {
    return createRequire(import.meta.url).resolve(moduleName);
  }
}

async function exists(filepath: string) {
  return await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);
}
