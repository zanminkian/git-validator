const noConstEnum = require('./rules/no-const-enum')
const noExportAssignment = require('./rules/no-export-assignment')
const noDeclaresInTsFile = require('./rules/no-declares-in-ts-file')

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
            [`@zanminkian/${noDeclaresInTsFile.ruleName}`]: 'error',
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
    [noDeclaresInTsFile.ruleName]: noDeclaresInTsFile.default,
  },
}
