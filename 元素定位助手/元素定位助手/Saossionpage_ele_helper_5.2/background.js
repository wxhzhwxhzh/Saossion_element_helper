
// 检查是否已存在具有相同 ID 的菜单项,如果有就清空
chrome.contextMenus.removeAll(

);

// 创建新的右键菜单
create_right_menu();

function create_right_menu() {

  chrome.contextMenus.create({
    id: "F9",
    title: "刷新定位",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id: "copyDP_simple",
    title: "复制元素Drissionpage精简语法",
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    id: "copyDP",
    title: "复制元素Drissionpage完整语法",
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    id: "copyXpath",
    title: "复制元素Xpath语法",
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    id: "vip",
    title: "解析当前网页视频",
    contexts: ["all"]
  });

}

// 根据菜单项ID调用不同的函数
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  const functions = {
    "copyDP_simple": showElementDP_simple,
    "copyDP": showElementDP,
    "copyXpath": showElementXpath,
    "F9": refresh,
    "vip":parserVideo
  };

  const func = functions[info.menuItemId];
  if (func) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: func
    });
  } else {
    console.error("Unsupported menu item ID:", info.menuItemId);
  }
});


// 工具库 函数

function showElementDP_simple() {
  extractInfoAndAlert_simple();

}

function showElementDP() {
  extractInfoAndAlert();
}

function showElementXpath() {
  copyElementXPath();
}

function refresh() {
  addClickEventToInputs();
  alert('-✔️骚神库元素定位插件- \n  插件已经深度解析，并重新定位动态元素!!');

}

function refresh_init() {
  addClickEventToInputs();
  listen_for_mousemove();

}

//------------
function parserVideo() {
  // 获取当前网页的网址
  var currentURL = window.location.href;
  // 拼接新的网址
  var newURL = "https://jx.jsonplayer.com/player/?url=" + window.location.href;

  // 在新标签页中打开新网址
  window.open(newURL, "_blank");
}





