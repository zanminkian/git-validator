/**
 * This config is for suppressing error when linting a directory which does not contain supported files
 */
export function ignore() {
  return [
    {
      name: "git-validator/ignore",
      files: ["**"], // I've tried all. Only '**' works.
      ignores: [
        "**/*.{js,cjs,mjs,jsx}",
        "**/*.{ts,cts,mts,tsx}",
        "**/package.json",
      ],
      processor: {
        preprocess: (_text: string, filename: string) => [
          { text: "", filename },
        ],
        postprocess: (_messages: unknown[][]) => [], // Returning empty array to ignore all errors
      },
      rules: {},
    },
  ] as const;
}
