## How it Works

Running `git-validator install` writes `commit-msg` and `pre-commit` files to the `{PROJECT_ROOT}/.git/hooks` directory, which will check your code and commit messages after running the `git commit` command.

### `commit-msg` Stage

The `commit-msg` file we wrote validates your git commit message before the commit is made. We use [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli) with [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) config to check the git commit message.

### `pre-commit` Stage

The `pre-commit` file we wrote lints and formats your staged code before the commit is made. We use [Eslint](https://www.npmjs.com/package/eslint) with [@git-validator/eslint-config](https://www.npmjs.com/package/@git-validator/eslint-config) and [Prettier](https://www.npmjs.com/package/prettier) with [@git-validator/prettier-config](https://www.npmjs.com/package/@git-validator/prettier-config) to check the committing code.
