export default {
  files: ["js", "cjs", "mjs", "jsx", "ts", "cts", "mts", "tsx"].map(
    (i) => `**/*.${i}`,
  ),
  rules: {
    // react-hooks
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
  },
};
