#!/usr/bin/env node

// TODO Remove this file in next minor version
import process from "node:process";

process.env["TSCONFIG_EXTENDS"] = "git-validator/tsconfig";
await import("@git-validator/tsconfig/cli");
