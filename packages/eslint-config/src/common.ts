import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

async function getProjectTsconfig() {
  const tsconfigs = [
    "tsconfig.eslint.json",
    "tsconfig.json",
    "tsconfig.build.json",
  ];
  const index = (
    await Promise.all(
      tsconfigs.map((config) =>
        fs
          .access(path.join(process.cwd(), config))
          .then(() => true)
          .catch(() => false),
      ),
    )
  ).findIndex(Boolean);
  return tsconfigs[index];
}

const tsconfig = await getProjectTsconfig();

export { tsconfig };
