import { createSimpleRule, getRuleName } from "../utils.js";

export const noInstanceofBuiltin = createSimpleRule({
  name: getRuleName(import.meta.url),
  message: "Right hand of `instanceof` can't be a builtin class.",
  create: (context) => ({
    BinaryExpression: (node) => {
      if (node.right.type !== "Identifier") {
        return;
      }
      const builtins = [
        // Primitive
        "Number",
        "String",
        "Boolean",
        "Symbol",
        "BigInt",

        // Object
        "Object",
        "Array",
        "Function",

        // Builtin
        "ArrayBuffer",
        "BigInt64Array",
        "BigUint64Array",
        "DataView",
        "Date",
        "Float32Array",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Map",
        "Error",
        "Promise",
        "Proxy",
        "RegExp",
        "Set",
        "SharedArrayBuffer",
        "Uint16Array",
        "Uint32Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "WeakMap",
        "WeakSet",
      ];

      if (builtins.includes(node.right.name)) {
        context.reportNode(node.right);
      }
    },
  }),
});
