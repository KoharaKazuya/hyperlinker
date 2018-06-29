/**
 * 置き換えたテキストノードを全て元に戻す
 * @param {SmashedNodes[]} smashed
 */
const deactivate = smashed => {
  for (const s of smashed) {
    s.parent.insertBefore(s.original, s.replaced[0]);
    for (const r of s.replaced) s.parent.removeChild(r);
  }
};

export default deactivate;
