const process = require("node:process");
const jsConfig = require("./js-config");
const tsConfig = require("./ts-config");

function listUnsupportedExtensions(supportedExtensions) {
  function isUnsupportedFile(path) {
    return !supportedExtensions.some((ext) => path.toLowerCase().endsWith(`.${ext}`));
  }

  function endsWithExtension(path) {
    return /\.[a-zA-Z0-9]+$/.test(path);
  }

  return process.argv
    .slice(2)
    .filter((i) => !i.startsWith("-"))
    .filter(endsWithExtension)
    .filter(isUnsupportedFile)
    .map((p) => `*.${p.split(".").pop()}`)
    .filter((i, index, arr) => arr.indexOf(i) === index);
}

module.exports = {
  ignorePatterns: [
    //
    ".eslintrc.?js",
    //
    "dist",
    "output",
    "out",
    "coverage",
    //
    ...listUnsupportedExtensions([
      "js",
      "cjs",
      "mjs",
      "jsx",
      "ts",
      "cts",
      "mts",
      "tsx",
      // 'json', 'json5', 'jsonc',
      // 'yaml', 'yml',
      // 'html', 'vue',
      // 'md',
    ]),
  ],
  overrides: [...jsConfig.overrides, ...tsConfig.overrides],
};
