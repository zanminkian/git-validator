import { test } from "../test.js";
import { name, rule } from "./required-repository.js";

const valid = [
  { private: true, name: "foo" },
  { private: true },
  { repository: "http://example.com" },
  { repository: { url: "" } },
];

const invalid = [
  {},
  { name: "foo" },
  { private: false },
  { private: false, repository: "" },
  { repository: "" },
  { repository: {} },
];

await test({ name, rule, valid, invalid });
