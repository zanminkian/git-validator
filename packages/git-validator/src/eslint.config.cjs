const { join } = require("node:path");
const { cosmiconfigSync } = require("cosmiconfig");

const defaultConfig = { extends: "@zanminkian/eslint-config" };

module.exports = cosmiconfigSync("eslint").search(join(__dirname, ".."))?.config ?? defaultConfig;
