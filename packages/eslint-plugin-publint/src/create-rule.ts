import type { Rule } from "eslint";
import type { ObjectExpression } from "estree";
import type { MessageType } from "publint";
import { formatMessage } from "publint/utils";
import { getReportingNode } from "./ast.js";
import { getPublintInfo } from "./get-publint-info.js";

// Copied from https://www.npmjs.com/package/ansi-regex
function ansiRegex({ onlyFirst = false } = {}) {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
  ].join("|");
  return new RegExp(pattern, onlyFirst ? undefined : "g");
}

const regex = ansiRegex();

export function createRule(type: MessageType): Rule.RuleModule {
  return {
    create: (context: Rule.RuleContext) => {
      const { pkg, messages } = getPublintInfo(context.filename);
      const filteredMessages = messages.filter((msg) => msg.type === type);
      if (filteredMessages.length <= 0) return {};
      return {
        "Program > ExportDefaultDeclaration > ObjectExpression": (
          node: ObjectExpression,
        ) => {
          filteredMessages.forEach((msg) => {
            context.report({
              node: getReportingNode(node, msg.path),
              message:
                formatMessage(msg, pkg)?.replace(regex, "") ??
                JSON.stringify(msg),
            });
          });
        },
      };
    },
  };
}
