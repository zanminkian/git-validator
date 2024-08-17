import { gitignore } from "./config/gitignore.js";
import { ignore } from "./config/ignore.js";
import { javascript } from "./config/javascript.js";
import { packagejson } from "./config/packagejson.js";
import { typescript } from "./config/typescript.js";

type JsRuleKey = keyof ReturnType<typeof javascript>[0]["rules"];
type TsRuleKey = keyof ReturnType<typeof typescript>[0]["rules"];
type PkgRuleKey = keyof ReturnType<typeof packagejson>[0]["rules"];

interface Options<T extends string> {
  pick?: T[];
  omit?: T[];
  extend?: Record<
    string,
    "error" | "warn" | "off" | ["error" | "warn", ...unknown[]]
  >;
}

export class Builder {
  private readonly configs: object[] = [...gitignore(), ...ignore()];

  toConfig() {
    return this.configs;
  }

  private setup(
    [mainConfig, ...otherConfigs]: readonly [
      { plugins: object; rules: object },
      ...object[],
    ],
    { pick, omit, extend = {} }: Options<string>,
  ) {
    const select = (ruleKey: string) => {
      if (!pick && !omit) {
        return true;
      } else if (pick && !omit) {
        return pick.includes(ruleKey);
      } else if (!pick && omit) {
        return !omit.includes(ruleKey);
      } else {
        throw new Error("You cannot specify both pick and omit");
      }
    };
    const rules = Object.fromEntries(
      Object.entries(mainConfig.rules).filter(([ruleKey]) => select(ruleKey)),
    );
    // check `extend` field
    Object.keys(extend).forEach((key) => {
      if (key in rules) {
        throw new Error(
          `The extending rule key ${key} is already existing. If you want to override it, you should omit it first.`,
        );
      }
      if (key.includes("/")) {
        const pluginName = key.split("/")[0];
        if (!pluginName)
          throw new Error(`The extending rule key '${key}' is invalid`);
        if (!(pluginName in mainConfig.plugins)) {
          const supportedPlugins = Object.keys(mainConfig.plugins)
            .map((k) => `'${k}'`)
            .join(",");
          throw new Error(
            `The plugin name '${pluginName}' of extending rule key '${key}' is not supported. Only ${supportedPlugins} plugins are supported.`,
          );
        }
      }
    });
    this.configs.push(
      { ...mainConfig, rules: { ...rules, ...extend } },
      ...otherConfigs,
    );
    return this;
  }

  enableTypescript(options: Options<TsRuleKey> & { project?: string } = {}) {
    return this.setup(typescript(options.project), options);
  }

  enableJavascript(options: Options<JsRuleKey> = {}) {
    return this.setup(javascript(), options);
  }

  enablePackagejson(options: Options<PkgRuleKey> = {}) {
    return this.setup(packagejson(), options);
  }
}

export default new Builder()
  .enablePackagejson()
  .enableJavascript()
  .enableTypescript()
  .toConfig();
