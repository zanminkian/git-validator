import gitignoreConfig from "./gitignore-config.js";
import jsConfig from "./js-config.js";
import packagejsonConfig from "./packagejson-config.js";
import tsConfig from "./ts-config.js";

const config = [jsConfig, ...tsConfig, packagejsonConfig] satisfies Array<{
  files: string[];
  plugins?: Record<string, unknown>;
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

    return [
      gitignoreConfig,
      ...config.map((configItem) => ({
        ...configItem,
        rules: Object.fromEntries(
          Object.entries(configItem.rules).filter(([k]) => find(k)),
        ),
      })),
    ];
  };
}

export const pick = <T extends Key[]>(rules: NoDuplicateArray<T>) =>
  factory("pick")(rules);
export const omit = <T extends Key[]>(rules: NoDuplicateArray<T>) =>
  factory("omit")(rules);
export default [gitignoreConfig, ...config];
