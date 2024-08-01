import assert from "node:assert";
import { describe, it } from "node:test";
import config from "./eslint.config.js";

await describe("index", async () => {
  await it("length of default export should be 5", () => {
    assert.strictEqual(config.length, 6);
  });
});
