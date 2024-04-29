
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
    title: "复制 Drissionpage精简语法",
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    id: "copyDP",
    title: "复制 Drissionpage完整语法",
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    id: "copyXpath",
    title: "复制 Xpath语法",
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    id: "cookie",
    title: "复制 网页cookie",
    contexts: ["all"],
    
  });

  chrome.contextMenus.create({
    id: "copy_code",
    title: "复制 启动代码",
    contexts: ["all"],   
    
  });

  // 创建第二级子菜单项1
  chrome.contextMenus.create({
    id: "sub_setup",
    title: "设置",
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    id: "switch_ele_window",
    title: "🔵元素浮窗开关",
    contexts: ["all"],
    parentId: "sub_setup"
    
  });
  chrome.contextMenus.create({
    id: "set_ele_window",
    title: "🔵元素定位设置",
    contexts: ["all"],
    parentId: "sub_setup"
    
  });
  // 创建第二级子菜单项2
  chrome.contextMenus.create({
    id: "more",
    title: "更多",
    contexts: ["all"]
  });
  chrome.contextMenus.create({
    id: "vip",
    title: "解析当前网页视频",
    contexts: ["all"],
    parentId: "more"
  });
  chrome.contextMenus.create({
    id: "copy_input",
    title: "复制input()语法",
    contexts: ["editable"],
    parentId: "more"
  });
  chrome.contextMenus.create({
    id: "copy_click",
    title: "复制click()语法",
    contexts: ["all"],
    parentId: "more"
  });
  chrome.contextMenus.create({
    id: "copy_ua",
    title: "复制网页UA",
    contexts: ["all"],
    parentId: "more"
  });
  

}

// 根据菜单项ID调用不同的函数
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  const functions = {
    "copyDP_simple": showElementDP_simple,
    "copyDP": showElementDP,
    "copyXpath": showElementXpath,
    "F9": refresh,
    "vip":parserVideo,
    "copy_input":copy_ele_and_input,
    "copy_click":copy_ele_and_click,
    "cookie":getCookie,
    "switch_ele_window":info_show_switch_,
    "set_ele_window":set_ele_loc,
    "copy_code":copy_init_code,
    "copy_ua":getUA

 
    
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

// 监听函数


// 监听来自 tool.js Script 的消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // 如果消息包含标题信息
  if (message.ele_count) {
    // 更新右键菜单的二级菜单名
    chrome.contextMenus.update("F9", {title: `刷新定位(已定位${message.ele_count}个元素)`});
  }
});


// 工具库 函数
function getCookie() {
  copyToClipboard(document.cookie);
  alert('网页的cookie已经复制到剪贴板 \n'+document.cookie);
  
}
function getUA() {
  copyToClipboard(navigator.userAgent);
  alert('网页的UA已经复制到剪贴板 \n'+navigator.userAgent);  
}


function showElementDP_simple() {
  extractInfoAndAlert_simple();  

}

function showElementDP() {
  extractInfoAndAlert();
}

function showElementXpath() {
  copyElementXPath();
}
function copy_ele_and_input() {
  extractInfoAndAlert_simple_input();
}
function copy_ele_and_click() {
  extractInfoAndAlert_simple_click();
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

function info_show_switch_(){
  info_show_switch();
}
function set_ele_loc(){
  selectAlert.show();
}


function  copy_init_code(){
  // copyToClipboard(init_code);  
  navigator.clipboard.writeText(init_code);
  // AutoDismissAlert('已经复制 \n'+init_code,2000);
  alert('当前网页启动代码已经复制 \n'+init_code);
}






