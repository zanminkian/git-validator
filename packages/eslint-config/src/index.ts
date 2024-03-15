import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { gitignoreToMinimatch } from "@humanwhocodes/gitignore-to-minimatch";
import prettierConfig from "eslint-config-prettier";
import jsConfig from "./js-config.js";
import packagejsonConfig from "./packagejson-config.js";
import tsConfig from "./ts-config.js";

async function globallyIgnore() {
  const ignores = (
    await fs
      .readFile(path.resolve(process.cwd(), ".gitignore"), "utf-8")
      .catch(() => "")
  )
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean)
    .filter((i) => !i.startsWith("#"))
    .map(gitignoreToMinimatch);
  // Globally ignore. https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
  return { ignores };
}

const ignore = await globallyIgnore();
const config = [jsConfig, ...tsConfig, packagejsonConfig] satisfies Array<{
  files: string[];
  plugins: Record<string, unknown>;
  rules: Record<string, unknown>;
}>;

type Keyof<T> = T extends infer U ? keyof U : never;
type Key = Keyof<(typeof config)[number]["rules"]>;
type NoDuplicate<A extends unknown[]> = {
  [I in keyof A]: true extends {
    [J in keyof A]: J extends I ? false : A[J] extends A[I] ? true : false;
  }[number]
    ? never
    : A[I];
};

function pickOrOmit(rules: readonly Key[], type: "pick" | "omit") {
  const find = (key: string) => {
    switch (type) {
      case "pick":
        return !!rules.find((rule) => rule === key)?.toString();
      case "omit":
        return !rules.find((rule) => rule === key)?.toString();
    }
  };

  const rulesObjects = config
    .map((i) => i.rules)
    .map((ruleObject) =>
      Object.fromEntries(Object.entries(ruleObject).filter(([k]) => find(k))),
    );
  return [
    ignore,
    ...config.map((configItem, index) => ({
      ...configItem,
      rules: rulesObjects[index],
    })),
    prettierConfig,
  ];
}

export const pick = <T extends Key[]>(rules: readonly [...NoDuplicate<T>]) =>
  pickOrOmit(rules, "pick");
export const omit = <T extends Key[]>(rules: readonly [...NoDuplicate<T>]) =>
  pickOrOmit(rules, "omit");
export default [ignore, ...config, prettierConfig];
