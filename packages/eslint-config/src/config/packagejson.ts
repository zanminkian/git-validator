import * as pkg from "eslint-plugin-pkg-json";
import * as publint from "eslint-plugin-publint";

export function packagejson() {
  return [
    {
      name: "fenge/packagejson",
      files: ["**/package.json"],
      processor: "pkg-json/processor",
      plugins: {
        "pkg-json": pkg,
        publint,
      },
      rules: {
        "pkg-json/bottom-default": "error",
        "pkg-json/exact-dependency-version": "error",
        "pkg-json/no-conflict-types": "error",
        "pkg-json/no-lifecycle-script": "error",
        "pkg-json/no-nonstandard-property": "error",
        "pkg-json/no-types-dependency-in-workspace-root": "error",
        "pkg-json/top-types": "error",
        "pkg-json/private-workspace-root": "error",
        "pkg-json/required-engines": "error",
        "pkg-json/required-hashbang": "error",
        "pkg-json/required-repository": "error",
        "pkg-json/type-module": "error",
        "pkg-json/no-dependencies-in-workspace-root": "error",
        // "publint/suggestion": "error",
        "publint/warning": "error",
        "publint/error": "error",
      },
    },
  ] as const;
}
