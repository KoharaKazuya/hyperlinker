import isMacOS from "./hyperlinker/isMacOS";
import textNodes from "./hyperlinker/textNodes";
import activate from "./hyperlinker/activate";
import deactivate from "./hyperlinker/deactivate";

/**
 * @type {SmashedNode[]}
 */
let smashedNodes = [];
/**
 * @type {boolean}
 */
let isEnabled = false;

const enable = () => {
  smashedNodes = smashedNodes.concat(activate(textNodes(document.body)));
  isEnabled = true;
  sendState();
};
const disable = () => {
  deactivate(smashedNodes);
  smashedNodes = [];
  isEnabled = false;
  sendState();
};
const toggle = () => (isEnabled ? disable() : enable());

// 現在状態を background script に送信する
const sendState = () => {
  chrome.runtime.sendMessage({ type: "state", enabled: isEnabled });
};

// Ctrl, Cmd キーの down/up で enable/disable を切り替える
window.addEventListener("keydown", event => {
  if (isMacOS() ? event.key !== "Meta" : event.key !== "Control") return;
  enable();
});
window.addEventListener("keyup", event => {
  if (isMacOS() ? event.key !== "Meta" : event.key !== "Control") return;
  disable();
});

// enable のままウィンドウを離れたときにキー入力状態が追えなくならないように disable にする
window.addEventListener("blur", () => {
  disable();
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") disable();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    // 切り替え指令があったとき enable/disable を切り替える
    case "toggle": {
      toggle();
      break;
    }
    // 現在状態の問い合わせがあったとき、現在状態を送信する
    case "query": {
      sendState();
      break;
    }
    default: {
      console.warn("Unknown request type: ", request.type);
    }
  }
});
