
var code_frame =`
#!/usr/bin/env python
# -*- coding:utf-8 -*-
#title

# DrissionPage 库 文档地址 http://g1879.gitee.io/drissionpagedocs/

#-导入库
from DrissionPage import ChromiumPage,ChromiumOptions


#-配置类
class Config:    
    UA_android="Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36"
    UA_apple="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"


#-创建配置对象
co=ChromiumOptions()

#-启动配置
#端口
#代理地址
#UA
#静音

#-创建浏览器
page = ChromiumPage(addr_or_opts=co)

#-设置文件下载目录 默认是当前目录
page.set.download_path(".")

#cookie
#-打开网址

#启动网址

test=input('继续 ?')
  
`  


var init_ConfigDict = {  
  'title':"#骚神",
  '端口':'',
  '静音':'',
  'UA':'',
  '代理地址':'',
  '启动网址':'page.get("http://gitee.com")',
  'cookie':''
  
};


var resultCode=''

// 创建一个配置字典的对象
var ConfigDict = init_ConfigDict;

//工具函数

function writeToTextarea(character) {
    var textarea = document.getElementById('wenben');
    textarea.value = character;
  }

 function update_resultCode_from(dic){
   resultCode=code_frame;
  for(let k in dic){
    resultCode=resultCode.replace('#'+k,dic[k])
  }
  writeToTextarea(resultCode);

 } 

 

// 初始化 代码生成文本框
if (document.getElementById('wenben').value === '空的') update_resultCode_from(init_ConfigDict) ;


var copyCodeButton = document.getElementById('copy_code');
var textarea = document.getElementById('wenben');


// 监听复制代码按钮
copyCodeButton.addEventListener('click', function() {


    textarea.select();
    document.execCommand('copy');
    alert('代码文本已成功复制到剪贴板！');
});  

//实时更新时间
function updateDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1; // 月份是从 0 开始计数的，所以需要加 1
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  
  var dateTimeString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  
  
}






// 获取文本框或者输入框的值
function getTextValue(id) {
  var textBoxValue = document.getElementById(id).value;
  return textBoxValue;
}

// 获取复选框的值
function getCheckboxValue(id) {
  var checkbox = document.getElementById(id);
  var checkboxValue = checkbox.checked;
  return checkboxValue;
}

// 获取下拉框的值
function getSelectValue(id) {
  var selectElement = document.getElementById(id);
  var selectedText = selectElement.options[selectElement.selectedIndex].text;
  // var selectValue = select.value;
  return selectedText;
}

function update_config_dict(){
  let duankou=getTextValue('set_port');
  let url=getTextValue('set_url');
  let cookie=getTextValue('set_cookie');
  let  proxy=getTextValue('set_proxy');
  let  ua=getSelectValue('ua')

              
  if(duankou.length>0 )ConfigDict['端口']= `co.set_local_port(${duankou})`;            
  if(url.includes('http') ) ConfigDict['启动网址']= `page.get("${url}")`;            
  if(proxy.includes('http') ) ConfigDict['代理地址']= `co.set_proxy("${proxy}")`;            
  if(cookie.includes('=') ) ConfigDict['cookie']= `page.set.cookies(r"${cookie}")`;            
  if(ua.includes('安卓') ) ConfigDict['UA']= `co.set_user_agent(Config.UA_android)`;            
  if(ua.includes('苹果') ) ConfigDict['UA']= `co.set_user_agent(Config.UA_apple)`;            
             
}




//监听 刷新按钮 写入代码框
document.getElementById('shengcheng').addEventListener('click', function () {
  update_config_dict();
  textarea.value='代码重新生成中...';
  setTimeout(() => {
    update_resultCode_from(ConfigDict);
    
  }, 1000);
  
   
  
});  


//监听 show_config按钮 
document.getElementById('show_config').addEventListener('click', function () {
  update_config_dict();
  let info='';
  for( let k in ConfigDict){
    if (k !='code')   info += k+ ": "+ConfigDict[k]+'\n';    

  }
  alert(info);
  
});  

//监听 reset_config按钮 
document.getElementById('reset_config').addEventListener('click', function () {
  // 刷新当前页面
  location.reload();

});  