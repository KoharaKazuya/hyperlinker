/**
 * 指定したノードが指定したタグ名を持つ HTML 要素かどうか
 * @param {string} tagName
 * @param {Node} node
 */
const isHtmlElementOf = (tagName, node) =>
  // Node Type is ELEMENT_NODE
  node.nodeType === 1 &&
  // tag name check
  node.tagName.toLowerCase() === tagName.toLowerCase();

export default isHtmlElementOf;
