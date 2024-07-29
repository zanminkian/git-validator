import type { Linter } from "eslint";

export const processor: Linter.Processor = {
  preprocess: (text) => [`export default ${text.trim()}`],
  postprocess: (messages) => messages[0] ?? [],
};
