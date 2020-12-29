const highlightIcon = (highlight = true) => {
  chrome.action.setIcon({
    path: {
      48: `assets/images/icon48_${highlight ? "enabled" : "disabled"}.png`,
      128: `assets/images/icon128_${highlight ? "enabled" : "disabled"}.png`,
    },
  });
};
const unhighlightIcon = () => highlightIcon(false);

const toggleActivation = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    });
  });
};

// action のアイコンをクリックしたとき、
// 現在アクティブなタブに hyperlinker の enable/disable 切り替え命令を送る
chrome.action.onClicked.addListener(() => {
  toggleActivation();
});
// ショートカットなどでコマンドが実行されたとき、
// 現在アクティブなタブに hyperlinker の enable/disable 切り替え命令を送る
chrome.commands.onCommand.addListener((command) => {
  if (command !== "toggle-hyperlink-activation") return;
  toggleActivation();
});

// アクティブなタブが変更されたとき、アイコンを disable に切り替える
chrome.tabs.onActivated.addListener((info) => {
  unhighlightIcon();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    // 現在状態の変更をタブから通知されたとき、action のアイコンの見た目に反映する
    case "state": {
      highlightIcon(request.enabled);
      break;
    }
    default: {
      console.warn("Unknown request type: ", request.type);
    }
  }
});
