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
        id: "fingerPrint",
        title: "指纹检测",
        contexts: ["all"],

    });

    // 创建第二级子菜单项1
    chrome.contextMenus.create({
        id: "copy",
        title: "复制",
        contexts: ["all"]
    });
    chrome.contextMenus.create({
        id: "copy_code",
        title: "启动代码",
        contexts: ["all"],
        parentId: "copy"
    });
    chrome.contextMenus.create({
        id: "cookie",
        title: "网页cookie",
        contexts: ["all"],
        parentId: "copy"

    });
    chrome.contextMenus.create({
        id: "copy_input",
        title: "input()语法",
        contexts: ["editable"],
        parentId: "copy"
    });
    chrome.contextMenus.create({
        id: "copy_click",
        title: "click()语法",
        contexts: ["all"],
        parentId: "copy"
    });
    chrome.contextMenus.create({
        id: "copy_ua",
        title: "网页UA",
        contexts: ["all"],
        parentId: "copy"
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
        id: "exe_js",
        title: "js代码调试",
        contexts: ["all"],
        parentId: "more"
    });
    chrome.contextMenus.create({
        id: "get_img",
        title: "获取所有图片地址",
        contexts: ["all"],
        parentId: "more"
    });
    chrome.contextMenus.create({
        id: "download_video",
        title: "视频解析下载",
        contexts: ["all"],
        parentId: "more"
    });

}

// 根据菜单项ID调用不同的函数
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    const functions = {
        "copyDP_simple": showElementDP_simple,
        "copyDP": showElementDP,
        "copyXpath": showElementXpath,
        "F9": refresh,
        "vip": parserVideo,
        "copy_input": copy_ele_and_input,
        "copy_click": copy_ele_and_click,
        "cookie": getCookie,
        "fingerPrint": scan_finger_print_,
        "switch_ele_window": info_show_switch_,
        "set_ele_window": set_ele_loc,
        "copy_code": copy_init_code,
        "copy_ua": getUA,
        "exe_js": exe_js,
        "get_img": getAllImageLinks,
        "download_video": download_video

    };

    const func = functions[info.menuItemId];
    if (func) {
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
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
        chrome.contextMenus.update("F9", {
            title: `刷新定位(已定位${message.ele_count}个元素)`
        });
    }
});

// 工具库 函数

function getCookie() {
    main_app.copyToClipboard(document.cookie);
    alert('网页的cookie已经复制到剪贴板 \n' + document.cookie);

}
function scan_finger_print_() {
    window.open("https://ip77.net/", "_blank");

}

function getUA() {
    main_app.copyToClipboard(navigator.userAgent);

    alert('网页的UA已经复制到剪贴板 \n' + navigator.userAgent);
}

function exe_js() {
    main_app.execute_js();

}
function showElementDP_simple() {
    main_app.extractInfoAndAlert_simple();

}

function showElementDP() {
    main_app.extractInfoAndAlert();
}

function showElementXpath() {
    main_app.copyElementXPath();
}
function copy_ele_and_input() {
    main_app.extractInfoAndAlert_simple_input();
}

function copy_ele_and_click() {
    main_app.extractInfoAndAlert_simple_click();
}

function refresh() {
    main_app.addClickEventToInputs();
    alert('-✔️骚神库元素定位插件- \n  插件已经深度解析，并重新定位动态元素!!');

}

function refresh_init() {
    main_app.addClickEventToInputs();
    main_app.listen_for_mousemove();

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

function info_show_switch_() {
    info_show_switch();
}
function set_ele_loc() {
    selectAlert.show();
}

function download_video() {
    main_app.download_video();

}

function copy_init_code() {
    // copyToClipboard(init_code);  
    navigator.clipboard.writeText(init_code);
    // AutoDismissAlert('已经复制 \n'+init_code,2000);
    alert('当前网页启动代码已经复制 \n' + init_code);
}
function getAllImageLinks() {
    // 获取当前网页中所有的图片元素
    const images = document.getElementsByTagName('img');

    // 创建一个空数组来存储图片链接地址
    const imageLinks = [];

    // 遍历所有图片元素，提取图片链接地址并添加到数组中
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const src = image.src;
        // 获取图片链接地址
        imageLinks.push(src);
        // 将链接地址添加到数组中
    }

    // 创建一个新的 div 元素
    const div = document.createElement('div');
    div.id = 'img_url';
    // 设置 div 元素的 id 属性为 img_url

    // 将图片链接转换成带链接的 <a> 标签并添加到 div 元素中
    imageLinks.forEach(link=>{
        const a = document.createElement('a');
        a.href = link;
        // 设置 <a> 标签的 href 属性为图片链接地址
        a.textContent = link;
        // 设置 <a> 标签的文本内容为图片链接地址
        div.appendChild(a);
        // 将 <a> 标签添加到 div 元素中
        div.appendChild(document.createElement('br'));
        // 添加一个换行
    }
    );

    // 将新创建的 div 元素插入到 body 中
    document.body.appendChild(div);

    // 打印出获取到的所有图片链接地址
    console.log("当前网页所有图片链接地址：");
    console.log(imageLinks);

    // 返回图片链接数组（可选）
    return imageLinks;
}
