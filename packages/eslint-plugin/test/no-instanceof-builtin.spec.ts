import assert from "node:assert";
import { describe, it } from "node:test";
// eslint-disable-next-line unicorn/import-style
import types from "node:util/types";

await describe("no-instanceof-builtin", async () => {
  await it("node:utils/types should have 42 methods", () => {
    const keys = Object.keys(types);
    const propertyNames = Object.getOwnPropertyNames(types);
    assert.strictEqual(keys.length, 42);
    assert.strictEqual(propertyNames.length, 42);
    assert.deepEqual(keys, propertyNames);
  });
});
