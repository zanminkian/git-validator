export const processor = {
  /**
   * @param {string} text
   * @param {string} filename
   */
  preprocess: (text, filename) => {
    if (!filename.endsWith("/package.json")) {
      return text;
    }
    return ["export default " + text.trim()];
  },
  postprocess: (messages) => [].concat(...messages),
};
