import packagejson from "@git-validator/eslint-plugin-packagejson";

export default {
  files: ["**/package.json"],
  processor: "packagejson/processor",
  plugins: {
    packagejson,
  },
  rules: {
    "packagejson/bottom-default": "error",
    "packagejson/exact-dependency-version": "error",
    "packagejson/no-lifecycle-script": "error",
    "packagejson/top-types": "error",
    "packagejson/private-workspace-root": "error",
    "packagejson/required-engines": "error",
    "packagejson/required-repository": "error",
    "packagejson/type-module": "error",
    "packagejson/no-dependencies-in-workspace-root": "error",
  },
};
