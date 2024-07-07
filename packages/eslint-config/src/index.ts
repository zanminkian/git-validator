import gitignoreConfig from "./gitignore-config.js";
import jsConfig from "./javascript-config.js";
import packagejsonConfig from "./packagejson-config.js";
import tsConfig from "./typescript-config.js";

const config = [
  gitignoreConfig,
  jsConfig,
  ...tsConfig,
  packagejsonConfig,
] as const satisfies Array<{
  name?: string; // TODO remove the question mark
  ignores?: string[];
  files?: string[];
  plugins?: Record<string, unknown>;
  rules?: Record<string, unknown>;
}>;

type Keyof<T> = T extends infer U ? keyof U : never;
type GetRules<T> = T extends { rules: unknown } ? T["rules"] : never;
type Key = Keyof<GetRules<(typeof config)[number]>>;
type NoDuplicate<A extends unknown[]> = {
  [I in keyof A]: true extends {
    [J in keyof A]: J extends I ? false : A[J] extends A[I] ? true : false;
  }[number]
    ? never
    : A[I];
};
type NoDuplicateArray<T extends unknown[]> = [...NoDuplicate<T>];

function factory(type: "pick" | "omit") {
  return (rules: readonly Key[]) => {
    const find = (key: string) => {
      switch (type) {
        case "pick":
          return !!rules.find((rule) => rule === key)?.toString();
        case "omit":
          return !rules.find((rule) => rule === key)?.toString();
      }
    };

    return config.map((configItem) => ({
      ...configItem,
      ...("rules" in configItem && {
        rules: Object.fromEntries(
          Object.entries(configItem.rules).filter(([k]) => find(k)),
        ),
      }),
    }));
  };
}

export const pick = <T extends Key[]>(rules: NoDuplicateArray<T>) =>
  factory("pick")(rules);
export const omit = <T extends Key[]>(rules: NoDuplicateArray<T>) =>
  factory("omit")(rules);
export default config;
