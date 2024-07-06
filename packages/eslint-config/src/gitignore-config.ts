import childProcess from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(childProcess.exec);

async function globallyIgnore() {
  const { stdout } = await exec(
    "git ls-files --others --ignored --exclude-standard --directory",
  ).catch(() => {
    console.warn(
      "Warn: Running `git ls-files` fail. We recommend to run `git init` to setup the project first.",
    );
    return { stdout: "" };
  });
  const ignores = stdout.split("\n").filter(Boolean);
  // https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores
  return {
    // TODO waiting for eslint 9
    // name: 'git-validator/ignore',
    ignores,
  };
}

export default await globallyIgnore();
