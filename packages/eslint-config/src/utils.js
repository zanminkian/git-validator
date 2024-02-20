// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export async function getProjectTsconfig() {
  const tsconfigs = ["tsconfig.eslint.json", "tsconfig.json"];
  const index = (
    await Promise.all(
      tsconfigs.map(
        async (config) =>
          await fs
            .access(path.join(process.cwd(), config))
            .then(() => true)
            .catch(() => false),
      ),
    )
  ).findIndex(Boolean);
  return tsconfigs[index];
}
