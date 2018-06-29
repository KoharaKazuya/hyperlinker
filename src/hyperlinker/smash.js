import urlMatcher from "./urlMatcher";

/**
 * 与えられたテキストノードを「砕いて」 a 要素とテキストノードを返す
 * @param n {TextNode}
 * @return {TextNode[]}
 */
const smash = n => {
  const text = n.textContent;
  const matched = urlMatcher.exec(text);
  if (!matched) return [n];
  const { 0: link, index } = matched;

  const prefixTextNode = document.createTextNode(text.slice(0, index));

  const linkNode = document.createElement("a");
  linkNode.href = link;
  linkNode.textContent = link;

  const restTextNode = document.createTextNode(text.slice(index + link.length));

  return [prefixTextNode, linkNode, ...smash(restTextNode)];
};

export default smash;
