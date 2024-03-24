import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleName = "no-instanceof-builtin";
export const messageId = "noInstanceofBuiltin";
export const defaultOptions = [];
const description = "Right hand of `instanceof` can't be a builtin class.";
const message =
  "Right hand of `instanceof` can't be a builtin class. Use `typeof` or `node:util/types` instead.";

export const rule = ESLintUtils.RuleCreator((name) => name)<
  typeof defaultOptions,
  typeof messageId
>({
  name: ruleName,
  meta: {
    type: "problem",
    docs: {
      description,
    },
    schema: [],
    messages: {
      [messageId]: message,
    },
  },
  defaultOptions,
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
        context.report({ node: node.right, messageId });
      }
    },
  }),
});
