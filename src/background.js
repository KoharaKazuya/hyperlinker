const highlightIcon = (highlight = true) => {
  chrome.browserAction.setIcon({
    path: {
      "48": `assets/images/icon48_${highlight ? "enabled" : "disabled"}.png`,
      "128": `assets/images/icon128_${highlight ? "enabled" : "disabled"}.png`
    }
  });
};
const unhighlightIcon = () => highlightIcon(false);

// browser action のアイコンをクリックしたとき、
// 現在アクティブなタブに hyperlinker の enable/disable 切り替え命令を送る
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length === 0) return;
    chrome.tabs.sendMessage(tabs[0].id, { type: "toggle" });
  });
});

// アクティブなタブが変更されたとき、
// 現在アクティブなタブに現在状態を問い合わせする
chrome.tabs.onActivated.addListener(info => {
  unhighlightIcon();
  chrome.tabs.sendMessage(info.tabId, { type: "query" });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    // 現在状態の変更をタブから通知されたとき、
    // browser action のアイコンの見た目に反映する
    case "state": {
      highlightIcon(request.enabled);
      break;
    }
    default: {
      console.warn("Unknown request type: ", request.type);
    }
  }
});
