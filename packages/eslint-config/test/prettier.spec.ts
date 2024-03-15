import assert from "node:assert";
import { describe, it } from "node:test";
import prettierConfig from "eslint-config-prettier";
import jsConfig from "../dist/js-config.js";
import packagejsonConfig from "../dist/packagejson-config.js";
import tsConfig from "../dist/ts-config.js";

await describe("prettier", async () => {
  await it("should not have prettier-conflicted rules", () => {
    const included = (rule: string) =>
      Object.keys(prettierConfig.rules).includes(rule);

    // 1
    const jsForbidRule = Object.keys(jsConfig.rules).find(included);
    assert.strictEqual(jsForbidRule, undefined);

    // 2
    const mainTsConfig = tsConfig[0];
    assert.strictEqual(typeof mainTsConfig, "object");
    assert.strictEqual(tsConfig.length, 2);
    const keys = tsConfig.reduce<string[]>(
      (result, config) => Object.keys(config).concat(result),
      [],
    );
    const tsForbidRule = keys.find(included);
    assert.strictEqual(tsForbidRule, undefined);

    // 3
    const pacakgejsonRule = Object.keys(packagejsonConfig.rules).find(included);
    assert.strictEqual(pacakgejsonRule, undefined);
  });
});
