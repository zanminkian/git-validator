// @ts-check
// @ts-expect-error
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default {
  files: ["js", "cjs", "mjs", "jsx", "ts", "cts", "mts", "tsx"].map(
    (i) => `**/*.${i}`,
  ),
  plugins: {
    "react-hooks": reactHooksPlugin,
  },
  rules: {
    // react-hooks
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
  },
};
