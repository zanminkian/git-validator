import assert from "node:assert";
import { describe, it } from "node:test";
import { javascript } from "./javascript-config.js";

await describe("js config", async () => {
  await it("js config value should be error", () => {
    Object.values(javascript()[0].rules).forEach((value) => {
      if (typeof value === "string") {
        assert.strictEqual(value, "error");
      } else if (Array.isArray(value)) {
        assert.strictEqual(value[0], "error");
      } else {
        throw new Error("value should be string or array");
      }
    });
  });
});
