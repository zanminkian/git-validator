import type { Expression, Node, Pattern } from "estree";

export function getReportingNode(
  node: Expression | Pattern,
  paths: string[],
): Node {
  const [field, ...restPaths] = paths;
  if (!field) {
    return node;
  }
  let next: Expression | Pattern | undefined = undefined;
  if (node.type === "ObjectExpression") {
    const property = node.properties.find(
      (property) =>
        "key" in property &&
        "value" in property.key &&
        property.key.value === field,
    );
    if (property && property.type !== "SpreadElement") {
      next = property.value;
    }
  } else if (node.type === "ArrayExpression") {
    const element = node.elements[Number(field)];
    if (element && element.type !== "SpreadElement") {
      next = element;
    }
  }
  if (!next) {
    return node;
  }
  return getReportingNode(next, restPaths);
}
