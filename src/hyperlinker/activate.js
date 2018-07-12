import urlMatcher from "./urlMatcher";
import smash from "./smash";
import hasAncestorBy from "./hasAncestorBy";
import isHtmlElementOf from "./isHtmlElementOf";

/**
 * 与えられた全てのテキストノードを、テキストノードの一部を a 要素に置き換えつつ、差し替える
 * @param {Node[]} textNodes
 * @return {SmashedNode[]}
 */
const activate = textNodes => {
  const smashedNodes = [];

  for (const n of textNodes) {
    // 先祖要素に <a>, <textarea>, <style> があれば、処理しない
    if (
      hasAncestorBy(
        n,
        node =>
          isHtmlElementOf("a", node) ||
          isHtmlElementOf("textarea", node) ||
          isHtmlElementOf("style", node)
      )
    )
      continue;
    // URL を含むテキストノードのみ処理する
    if (!urlMatcher.test(n.textContent)) continue;
    // n を「砕いて」 a 要素とテキストノードで n を置き換える
    const smashed = {
      parent: n.parentNode,
      original: n,
      replaced: smash(n)
    };
    for (const s of smashed.replaced)
      smashed.parent.insertBefore(s, smashed.original);
    smashed.parent.removeChild(smashed.original);
    // 置き換えた情報を記録する
    smashedNodes.push(smashed);
  }

  return smashedNodes;
};

export default activate;
