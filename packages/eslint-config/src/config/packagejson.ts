import * as pkg from "@git-validator/eslint-plugin-packagejson";
import * as publint from "eslint-plugin-publint";

export function packagejson() {
  return [
    {
      name: "git-validator/packagejson",
      files: ["**/package.json"],
      processor: "packagejson/processor",
      plugins: {
        packagejson: pkg,
        publint,
      },
      rules: {
        "packagejson/bottom-default": "error",
        "packagejson/exact-dependency-version": "error",
        "packagejson/no-conflict-types": "error",
        "packagejson/no-lifecycle-script": "error",
        "packagejson/no-nonstandard-property": "error",
        "packagejson/no-types-dependency-in-workspace-root": "error",
        "packagejson/top-types": "error",
        "packagejson/private-workspace-root": "error",
        "packagejson/required-engines": "error",
        "packagejson/required-repository": "error",
        "packagejson/type-module": "error",
        "packagejson/no-dependencies-in-workspace-root": "error",
        // "publint/suggestion": "error",
        "publint/warning": "error",
        "publint/error": "error",
      },
    },
  ] as const;
}
