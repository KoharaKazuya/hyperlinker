/**
 * 指定したノードが現在のユーザーのテキスト選択状態と一部でも重なっているかどうか
 * @param {Node} node
 * @return {boolean}
 */
const isIntersectedBySelection = node => {
  const selection = window.getSelection();
  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i);
    if (range.collapsed) continue;
    if (intersectsNode(range, node)) return true;
  }
  return false;
};

export default isIntersectedBySelection;

const intersectsNode = (r, node) => {
  let range = document.createRange();
  range.selectNode(node);
  return (
    0 > r.compareBoundaryPoints(Range.END_TO_START, range) &&
    0 < r.compareBoundaryPoints(Range.START_TO_END, range)
  );
};
