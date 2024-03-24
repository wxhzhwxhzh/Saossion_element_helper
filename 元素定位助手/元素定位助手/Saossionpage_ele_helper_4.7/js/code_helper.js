
var init_code =`
#!/usr/bin/env python
# -*- coding:utf-8 -*-

# DrissionPage 库 文档地址 http://g1879.gitee.io/drissionpagedocs/

#-导入库
from DrissionPage import ChromiumPage,ChromiumOptions

#-导入数据类型判断
from DrissionPage.items import SessionElement
from DrissionPage.items import ChromiumElement
from DrissionPage.items import ShadowRoot
from DrissionPage.items import NoneElement
from DrissionPage.items import ChromiumTab
from DrissionPage.items import WebPageTab
from DrissionPage.items import ChromiumFrame

#-配置类
class Config:    
    UA_android="Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36"
    UA_apple="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"


#-创建配置对象
co=ChromiumOptions()

#-启动配置

#-创建浏览器
page = ChromiumPage(addr_or_opts=co)

#-设置文件下载目录 默认是当前目录
page.set.download_path(".")

#-打开网址
page.get('http://gitee.com')

test=input('go on ?')
  
`  

function writeToTextarea(character) {
    var textarea = document.getElementById('wenben');
    textarea.value = character;
  }

 


if (document.getElementById('wenben').value === '空的') {
    writeToTextarea(init_code);
  }  


var copyCodeButton = document.getElementById('copy_code');
var textarea = document.getElementById('wenben');


// 监听复制代码按钮
copyCodeButton.addEventListener('click', function() {


    textarea.select();
    document.execCommand('copy');
    alert('代码文本已成功复制到剪贴板！');
});  
