/**
 * This config is for suppressing error when linting a directory which does not contain supported files
 */
export function unsupported() {
  return [
    {
      name: "git-validator/unsupported",
      files: ["**"], // I've tried all. Only '**' works.
      ignores: [
        "**/*.{js,cjs,mjs,jsx}",
        "**/*.{ts,cts,mts,tsx}",
        "**/package.json",
      ],
      processor: {
        preprocess: (_text: string, filename: string) => [
          { text: "export {};", filename },
        ],
        postprocess: (messages: unknown[][]) => messages[0],
      },
      rules: {},
    },
  ] as const;
}
