import assert from "node:assert";
import { describe, it } from "node:test";
import config from "./eslint.config.js";

await describe("eslint.config", async () => {
  await it("length of default export should be 9", () => {
    assert.strictEqual(config.length, 9);
  });
  await it("no warns", () => {
    config.forEach((configItem) => {
      if (
        "rules" in configItem &&
        typeof configItem.rules === "object" &&
        configItem.rules
      ) {
        Object.values(configItem.rules).forEach((value) => {
          assert.notStrictEqual(getValueString(value), "warn");
        });
      }
    });
  });
});

function getValueString(value: unknown): string {
  if (typeof value === "string") {
    return value;
  } else if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  } else {
    throw new Error("unknown value");
  }
}
