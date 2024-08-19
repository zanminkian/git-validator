import process from "node:process";
import { publint } from "publint";

const pkgDir = process.argv[2];
if (!pkgDir) {
  throw new Error("pkgDir is required");
}

process.stdout.write(JSON.stringify(await publint({ pkgDir })));
