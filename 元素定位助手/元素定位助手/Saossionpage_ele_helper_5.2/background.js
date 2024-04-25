
// 检查是否已存在具有相同 ID 的菜单项,如果有就清空
chrome.contextMenus.removeAll(
  
);

// 创建新的右键菜单
create_right_menu();



function create_right_menu(){

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
    id: "copyCSS",
    title: "复制元素CSS语法",
    contexts: ["all"]
  });

}  






  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {

    chrome.scripting.executeScript({       

      target: { tabId: tab.id },
      function: refresh_init
    });
    
    
    if (info.menuItemId === "copyDP_simple") {
      
      chrome.scripting.executeScript({       

        target: { tabId: tab.id },
        function: showElementDP_simple
      });
    }

    if (info.menuItemId === "copyDP") {
      
      chrome.scripting.executeScript({       

        target: { tabId: tab.id },
        function: showElementDP
      });
    }

    if (info.menuItemId === "copyXpath") {
      
      chrome.scripting.executeScript({       

        target: { tabId: tab.id },
        function: showElementXpath
      });
    }
    if (info.menuItemId === "F9") {
      
      chrome.scripting.executeScript({       

        target: { tabId: tab.id },
        function: refresh
      });
    }


  });



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



