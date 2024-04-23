
//  把工具函数注入到网页
injectCustomJs();  

//初始化 插件本地存储变量 ‘show_div'

if (typeof window.localStorage.getItem('is_init') !== 'undefined') {
    console.log('window.localStorage.is_init 存在');
} else {
    console.log('window.localStorage.is_init 不存在,初始化 插件本地存储变量 ');

    // 将布尔值 false 存储到 localStorage 中
    window.localStorage.setItem('is_init', 'true');

    chrome.storage.local.set({ show_div: '显示' }, function () {
        if (chrome.runtime.lastError) {
            console.error("存储出现错误：" + chrome.runtime.lastError);
        } else {
            console.log("存储成功");
        }
    });
}


//-----------------------悬浮时的背景颜色

var element_hover_color='rgba(255, 0, 0, 0.5)';



// -------------------------------------------创建导航信息栏

function createNavbar() {
    // 获取当前网页的标题
    const pageTitle = document.title;

    // 创建导航栏元素
    const navbar = document.createElement('div');
    // navbar.classList.add('navbar2');
    navbar.id='daohanglan';
 

    
    // 创建导航栏文本元素
    const navText = document.createElement('span');
    navText.textContent = '骚神库元素语法自动显示插件';
    navText.id = 'show';
    

    
    
    // 将文本添加到导航栏中
    navbar.appendChild(navText);

    // 将导航栏添加到页面的 body 元素中
    document.body.insertBefore(navbar, document.body.firstChild);

    //初始化导航栏的位置
    togglePosition();


}

// ------------------------------------调用函数创建导航栏
createNavbar();




// -------------------------------工具函数

  //检查字符串是否为空
  function isBlankString(str) {
    return str.trim().length === 0;
}
// 检查是否包含特殊字符 
function containsString(str) {
    return str.includes('href') || str.includes('src');
}

//打印某个元素的所有属性值
function printElementAttributesAsString(element) {
    // 检查输入是否是一个元素
    if (!(element instanceof Element)) {
        console.error('输入必须是一个HTML元素');
        return;
    }

    // 获取元素的所有属性
    var attrs = element.attributes;

    // 初始化一个空字符串用于存储属性
    var attributesString = '';

    // 遍历所有属性并将它们的名称和值拼接到字符串中
    for (var i = 0; i < attrs.length; i++) {
        var attrName = attrs[i].name;
        var attrValue = attrs[i].value;
        //特殊情况处理
        if (containsString(attrName)) continue;
        if (isBlankString(attrValue)) continue;
        // 如果使用了 element_hover_color 颜色，则跳过该属性
        if (attrName.includes('style') && attrValue.includes( element_hover_color )) continue;
        if (attrValue.length > 25 && attrName != "class") {
            attributesString += "@@" + attrName + "^" + attrValue.slice(0, 20);
        } else {
            // 拼接属性名和属性值，属性之间用空格分隔
            attributesString += "@@" + attrName + "=" + attrValue;
        }



    }

    // 打印最终的属性字符串
    //console.log(attributesString.trim()); // 使用trim()移除尾部的空格
    return attributesString.trim();
}

//打印某个元素的 精简属性值
function printElementAttributesAsString_simple(element) {
    // 检查输入是否是一个元素
    if (!(element instanceof Element)) {
        console.error('输入必须是一个HTML元素');
        return;
    }

    // 获取元素的所有属性
    var attrs = element.attributes;

    // 初始化一个空字符串用于存储属性
    var attributesString = '';
    if (element.hasAttribute('id')){
        attributesString = "@@id=" + element.id;
        return attributesString.trim();

    }
    if (element.classList.length > 0) {
        // 元素具有 class 属性
        let classValue = element.classList.value; // 获取所有 class 值，以字符串形式返回
        attributesString = "@@class=" + classValue;
        return attributesString.trim();
        
    }

    // 检查元素是否有innerText，并返回其值
    if (element.innerText !== null && element.innerText !== undefined) {
        let innerTextValue = element.innerText;
        attributesString = "@@text()=" + innerTextValue;
        return attributesString.trim();       
    }

  

    // 打印最终的属性字符串
    //console.log(attributesString.trim()); // 使用trim()移除尾部的空格
    return attributesString.trim();
}



//添加监听
function addClickEventToInputs() {
    // 获取所有输入框元素
    var inputElements = document.querySelectorAll('a,li,img,input,button');
    //var inputElements = document.querySelectorAll('*');
    window.ele_length = inputElements.length;
    // 暂存元素定位信息
    let info = "";
    var theEle = {style: {},elementRect: {left: 0, top: 0}};

    // 为每个输入框元素添加点击事件监听器
    inputElements.forEach(function (inputElement) {
        // 添加鼠标经过事件监听器
        inputElement.addEventListener('mouseover', function (event) {
            // 如果当前元素已经高亮，则取消高亮
            if ('backgroundColor' in theEle.style && theEle.style.backgroundColor == element_hover_color){   
                theEle.style.backgroundColor = '';
                theEle.style.border ='';
                // delete theEle.style; // 这句没效果
            }
            // 经过元素时给元素加个高亮
            this.style.backgroundColor = element_hover_color;
             // 修改元素的边框样式
            this.style.border = "1px solid green";
            // 暂存当前元素
            theEle = this;

            // 以下是获取元素定位语法功能
            var attrib_info = printElementAttributesAsString(inputElement);
            var attrib_info_simple = printElementAttributesAsString_simple(inputElement);

            var Name = "tag:" + inputElement.tagName.toLowerCase();

            var text = inputElement.innerText;
            
            
            if (isBlankString(text)) {
                text = "";
            } else {
                
                if (text.length <= 15) text = "@@text()=" + text;
                else text = "@@text()^" + text.slice(0,10);
                
            }
            
            window.XPath_info="xpath:"+getElementXPath(inputElement);
            
            window.anotherGlobalVar = Name + attrib_info + text; 
            window.anotherGlobalVar_simple = Name + attrib_info_simple;
            

            info ="<b>🔹按alt+1 复制XPath--></b>@@"+window.XPath_info+"<hr>"+ "<b>🔹按F2复制精简语法 <br>🔹按F8复制完整语法--></b>@@" + Name + attrib_info + text ;

            // info =info +"<hr>"+"<b>按alt+1 复制XPath--></b>@@"+window.XPath_info;
  

        });

    });
      
        // 监听鼠标移动事件
        document.addEventListener('mousemove', function(event) {

            // 设置 daohanglan 是否隐藏
            chrome.storage.local.get('show_div', function (result) {                
                if (chrome.runtime.lastError) {
                    // 处理错误的情况
                    console.error("发生错误：" + chrome.runtime.lastError);
                    
                } else {
                    
                        
                        if (result.show_div == '隐藏') {
                            document.getElementById('daohanglan').style.display = "none";
                        } else {
                            document.getElementById('daohanglan').style.display = "block";
                        }
                    
                }
            });
            
            // 边缘碰撞检测

            let daohanglan = document.getElementById("daohanglan");          
            
            
            setTimeout(function () {
          
                // 定义常量以避免重复的数字字面量
                const OFFSET = 300;
                const pianyi = 20;
                // 获取元素的宽度（包括边框、内边距和滚动条）
                let width = daohanglan.offsetWidth;

                // 获取元素的高度（包括边框、内边距和滚动条）
                let height = daohanglan.offsetHeight;

                
                if (event.clientX < window.outerWidth -width-40) {
                    // 根据 event.clientX 设置 daohanglan 元素的 left 属性                    
                    daohanglan.style.left = (event.clientX + pianyi) + "px";
                } else {                    
                    daohanglan.style.left =(event.clientX - pianyi-width) + "px";
                    
                }
                
                // daohanglan.style.top = (event.pageY + pianyi) + "px";
                if (event.pageY < window.outerHeight - height - 40) {                  
                    
                    daohanglan.style.top = (event.pageY + pianyi) + "px";
                } else {                  
                    
                    daohanglan.style.top = (event.pageY-pianyi -height) + "px";
                }               


                


            }, 0); // 延迟1000毫秒（即1秒）
              // 

            // 获取鼠标位置
            var mouseX = event.clientX + window.screenX;
            var mouseY = event.clientY + window.screenY;
            // 为了计算元素内坐标，获取当前元素的位置
         
            
            xyInfoDoc1 = "浏览器坐标 x:" + event.clientX + ",y:" + event.clientY + "<br>";
            xyInfoDoc2 = "屏幕坐标 x:" + mouseX + ",y:" + mouseY + "<hr>";
            
            // xyInfoEle = "元素内坐标 x:"+eleX+",y:"+eleY+"<hr>";

            // 将坐标信息、定位语法 显示到页面上 
            let F9_info='🔹按F9 刷新定位'+" 当前定位数:"+window.ele_length+"<hr>";
            
            

            document.getElementById('show').textContent = xyInfoDoc1+xyInfoDoc2 + F9_info + info;
            format_the_text();
        })
}

// -------------------格式化字符串

function format_the_text(){
      // 获取包含文本的 span 元素
      let spanElement = document.getElementById('show');

      // 获取 span 元素内的文本内容
      let textContent = spanElement.textContent;

      // 使用 @@ 进行分割
      let lines = textContent.split('@@');

      // 创建一个新的文本内容
      let newContent = '';
      lines.forEach(function(line, index) {
          // 添加换行符
          if (index > 0) {
              newContent += '<br>';
          }
          // 添加当前行文本
          newContent += line;
      });

      // 更新 span 元素的内容为新的文本内容
      spanElement.innerHTML = newContent;
}



// ----------------初次加载 调用一次解析函数
addClickEventToInputs();

// ----------------获取到元素相对于电脑显示器的坐标
function getElementAbsolutePosition(ele) {
    // 获取元素
    // let element = ele;

    if (!ele) {
        console.error("未找到指定ID的元素");
        return null;
    }

    // 获取元素相对于视口的位置
    var rect = ele.getBoundingClientRect();

    // 计算元素相对于电脑显示器的坐标
    var x = rect.left + window.scrollX;
    var y = rect.top + window.scrollY;

    return { x: x, y: y };
}


// ----------------监听导航栏 进行位置变换
document.getElementById("daohanglan").addEventListener("click", function() {
    
    togglePosition();
    // alert(" 你切换了 元素语法信息导航栏  的位置");
    
    
});








// 监听F2 F8  F9 按键  alt +1
document.addEventListener('keydown', function(event) {
    // 检查是否按下了f8键（keyCode为18）
    if (event.keyCode === 119) {
        // 打印当前网页标题
        //console.log('Current page title: ' + document.title);
        extractInfoAndAlert();

    }
    // 检查是否按下了f2键
    if (event.keyCode === 113) {
        // 打印当前网页标题
        //console.log('Current page title: ' + document.title);
        extractInfoAndAlert_simple();

    }
    // 检查是否按下了f9键（keyCode为120）  
    if (event.keyCode === 120) {
        // 打印当前网页标题
        addClickEventToInputs();
        alert('-✔️骚神库元素定位插件- \n 你按下了F9键\n 插件已经深度解析，重新定位动态元素!!');
    }

    if (event.altKey && (event.key === "1" || event.keyCode === 49)) {
        // 在这里执行按下 alt + 1 后的操作
        copyElementXPath();
        copyToClipboard(window.XPath_info);
      }

});




// 获取元素的XPath
function getElementXPath(element) {
    if (element && element.id) {
        return 'id("' + element.id + '")';
    } else {
        let paths = [];
        for (; element && element.nodeType == Node.ELEMENT_NODE; element = element.parentNode) {
            let index = 0;
            let siblings = element.parentNode.childNodes;
            for (let i = 0; i < siblings.length; i++) {
                let sibling = siblings[i];
                if (sibling == element) {
                    index++;
                    break;
                }
            }
            let tagName = element.nodeName.toLowerCase();
            let pathIndex = (index ? "[" + (index+1) + "]" : "");
            paths.splice(0, 0, tagName + pathIndex);
        }
        return paths.length ? "/" + paths.join("/") : null;
    }
}

// 复制元素的XPath
function copyElementXPath() {
    alert("✔️已经复制下面XPath语法到剪贴板 \n"+window.XPath_info);

}


            
//  提取元素语法内容 并弹窗提示
function extractInfoAndAlert(){
    

    // var tishi2=document.getElementById('show').textContent.substring(13)
    tishi2=window.anotherGlobalVar;
    copyToClipboard(tishi2);
    
    alert('✔️已经复制该语法到剪贴板  '+tishi2);

}
function extractInfoAndAlert_simple(){
    

    // var tishi2=document.getElementById('show').textContent.substring(13)
    let tishi2=window.anotherGlobalVar_simple;
    copyToClipboard(tishi2);
    
    alert('✔️已经复制该精简语法到剪贴板  '+tishi2);

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


//  切换导航栏位置
function togglePosition() {
    var daohanglan = document.getElementById("daohanglan");

    if (daohanglan.style.left !== '') {
        daohanglan.style.removeProperty('left');
        daohanglan.style.right = "0px";
        
        
    } else {
        daohanglan.style.removeProperty('right');
        daohanglan.style.left = "0px";
        

    }
}


// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.runtime.getURL(jsPath);
    temp.onload = function() {
      // 放在页面不好看，执行完后移除掉
      this.parentNode.removeChild(this);
    };
    document.body.appendChild(temp);
  }

 


// ------------------遮罩层类
class OverlayElement {
    constructor() {
        // 创建遮罩层元素
        this.element = document.createElement('div');
        this.element.id = 'over_lay';
        // 将遮罩层添加到 body 中
        document.body.appendChild(this.element);
        // 设置默认样式
        this.setStyle();
        // 设置监听
        this.element.addEventListener('click', () => this.setHide());
    }

    // 设置默认样式
    setStyle() {
        // 设置定位方式
        this.element.style.position = 'fixed';
        // 设置左侧位置
        this.element.style.right = '0';
        // 设置顶部位置
        this.element.style.top = '0';
        // 设置背景颜色和透明度
        this.element.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        // 设置初始隐藏
        this.element.style.display = 'none';
        // 设置宽度为全屏
        this.element.style.width = '100%';
        // 设置高度为全屏
        this.element.style.height = '100%';
        this.element.style.zIndex = 1999;
        this.element.style.justifyContent= 'center';
        this.element.style.alignItems ='center';
    }

    // 显示遮罩层
    setShow(){
        this.element.style.display = 'flex'; 
    }
    // 隐藏遮罩层
    setHide(){
        this.element.style.display = 'none'; 
    }
    // 切换
    switch_show_hide(){
        if(this.element.style.display == 'none'){
            this.setShow();
        }else{
            this.setHide();
        }
    }
    setInnerHtml(txt){
        this.element.innerHTML=txt;
    }

    // 设置点击事件
    setOnClick(func) {
        // 给遮罩层添加点击事件处理函数
        this.element.onclick = func;
    }
}



// 创建对象
const overlay = new OverlayElement();
let txt = `
<div><iframe id="code_helper" src="chrome-extension://gfclfobkiiceiekgmbdfbcnapbcdhhph/code_helper.html" width="900" height="700" frameborder="0"></iframe></div>
`;
overlay.setInnerHtml(txt);
// overlay.setShow();



// 切换显示信息展示栏
  function info_show_switch() {
    chrome.storage.local.get('show_div', function (result) {
        var newState = (result.show_div === '隐藏') ? '显示' : '隐藏';

        chrome.storage.local.set({ show_div: newState }, function () {
            console.log('信息栏- ' + newState );
            alert('信息展示栏已经' + newState);
        });
    });
}


  //----------------侧边栏按钮类

  class CustomElement {
    constructor() {
      this.element = document.createElement('button');
      this.element.id='cebianlan_Button';
      document.body.appendChild(this.element);
      this.setStyle(); // 设置默认样式
    }
  
    // 设置默认样式
    setStyle() {
      this.element.style.border = '1px solid black'; // 默认边框线    
      this.element.style.position = 'fixed'; // 默认定位方式
      this.element.style.right = '0'; // 默认 left 位置
      this.element.style.top = '0'; // 默认 top 位置
      this.element.style.zIndex=2000; // 始终显示到最前面
      this.element.style.fontSize='15px';
      this.element.style.padding='5px';  //内边距
    }
  
    // 修改边框线样式
    setBorder(borderStyle) {
      this.element.style.border = borderStyle;
    }
  
    // 修改背景色
    setBackgroundColor(color) {
      this.element.style.backgroundColor = color;
    }
  
    // 修改内容
    setText(text) {
    //   this.element.innerText = text;
      this.element.innerHTML = text;
    }
  
    // 修改位置
    setPosition(right, top) {
      this.element.style.right = right;
      this.element.style.top = top;
    }
    // 
    setOnClick(func) {
      this.element.onclick = function() {
        // 在这里编写按钮点击后要执行的代码        
        func();
        
      };
    }
    switch_overlay(){
      overlay.switch_show_hide(); 
    }

  }
  
  // 使用示例
  var newElement = new CustomElement();

  newElement.setText('元<br>素<br>定<br>位<br>开<br>关');
  newElement.setPosition('0px', '200px');
  newElement.setOnClick(info_show_switch);

  var newElement2 = new CustomElement();

  newElement2.setText('代<br>码<br>助<br>手<br>开<br>关');
  newElement2.setPosition('0px', '350px');
  newElement2.setOnClick(newElement2.switch_overlay);
