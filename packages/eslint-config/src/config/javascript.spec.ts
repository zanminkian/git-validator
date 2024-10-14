import assert from "node:assert";
import { describe, it } from "node:test";
import { javascript } from "./javascript.js";

await describe("js config", async () => {
  await it("js main config value should be error", () => {
    Object.values(javascript()[0].rules).forEach((value) => {
      assert.strictEqual(getValueString(value), "error");
    });
  });

  await it("js rest configs rules should exist in main rules", () => {
    const [main, ...restConfigs] = javascript();
    restConfigs.forEach((restConfig) => {
      Object.entries(restConfig.rules).forEach(([key, value]) => {
        assert.strictEqual(key in main.rules, true);
        assert.notDeepStrictEqual(value, Reflect.get(main.rules, key));
      });
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
