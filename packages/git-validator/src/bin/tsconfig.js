import process from "node:process";

process.env["TSCONFIG_EXTENDS"] = "git-validator/tsconfig";
await import("@git-validator/tsconfig/cli");
