/**
 * 与えられたノードの子孫要素である全てのテキストノードを返す
 * @param {Node} n
 * @return {Node[]}
 */
const textNodes = n =>
  n.nodeType === 3
    ? [n]
    : [...n.childNodes].reduce((acc, c) => acc.concat(textNodes(c)), []);

export default textNodes;
