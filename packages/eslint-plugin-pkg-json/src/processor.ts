import type { Linter } from "eslint";

export const processor: Linter.Processor = {
  preprocess: (text) => [`export default ${text}`],
  postprocess: (messages) => messages[0] ?? [],
};
