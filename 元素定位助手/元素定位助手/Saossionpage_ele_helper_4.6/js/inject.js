 
function to_xpath() {
    
    console.log('已复制该元素XPath定位语法');
    extractInfoAndAlert();           
}



function to_CSS_path() {
    
    console.log('已复制该元素css定位语法');
    extractInfoAndAlert();           
}            

function to_DP_path() {
    
    console.log('已复制该元素dp定位语法');
    
    
    extractInfoAndAlert();
        
};


function to_show_help(){
    let helpInfo=" 1.按住 ALT ，右键单击元素会弹出快捷菜单 \n 2.单击信息实时显示栏 会切换显示栏位置 \n 3.按F8 直接复制鼠标所在位置的元素语法 "
    alert(helpInfo);
}


            
//  提取元素语法内容 并弹窗提示
function extractInfoAndAlert(){
    // tishi=document.getElementById('show').textContent;

    var tishi2=document.getElementById('show').textContent.substring(13)
    copyToClipboard(tishi2);
    
    alert('已经复制该语法到剪贴板  '+tishi2);

}





//  复制到剪贴板操作
function copyToClipboard(text) {
    var tempInput = document.createElement("input"); // 创建临时输入框元素

    tempInput.value = text; // 将输入的文本赋给临时输入框
    document.body.appendChild(tempInput); // 将临时输入框添加到页面中

    tempInput.select(); // 选中临时输入框中的文本
    document.execCommand("copy"); // 执行复制操作

    document.body.removeChild(tempInput); // 删除临时输入框
}