import assert from "node:assert";
import { describe, it } from "node:test";
import config from "./javascript-config.js";

function getValue(v: unknown): string {
  if (typeof v === "string") {
    return v;
  } else if (Array.isArray(v) && typeof v[0] === "string") {
    return v[0];
  } else {
    throw new Error("value should be string or array");
  }
}

await describe("js config", async () => {
  await it("js config value should be error", () => {
    Object.entries(config.rules).forEach(([ruleName, ruleValue]) => {
      if (ruleName === "dot-notation") {
        assert.strictEqual(getValue(ruleValue), "off");
      } else {
        assert.strictEqual(getValue(ruleValue), "error");
      }
    });
  });
});
