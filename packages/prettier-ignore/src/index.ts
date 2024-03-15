import path from "node:path";
import { fileURLToPath } from "node:url";

export const prettierignore = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "prettierignore",
);
