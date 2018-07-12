/**
 * 置き換えたテキストノードを全て元に戻す
 * @param {SmashedNodes[]} smashed
 */
const deactivate = smashed => {
  for (const s of smashed) {
    try {
      s.parent.insertBefore(s.original, s.replaced[0]);
      for (const r of s.replaced) s.parent.removeChild(r);
    } catch (e) {
      // 置き換え時点での DOM 構造と異なる可能性があるため、
      // DOMException は無視する
      // 置き換えた DOM 構造を完全に元に戻すことは諦める
      if (!(e instanceof DOMException)) {
        throw e;
      }
    }
  }
};

export default deactivate;
