import { gitignore } from "./gitignore-config.js";
import { javascript } from "./javascript-config.js";
import { packagejson } from "./packagejson-config.js";
import { typescript } from "./typescript-config.js";

type Concat<T extends unknown[], I extends unknown[]> = [...T, ...I];

type GitignoreConfig = [...ReturnType<typeof gitignore>];
type JavascriptConfig = [...ReturnType<typeof javascript>];
type PackagejsonConfig = [...ReturnType<typeof packagejson>];
type TypescriptConfig = [...ReturnType<typeof typescript>];

type Keyof<T> = T extends infer U ? keyof U : never;
type RuleKeys<T extends { rules: object }[]> = Keyof<T[number]["rules"]>[];

type PickRules<T extends { rules: object }[], K extends string[]> = {
  [I in keyof T]: Omit<T[I], "rules"> & {
    rules: Pick<T[I]["rules"], Extract<K[number], keyof T[I]["rules"]>>;
  };
};
type OmitRules<T extends { rules: object }[], K extends string[]> = {
  [I in keyof T]: Omit<T[I], "rules"> & {
    rules: Omit<T[I]["rules"], Extract<K[number], keyof T[I]["rules"]>>;
  };
};

export interface EnableOptions<R extends string[]> {
  select?: { mode: "pick" | "omit"; rules: R };
}
export interface PickOptions<R extends string[]> {
  select: { mode: "pick"; rules: R };
}
export interface OmitOptions<R extends string[]> {
  select: { mode: "omit"; rules: R };
}

export class Builder<T extends unknown[] = GitignoreConfig> {
  private readonly configs: object[] = [...gitignore()];

  toConfig() {
    return this.configs as T;
  }

  private setup(
    subConfigs: readonly { rules: object }[],
    options: EnableOptions<string[]> = {},
  ): Builder<unknown[]> {
    const { select } = options;
    if (!select) {
      this.configs.push(...subConfigs);
      return this;
    }
    const pick = (ruleKey: string) => select.rules.includes(ruleKey);
    const omit = (ruleKey: string) => !select.rules.includes(ruleKey);
    this.configs.push(
      ...subConfigs.map((config) => ({
        ...config,
        rules: Object.fromEntries(
          Object.entries(config.rules).filter(([ruleKey]) =>
            select.mode === "pick" ? pick(ruleKey) : omit(ruleKey),
          ),
        ),
      })),
    );
    return this;
  }

  enableTypescript<K extends RuleKeys<TypescriptConfig>>(
    options: PickOptions<K> & { project?: string },
  ): Builder<Concat<T, PickRules<TypescriptConfig, K>>>;
  enableTypescript<K extends RuleKeys<TypescriptConfig>>(
    options: OmitOptions<K> & { project?: string },
  ): Builder<Concat<T, OmitRules<TypescriptConfig, K>>>;
  enableTypescript<K extends RuleKeys<TypescriptConfig>>(
    options?: EnableOptions<K> & { project?: string },
  ): Builder<Concat<T, TypescriptConfig>>;
  enableTypescript<K extends RuleKeys<TypescriptConfig>>(
    options?: EnableOptions<K> & { project?: string },
  ) {
    return this.setup(typescript(options?.project), options);
  }

  enableJavascript<K extends RuleKeys<JavascriptConfig>>(
    options: PickOptions<K>,
  ): Builder<Concat<T, PickRules<JavascriptConfig, K>>>;
  enableJavascript<K extends RuleKeys<JavascriptConfig>>(
    options: OmitOptions<K>,
  ): Builder<Concat<T, OmitRules<JavascriptConfig, K>>>;
  enableJavascript<K extends RuleKeys<JavascriptConfig>>(
    options?: EnableOptions<K>,
  ): Builder<Concat<T, JavascriptConfig>>;
  enableJavascript<K extends RuleKeys<JavascriptConfig>>(
    options?: EnableOptions<K>,
  ) {
    return this.setup(javascript(), options);
  }

  enablePackagejson<K extends RuleKeys<PackagejsonConfig>>(
    options: PickOptions<K>,
  ): Builder<Concat<T, PickRules<PackagejsonConfig, K>>>;
  enablePackagejson<K extends RuleKeys<PackagejsonConfig>>(
    options: OmitOptions<K>,
  ): Builder<Concat<T, OmitRules<PackagejsonConfig, K>>>;
  enablePackagejson<K extends RuleKeys<PackagejsonConfig>>(
    options?: EnableOptions<K>,
  ): Builder<Concat<T, PackagejsonConfig>>;
  enablePackagejson<K extends RuleKeys<PackagejsonConfig>>(
    options?: EnableOptions<K>,
  ) {
    return this.setup(packagejson(), options);
  }
}

export default new Builder()
  .enablePackagejson()
  .enableJavascript()
  .enableTypescript()
  .toConfig();
