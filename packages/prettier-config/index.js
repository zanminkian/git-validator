// @ts-check
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

const tailwindConfig = await getTailwindConfig();

export default {
  plugins: [
    await getModulePath("prettier-plugin-curly"),
    await getModulePath("prettier-plugin-packagejson"),
    ...(tailwindConfig ? [await getModulePath("prettier-plugin-tailwindcss")] : []),
  ],
  ...(tailwindConfig ? { tailwindConfig } : {}),
  printWidth: 100, // 120 may be too long
};

async function getTailwindConfig() {
  const configFilePaths = ["js", "ts", "json"].map((i) =>
    path.resolve(process.cwd(), `tailwind.config.${i}`),
  );
  const index = (
    await Promise.all(configFilePaths.map(async (filepath) => await exists(filepath)))
  ).findIndex(Boolean);
  const tailwindConfig = configFilePaths[index];
  return tailwindConfig;
}

/**
 * @param {string} moduleName
 */
async function getModulePath(moduleName) {
  const nodeModulePath = path.resolve(process.cwd(), "node_modules", moduleName);
  if (await exists(nodeModulePath)) {
    return moduleName;
  } else {
    const requireResolve = createRequire(import.meta.url).resolve;
    return requireResolve(moduleName);
  }
}

/**
 * @param {string} filepath
 */
async function exists(filepath) {
  return await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);
}
