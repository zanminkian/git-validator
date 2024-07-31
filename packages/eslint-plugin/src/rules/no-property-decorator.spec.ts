import { rule } from "./no-property-decorator.js";
import { test } from "./utils.spec.js";

const valid = [
  `class A {
    @Inject()
    declare private readonly name: string;
  }`,
  `class A {
    @Get()
    get() {
    }
  }`,
];

const invalid = [
  `class A {
    @Inject()
    name: string;
  }`,
  `class A {
    @Inject()
    private readonly name: Map<string, string> = new Map<string, string>();
  }`,
];

test({ valid, invalid, ...rule });
