// 骚神库 DP_helper


//----------封装主函数
class MainApp{
    constructor() {
        this.init();

    }

    async init(){     

     var self=this;

     this.createNavbar();//调用函数创建导航栏  默认隐藏
     this.toggleDiv();
     
     
     // ----------------监听导航栏 进行位置变换
     $('#daohanglan').on('click', function() {
         togglePosition();
     });
     

     this.listen_mousemove_to_update_div(); //监听鼠标移动


     // 监听按键   F2 F8  F9  alt+1
     $(document).keydown(function(event) {
         switch (event.keyCode) {
             case 119: // F8键
                 self.extractInfoAndAlert();
                 break;
             case 113: // F2键
                 self.extractInfoAndAlert_simple();
                 break;
             case 120: // F9键
                 alert('-✔️骚神库元素定位插件- \n 网页已经刷新定位\n 插件已经深度解析，重新定位动态元素!!');
                 break;
             case 49: // 数字键1
                 if (event.altKey) {
                     self.copyElementXPath();
                 }
                 break;
         }
     });
    }


        // -------------------------------------------创建导航信息栏
    
         createNavbar() {
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
            this.togglePosition();
   
        }
        // -------------切换div隐藏
        async  toggleDiv(){
            chrome.storage.local.get('show_div', function (result) {
                var newState = result.show_div ;
                
                if (newState == '隐藏') {
                    document.getElementById('daohanglan').style.display = "none";
                } else {
                    document.getElementById('daohanglan').style.display = "block";
                }
            });
            
        }

        
    // -------------------------------工具函数
    
    // 是否是空字符
    isBlankString(str) {
        if (str && typeof str === 'string') {
            return str.trim().length === 0;
        } else {
            return true;  // 将空值、null 和 undefined 视为“空字符串”
        }
    }
    
    // 检查是否包含特殊字符 
    containsString(str) {
        return str.includes('href') || str.includes('src');
    }
    
    //打印某个元素的所有属性值
    printElementAttributesAsString(element) {
        // 初始化一个空字符串用于存储属性
        var attributesString = '';

        // 检查输入是否是一个元素
        if (!(element instanceof Element)) {
            // console.error('输入必须是一个HTML元素');
            return '当前位置无法解析元素';
        }
    
        // 获取元素的所有属性
        var attrs = element.attributes;
    
    
        // 遍历所有属性并将它们的名称和值拼接到字符串中
        for (var i = 0; i < attrs.length; i++) {
            var attrName = attrs[i].name;
            var attrValue = attrs[i].value;
            //特殊情况处理
            if (this.containsString(attrName)) continue;
            if (this.isBlankString(attrValue)) continue;
            // 如果使用了 element_hover_color 颜色，则跳过该属性
            if (attrName.includes('style') && attrValue.includes( this.element_hover_color )) continue;
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
    printElementAttributesAsString_simple(element) {
        // 检查输入是否是一个元素
        if (!(element instanceof Element)) {
            console.log('输入必须是一个HTML元素');
            return '必须是一个HTML元素';
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

     
   
    // 提取某个元素的属性信息
     async extract_attri_info_to_div(inputElement) {
        // 暂存元素定位信息
        let info = "";
        var theEle = { style: {}, elementRect: { left: 0, top: 0 } };

        // inputElement.addEventListener('mouseover', function() { this.style.backgroundColor ='';this.style.fontWeight = 'bold';});
        // inputElement.addEventListener('mouseout', function() { this.style.backgroundColor ='';this.style.fontWeight = 'normal';});
        if (!(inputElement instanceof Element)) {
            console.log('输入必须是一个HTML元素');
            window.info='当前位置是非元素'
            return ;
        }



       
        // 暂存当前元素
        theEle = this;
        let self=this;

        // 以下是获取元素定位语法功能
        var attrib_info = self.printElementAttributesAsString(inputElement);
        var attrib_info_simple = self.printElementAttributesAsString_simple(inputElement);

        var Name = "tag:" + inputElement.tagName.toLowerCase();

        var text = inputElement.innerText;


        if (self.isBlankString(text)) {
            text = "";
        } else {

            if (text.length <= 15) text = "@@text()=" + text;
            else text = "@@text()^" + text.slice(0, 10);

        }

        window.XPath_info = "xpath:" + self.getElementXPath(inputElement);

        window.anotherGlobalVar = Name + attrib_info + text;
        window.anotherGlobalVar_simple = Name + attrib_info_simple;

        window.info = "<b>🔹按alt+1 复制XPath--></b>@@" + window.XPath_info + "<hr>" + "<b>🔹按F2复制精简语法 <br>🔹按F8复制完整语法--> </b>@@" + Name + attrib_info + text;


    }

 
  
    sleep(ms) {
        // 创建一个新的Promise对象，并将resolve作为回调函数传入
        return new Promise(resolve => setTimeout(resolve, ms));
      // 调用setTimeout函数，设置延迟时间为ms毫秒，延迟时间结束后调用resolve回调函数
      }

    //------------监听鼠标移动
     listen_mousemove_to_update_div(){
        let self=this;
        document.addEventListener('mousemove', async function(event) {
            //提取信息
            var hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
            

            // await self.sleep(1000);

            await self.extract_attri_info_to_div(hoveredElement);
            

       
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
        
            // 获取鼠标位置
            var mouseX = event.clientX + window.screenX;
            var mouseY = event.clientY + window.screenY;
            // 为了计算元素内坐标，获取当前元素的位置
         
            
            var xyInfoDoc1 = "浏览器坐标 x:" + event.clientX + ",y:" + event.clientY + "<br>";
            var xyInfoDoc2 = "屏幕坐标 x:" + mouseX + ",y:" + mouseY + "<hr>";
            
            // xyInfoEle = "元素内坐标 x:"+eleX+",y:"+eleY+"<hr>";
        
            // 将坐标信息、定位语法 显示到页面上 
            var F9_info='🔹按F9 刷新定位'+"<hr>";              
            
        
            document.getElementById('show').textContent = xyInfoDoc1+xyInfoDoc2 + F9_info + window.info;




            // 获取包含文本的 span 元素
            let spanElement = document.getElementById('show');
        
            // 获取 span 元素内的文本内容
            let textContent = spanElement.textContent;
        
            // 使用 @@ 进行分割
            let lines = textContent.split('@@');
        
            // 创建一个新的文本内容
            let newContent = '';
            lines.forEach(function(line, index) {
                if (line.includes('tag')) {
                    line = 'tag:<span style="color:black"><b>' + line.split(':')[1] + '</b></span>';
                }
                // 添加换行符
                if (index > 0) {
                    newContent += '<br>';
                }
                // 添加当前行文本
                newContent += line;
            });
        
            // 更新 span 元素的内容为新的文本内容
            spanElement.innerHTML = newContent;

            
            

        });
        
    
    }  
    // -------------------格式化字符串    


    format_the_text(id){
          // 获取包含文本的 span 元素
          let spanElement = document.getElementById(id);
    
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
        // ----------------获取到元素相对于电脑显示器的坐标
        getElementAbsolutePosition(ele) {
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

      
    

        
    // 获取元素的XPath
    getElementXPath(element) {
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
    copyElementXPath() {
        this.copyToClipboard(window.XPath_info);
        alert("✔️已经复制下面XPath语法到剪贴板 \n"+window.XPath_info);
    
    }
    
      
                
    //  提取元素语法内容 并弹窗提示
    extractInfoAndAlert(){

        let tishi2=window.anotherGlobalVar;
        this.copyToClipboard(tishi2);
        
        alert('✔️已经复制该语法到剪贴板  \n'+tishi2);
    
    }
    extractInfoAndAlert_simple(){ 
    
        let tishi2=window.anotherGlobalVar_simple;
        this.copyToClipboard(tishi2);
        
        alert('✔️已经复制该精简语法到剪贴板  \n'+tishi2);
    
    }
    
    extractInfoAndAlert_simple_input(){ 
        let result = prompt("输入框里要输入的内容:", "1234");
        if (result !== null) {
            // 用户点击了确认按钮，result 是用户输入的值
            var tishi2=`page.ele('${window.anotherGlobalVar_simple}').input('${result}')`  ;
            this.copyToClipboard(tishi2);
        } else {
            // 用户点击了取消按钮或关闭了对话框
        }
        
        alert('✔️已经复制该精简语法到剪贴板  \n'+tishi2);
    
    }

    execute_js() {
        let result = prompt("输入你要执行的js语句:", "alert('123');");
        if (result !== null && result.trim() !== "") {
            try {
                // 使用 try...catch 捕获可能出现的错误
                eval(result);
            } catch (error) {
                // 如果执行出错，显示错误信息
                alert('执行出错：' + error);
            }
        } else {
            // 用户点击了取消按钮或输入为空
            alert('执行不成功！');
        }
    }
    
    extractInfoAndAlert_simple_click(){
    
        let tishi2=`page.ele('${window.anotherGlobalVar_simple}').click()`  ;
        this.copyToClipboard(tishi2);
    
        alert('✔️已经复制该精简语法到剪贴板  \n'+tishi2);
    
    }

       
    
    //  复制到剪贴板操作
    copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }
    
    
    //  切换导航栏位置
    togglePosition() {
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
    injectCustomJs(jsPath) {
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
  



      // 获取当前网页中所有的图片元素
       getAllImageLinksTo(id) { 
        const images = this.getElementsByName(['img','source','audio']);
        // const images = document.getElementsByTagName('img');
        
        // 创建一个空数组来存储图片链接地址
        const imageLinks = [];
        
        // 遍历所有图片元素，提取图片链接地址并添加到数组中
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const src = image.src; // 获取图片链接地址
            imageLinks.push(src); // 将链接地址添加到数组中
        }
        
        // 获取 id 为 'img_url' 的 div 元素
        let div = document.getElementById('img_url');
        
        // 如果该 div 元素不存在，则创建一个新的 div 元素
        if (!div) {
            div = document.createElement('div');
            div.id = 'img_url'; // 设置 div 元素的 id 属性为 img_url
            document.getElementById(id).appendChild(div); // 将新创建的 div 元素插入到指定 id 的父元素中
        }
        
        // 获取该 div 中已存在的所有链接
        const existingLinks = div.querySelectorAll('a');
        const existingLinkUrls = Array.from(existingLinks).map(link => link.href);
        
        // 将图片链接转换成带链接的 <a> 标签并添加到 div 元素中（如果链接不存在）
        imageLinks.forEach(link => {
            if (!existingLinkUrls.includes(link)) {
                const a = document.createElement('a');
                a.href = link; // 设置 <a> 标签的 href 属性为图片链接地址
                //  设置 <a> 标签的文本内容为图片链接地址 ☑️
                if(link.includes('.mp4')) {a.textContent = '🔷 ' + link;} 
                else if(link.includes('.m4a')){a.textContent = '🔶 ' + link;}
                else{a.textContent = '✅* ' + link;}
               
                
                a.target = '_blank';
                div.appendChild(a); // 将 <a> 标签添加到 div 元素中
                div.appendChild(document.createElement('br')); // 添加一个换行
            }
        });       


        // 返回图片链接数组（可选）
        return imageLinks;
    }

    getElementsByName(tagNames) {
        let elements = [];
    
        // 遍历标签名称数组
        tagNames.forEach(tagName => {
            // 获取指定标签名称的所有元素
            const elems = Array.from(document.getElementsByTagName(tagName));
            // 将获取到的元素数组合并到结果数组中
            elements = elements.concat(elems);
        });
    
        return elements;
    }

    
 download_video() {
    // 获取包含 shadow root 的元素
    const toolbarShadow = document.getElementById('video_download_toolbar_shadow');
  
    // 如果找到了元素
    if (toolbarShadow) {
      // 获取 shadow root
      const shadowRoot = toolbarShadow.shadowRoot;
  
      // 如果存在 shadow root
      if (shadowRoot) {
        // 在 shadow root 中查询所有 img 元素
        const imgElements = shadowRoot.querySelectorAll('img');
  
        // 遍历所有的 img 元素
        imgElements.forEach(imgElement => {
          // 获取每个 img 元素的 src 属性
          const src = imgElement.getAttribute('src');
          // 检查 src 属性中是否包含 'download' 字符串
          if (src.includes('download')) {
            // 如果包含，执行点击操作
            imgElement.click();
          }
          console.log(src);
        }
        );
      }
    } else {
      console.log('没有找到下载按钮！')
      alert('该功能仅适用于 星愿浏览器！！')
    }
  
  }


}

 //创建主程序对象 
 var main_app=new MainApp(); 
    
    
    // ------------------遮罩层类
    class OverlayElement {
        constructor(id,iframe_src) {
            // 创建遮罩层元素
            this.element = document.createElement('div');
            
            this.element.id = id;
            // 将遮罩层添加到 body 中
            document.body.appendChild(this.element);
            // 设置默认样式
            this.setStyle();
            // 设置点击事件监听器
            this.element.addEventListener('click', () => this.switch_show_hide());
            // 获取插件id
            this.pluginId=chrome.runtime.id;
            this.iframeSrc=chrome.runtime.getURL('code_helper.html');
            // 设置遮罩层内嵌的网页
            this.iframeID=id+'_iframe';
            this.iframeInnerText = `
            <div id="sao_f" style="height: 100%; width: 50%; position: fixed; border-radius: 10px;">
                <iframe src="${iframe_src}" width="100%" height="100%" frameborder="0"></iframe>
            </div>
                `;
        
            this.isFisrtInit=true;          
   
        }
    
        // 设置默认样式
        setStyle() {
            Object.assign(this.element.style, {
                position: 'fixed',
                right: '0',
                top: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'none',
                width: '100%',
                height: '100%',
                zIndex: 1999,
                // justifyContent: 'center',
                // alignItems: 'center'
            });
        }
    
        // 切换显示/隐藏状态
        switch_show_hide() {
            // this.element.style.display = this.element.style.display === 'none' ? 'flex' : 'none';        

            // $(this.element).slideToggle("slow");
            if(this.isFisrtInit){
                this.element.innerHTML =this.iframeInnerText;
                this.isFisrtInit=false;
                 //iframe 可以自由缩放拖动   
                $(function() { $('#sao_f').resizable();});
            }
            // console.log('first init ?'+this.isFisrtInit);

            $(this.element).toggle('slide', {direction: 'left'}, 600); //需要加载jQuery-ui库

        }

     
    }
    
    
    
    
    // 创建遮罩层对象
    var overlay = new OverlayElement('overlay',chrome.runtime.getURL('code_helper.html'));
    // overlay.setIframeSrc(chrome.runtime.getURL('code_helper.html'));
    
    
    
    // 创建遮罩层对象
    var overlay2 = new OverlayElement('overlay2','https://drissionpage.cn/search');

    
    var overlay4 = new OverlayElement('overlay4',chrome.runtime.getURL('AI.html'));
    var overlay3 = new OverlayElement('overlay3','https://wxhzhwxhzh.github.io/saossion_code_helper_online/vip/index.html');

    var overlay5 = new OverlayElement('overlay5','https://wxhzhwxhzh.github.io/saossion_code_helper_online/jiaoxue/index.html');
  
    // 输出插件的 ID
    console.log(overlay.pluginId);   
   
    
    
    
    // 切换显示信息展示栏
      function info_show_switch() {
        chrome.storage.local.get('show_div', function (result) {
            var newState = (result.show_div === '隐藏') ? '显示' : '隐藏';
            
            if (newState == '隐藏') {
                document.getElementById('daohanglan').style.display = "none";
            } else {
                document.getElementById('daohanglan').style.display = "block";
            }
    
            chrome.storage.local.set({ show_div: newState }, function () {
                console.log('信息栏- ' + newState );
                // alert('信息展示栏已经' + newState);
                AutoDismissAlert('元素信息浮窗 已经' + newState,1000);
            });
    
    
            });
        }
    
    
      
      
// 万能侧边栏圆形按钮  <span id='sao_txt'>骚</span>

var side_button_code = `

    <div id='yuananniu' class="yuananniu" title="开关">
        
        <ul id="lyrics-list">
            <li>骚</li>
            <li>神</li>
            <li>库</li>
            
            
        </ul>
        <div class="sao-dropdown-menu">
            <div id="sao1" class="sao-dropdown-item">元素浮窗开关</div>
            <div id="sao3" class="sao-dropdown-item">信息浮窗开关</div>
            <div id="sao4" class="sao-dropdown-item">复制cookie</div>
            <div id="sao5" class="sao-dropdown-item">复制UA</div>
            <div id="sao7" class="sao-dropdown-item">指纹检测</div>
            
            <div id="sao2" class="sao-dropdown-item">启动代码生成</div>
            <div id="sao_video" class="sao-dropdown-item">视频解析</div>
            <div id="sao9" class="sao-dropdown-item">官方文档速查</div>
            <div id="sao10" class="sao-dropdown-item">实战代码教学</div>
            
            <div id="sao11" class="sao-dropdown-item">ChatGPT</div>
            
        </div>
    </div>


    `
    var side_button=document.createElement('div');
    side_button.id='cebianlan';
    side_button.innerHTML=side_button_code;

    document.body.appendChild(side_button);

    $('#sao1').click(function() {
        info_show_switch();
    });

    $('#sao2').click(function() {       

        overlay.switch_show_hide();
    });

    $('#sao3').click(function() {
        let xuanfu_chuang = $('#floatingWindow');
        xuanfu_chuang.toggle();
    });

    $('#sao4').click(function() {
        main_app.copyToClipboard(document.cookie);
        alert('网页的cookie已经复制到剪贴板 \n' + document.cookie);
    });

    $('#sao5').click(function() {
        main_app.copyToClipboard(navigator.userAgent);
        alert('网页的UA已经复制到剪贴板 \n' + navigator.userAgent);
    });



    $('#sao7').click(function() {
        window.open("https://ip77.net/", "_blank");
    });

    $('#sao_video').click(function() {
        overlay3.switch_show_hide();
      
    });
    
    $('#sao9').click(function() {        
        overlay2.switch_show_hide();
    });

    $('#sao10').click(function() {
       overlay5.switch_show_hide();
      
    });

    $('#sao11').click(function() {        
        overlay4.switch_show_hide();
    });
    




    
    // 变成可拖拽的按钮  对话框的浮窗
    $(function() {
        $("#yuananniu").draggable();
        $( "#floatingWindow" ).draggable();
        $(".sao_iframe").resizable();

      });
      
// 调用函数设置悬浮窗
setupFloatingWindow();      
// 创建和配置悬浮窗
function setupFloatingWindow() {
    // 创建悬浮窗
    var $floatingWindow = $('<div>', {
        class: 'floating-window',
        id: 'floatingWindow'
    });

    // 创建标题栏
    var $titleBar = $('<div>', {
        class: 'title-bar',
        id: 'titleBar',
        text: '信息浮窗(可拖动)'
    });

    // 创建关闭按钮
    var $closeBtn = $('<span>', {
        class: 'close-btn',
        id: 'closeBtn',
        html: '&nbsp;&nbsp;X'
    });

    // 添加关闭按钮到标题栏
    $titleBar.append($closeBtn);

    // 点击关闭按钮隐藏浮窗
    $closeBtn.on('click', function() {
        $floatingWindow.hide();
    });

   // 创建内容区域
    var $content = $('<div>', {
        id: 'float_content',
        class: 'content',
        html: $('#daohanglan').html() // 使用html()方法获取元素的内容
    }).css("user-select", "text");
    // 将标题栏和内容区域添加到浮窗
    $floatingWindow.append($titleBar).append($content);

    // 将浮窗添加到body中
    $floatingWindow.hide().appendTo('body');
    // 更新内容
    setInterval(() => {
        $('#float_content').html($('#daohanglan').html());
        

    }, 300);
    
}



function startLyricsScrolling(ulId) {
    var lyricsContainer = $('#' + ulId).parent();
    var lyricsList = $('#' + ulId + ' li');

    var index = 0;
    var length = lyricsList.length;
    lyricsList.fadeOut(10);

    function scrollLyrics() {
        lyricsList.eq(index).fadeOut(1000, function() {
            index = (index + 1) % length;
            lyricsList.eq(index).fadeIn(1000);
        });
    }
   

    // var scrollInterval = setInterval(scrollLyrics, 2000); 

    // 当鼠标悬停在歌词容器上时，停止滚动
    lyricsContainer.on('mouseleave', function() {
        clearInterval(scrollInterval);
    });

    // 当鼠标离开歌词容器时，恢复滚动
    lyricsContainer.on('mouseenter', function() {
        scrollInterval = setInterval(scrollLyrics, 2000);
    });

    
    // lyricsList.eq(2).fadeIn(10);
    // 初始化第一行歌词的淡入
    lyricsList.eq(0).fadeIn(1000);
    
}
// 调用函数来启动歌词滚动效果
// $('#lyrics-list').fadeOut('fast');
startLyricsScrolling('lyrics-list');









