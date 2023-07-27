const noConstEnum = require('./rules/no-const-enum')
const noExportAssignment = require('./rules/no-export-assignment')

module.exports = {
  configs: {
    recommended: {
      plugins: ['@zanminkian'],
      overrides: [
        {
          files: ['*.ts', '*.cts', '*.mts', '*.tsx'],
          rules: {
            [`@zanminkian/${noConstEnum.ruleName}`]: 'error',
            [`@zanminkian/${noExportAssignment.ruleName}`]: 'error',
          },
        },
        {
          files: ['*.tjs', '*.cjs', '*.mjs', '*.jsx'],
          rules: {
          },
        },
      ],
    },
  },
  rules: {
    [noConstEnum.ruleName]: noConstEnum.default,
    [noExportAssignment.ruleName]: noExportAssignment.default,
  },
}
