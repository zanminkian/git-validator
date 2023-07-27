const noConstEnum = require('./rules/no-const-enum')
const noExportAssignment = require('./rules/no-export-assignment')
const noDeclaresInTsFile = require('./rules/no-declares-in-ts-file')
const noNodeModulesWhenImport = require('./rules/no-node-modules-when-import')

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
            [`@zanminkian/${noNodeModulesWhenImport.ruleName}`]: 'error',
          },
        },
        {
          files: ['*.js', '*.cjs', '*.mjs', '*.jsx'],
          rules: {
            [`@zanminkian/${noNodeModulesWhenImport.ruleName}`]: 'error',
          },
        },
      ],
    },
  },
  rules: {
    [noConstEnum.ruleName]: noConstEnum.default,
    [noExportAssignment.ruleName]: noExportAssignment.default,
    [noDeclaresInTsFile.ruleName]: noDeclaresInTsFile.default,
    [noNodeModulesWhenImport.ruleName]: noNodeModulesWhenImport.default,
  },
}
