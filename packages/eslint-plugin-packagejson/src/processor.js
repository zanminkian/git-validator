export const processor = {
  /**
   * @param {string} text
   * @param {string} filename
   */
  preprocess: (text, filename) => [`export default ${text.trim()}`],
  postprocess: (messages) => [].concat(...messages),
};
