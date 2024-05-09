import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { gitignoreToMinimatch } from "@humanwhocodes/gitignore-to-minimatch";

async function globallyIgnore() {
  const ignores = (
    await fs
      .readFile(path.resolve(process.cwd(), ".gitignore"), "utf-8")
      .catch(() => "")
  )
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean)
    .filter((i) => !i.startsWith("#"))
    .map((i) => gitignoreToMinimatch(i));
  // Globally ignore. https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
  return { ignores };
}

export default await globallyIgnore();
