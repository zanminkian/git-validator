// @ts-check
import fs from "node:fs/promises";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { getTsconfig } from "get-tsconfig";
import { printUnifiedDiff } from "print-diff";
import sortKeys from "sort-keys";

/**
 * @param {{path: string, name: string, force: boolean}} options
 */
async function init(options) {
  const generatingTsconfigContent = `{
  "extends": "${process.env["TSCONFIG_EXTENDS"] ?? "@git-validator/tsconfig"}",
  "include": ["src"],
  "exclude": ["**/*.spec.ts", "**/*.test.ts"],
  "compilerOptions": {
    "outDir": "dist"
  }
}
`;

  const { path, name, force } = options;
  const fullName = resolve(process.cwd(), path, name);
  if (
    !(await fs
      .access(fullName)
      .then(() => true)
      .catch(() => false)) ||
    force
  ) {
    await fs.writeFile(fullName, generatingTsconfigContent);
  } else {
    throw new Error(
      `${fullName} is already existing! You can apply --force option to overwrite it.`,
    );
  }
}

/**
 * @param {{path: string, name: string, to: string}} options
 */
async function diff(options) {
  const { path = ".", name = "tsconfig.json", to = "tsconfig.json" } = options;

  const cwd = process.cwd();
  const dir = dirname(fileURLToPath(import.meta.url));

  const baseTsconfig = getTsconfig(resolve(dir, ".."), to);
  const tsconfig = getTsconfig(resolve(cwd, path), name);

  if (!baseTsconfig) {
    throw new Error(`Tsconfig ${resolve(dir, "..", to)} is not found!`);
  }
  if (!tsconfig) {
    throw new Error(`Tsconfig ${resolve(cwd, path, name)} is not found!`);
  }

  printUnifiedDiff(
    JSON.stringify(sortKeys(baseTsconfig.config, { deep: true }), null, 2),
    JSON.stringify(sortKeys(tsconfig.config, { deep: true }), null, 2),
    {
      write: (data) => {
        console.log(
          data
            .replace("+ expected", "+ current tsconfig")
            .replace("- actual", "- builtin tsconfig"),
        );
      },
    },
  );
}

const program = new Command();
program.name("tsconfig");
program
  .command("init")
  .description("init a tsconfig file")
  .option("-p, --path <path>", "directory path to generate file to", ".")
  .option("-n, --name <filename>", "tsconfig file name", "tsconfig.json")
  .option("-f, --force", "forcefully overwrite existing file")
  .action(init);

program
  .command("diff")
  .description("show differences between built-in tsconfig and current project tsconfig")
  .option("-p, --path <path>", "project directory path containing tsconfig", ".")
  .option("-n, --name <filename>", "project tsconfig file name", "tsconfig.json")
  .option(
    "-t, --to <filename>",
    "which builtin tsconfig file to compare with. possible values are 'tsconfig.json'|'esm.json'|'cjs.json'|'legacy.json'",
    "tsconfig.json",
  )
  .action(diff);

program.parse();
