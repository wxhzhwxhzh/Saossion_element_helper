// 获取当前网页的标题
const pageTitle = document.title;

// 将标题发送到扩展的后台脚本
chrome.runtime.sendMessage({title: pageTitle});