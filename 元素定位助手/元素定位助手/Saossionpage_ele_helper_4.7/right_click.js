

  
   //-------------------------------------- 创建一个 右键快捷菜单div   
    
   var menu_div = document.createElement('div');
   menu_div.id = 'caidan';
     // 设置要添加的innerHtml内容
     var innerHtmlContent = `
       <table id="myTable"    >
           <tbody>
               <tr>
                   <td id="dp"  onclick="to_DP_path()" >复制 DrissionPage 语法</td>
               </tr>
               <tr>
                   <td id="xpath" onclick="to_xpath()" >复制 XPath 语法</td>
               </tr>
               <tr>
                   <td id="css"  onclick="to_CSS_path()">复制CSS的语法</td>
               </tr>
               <tr>
                   <td id="help_center"  onclick="to_show_help()">按键帮助</td>
               </tr>
        
           </tbody>
       </table>
   `;


   menu_div.innerHTML=innerHtmlContent;

   document.body.appendChild(menu_div); 
   
   menu_div.classList.add("hidden");//隐藏 div标签
   menu_div.style.zIndex = '5000'; // 确保在页面上方显示




 // -------------------------------------------工具函数

    document.addEventListener('click', function (event) {
    if (event.button === 0  ) {
        if(!menu_div.classList.contains("hidden"))  menu_div.classList.add("hidden");
        
    }
});



//弹出菜单

    function toggleMenu(x,y) {

        menu_div.style.top = y + 'px';
        menu_div.style.left = x + 'px';
        if (menu_div.classList.contains("hidden")) {
                            // 如果第二个按钮已经被隐藏，显示它

            menu_div.classList.remove("hidden");


        } 
    }





    // ----------------------------监听alt和鼠标右键 是否被同时按下
    var altKeyPressed = false;

    document.addEventListener('mousedown', function (e) {
        if (e.button === 2 && altKeyPressed) {
            e.preventDefault(); // 阻止默认的右键菜单弹出
            toggleMenu(e.clientX, e.clientY); // 调用 toggleDIV() 函数
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Alt') {
            altKeyPressed = true;
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.key === 'Alt') {
            altKeyPressed = false;
        }
    });   







   



