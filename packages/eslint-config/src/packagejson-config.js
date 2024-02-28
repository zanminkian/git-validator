// @ts-check
import packagejson, {
  processor,
} from "@git-validator/eslint-plugin-packagejson";

export default {
  files: ["**/package.json"],
  processor,
  plugins: {
    packagejson,
  },
  rules: {
    "packagejson/bottom-default": "error",
    "packagejson/top-types": "error",
    "packagejson/private-workspace-root": "error",
    "packagejson/required-repository": "error",
    "packagejson/type-module": "warn",
    "packagejson/no-dependencies-in-workspace-root": "warn",
  },
};
