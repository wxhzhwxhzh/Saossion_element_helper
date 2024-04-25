

  //  右键菜单

  chrome.contextMenus.create({
    id: "F9",
    title: "刷新定位",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id: "copyDP",
    title: "复制元素Drissionpage精简语法",
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






  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
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


  
function showElementDP() {
  var element = window.getSelection().anchorNode.parentElement;
  if (element) {
    extractInfoAndAlert_simple();
  } else {
    alert("无法获取元素的语法");
  }
}

function showElementXpath() {
  var element = window.getSelection().anchorNode.parentElement;
  if (element) {
    // copyElementXPath();
    copyElementXPath();

  } else {
    alert("无法获取元素的语法");
  }
}

function refresh() {
  var element = window.getSelection().anchorNode.parentElement;
  if (element) {
    addClickEventToInputs();
    alert('-✔️骚神库元素定位插件- \n 你按下了F9键\n 插件已经深度解析，重新定位动态元素!!');

  }
}

