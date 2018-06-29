/**
 * @callback NodeMatcher
 * @param {Node} 判定対象のノード
 * @param {boolean} マッチするかどうか
 */

/**
 * 指定したノードの先祖要素に判定関数にマッチするノードを持つかどうか
 * (先祖要素には指定ノード自身は含まれない)
 * @param {Node} node
 * @param {NodeMatcher} matcher
 */
const hasAncestorBy = (node, matcher) => {
  while ((node = node.parentNode)) if (matcher(node)) return true;
  return false;
};

export default hasAncestorBy;
