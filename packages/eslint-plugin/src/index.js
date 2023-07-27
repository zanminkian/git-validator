const noConstEnum = require('./rules/no-const-enum')

module.exports = {
  rules: {
    [noConstEnum.ruleName]: noConstEnum.default,
  },
}
