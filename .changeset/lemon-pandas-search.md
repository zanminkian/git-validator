---
"git-validator": minor
---

refactor(git-validator)!: remove `commitlint`

BREAKING CHANGE: We now remove `commitlint`. It means this tool will not check commit message on git `commit-msg` stage. We encourage to use [git-commit-msg-linter](https://www.npmjs.com/package/git-commit-msg-linter) as the alternative. After upgrading this tool, you will need to delete `commit-msg` file in the `.git/hooks` folder of the project root.
