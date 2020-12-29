import activate from "./hyperlinker/activate";
import deactivate from "./hyperlinker/deactivate";
import textNodes from "./hyperlinker/textNodes";

window.hyperlinker_extension = window.hyperlinker_extension || {
  /**
   * @type {SmashedNode[]}
   */
  smashedNodes: [],
  /**
   * @type {boolean}
   */
  isEnabled: false,
};

const enable = () => {
  window.hyperlinker_extension.smashedNodes = window.hyperlinker_extension.smashedNodes.concat(
    activate(textNodes(document.body))
  );
  window.hyperlinker_extension.isEnabled = true;
  sendState();
};
const disable = () => {
  deactivate(window.hyperlinker_extension.smashedNodes);
  window.hyperlinker_extension.smashedNodes = [];
  window.hyperlinker_extension.isEnabled = false;
  sendState();
  // イベントリスナーの解除
  window.removeEventListener("blur", blurListener);
  document.removeEventListener("visibilitychange", visibilityListener);
};
const toggle = () =>
  window.hyperlinker_extension.isEnabled ? disable() : enable();

// 現在状態を background script に送信する
const sendState = () => {
  chrome.runtime.sendMessage({
    type: "state",
    enabled: window.hyperlinker_extension.isEnabled,
  });
};

// enable のままウィンドウを離れたときにキー入力状態が追えなくならないように disable にする
function blurListener() {
  disable();
}
window.addEventListener("blur", blurListener);
function visibilityListener() {
  if (document.visibilityState === "hidden") disable();
}
document.addEventListener("visibilitychange", visibilityListener);

toggle();
