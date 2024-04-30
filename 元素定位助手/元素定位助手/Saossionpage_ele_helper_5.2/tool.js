
//  自动消失的提示框
function AutoDismissAlert(message, duration) {
    // 创建提示框元素
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.style.position = "fixed";
    alertBox.style.top = "50%";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translate(-50%, -50%)";
    alertBox.style.padding = "15px";
    alertBox.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    alertBox.style.color = "#fff";
    alertBox.style.borderRadius = "5px";
    alertBox.style.zIndex = "9999";
    alertBox.style.fontSize = "30px"; // 设置字体大小为 20px

    // 将提示框添加到页面中
    document.body.appendChild(alertBox);

    // 设置定时器，在指定的停留时间后自动移除提示框
    setTimeout(function() {
        alertBox.remove();
    }, duration);
}


var init_code =`
#!/usr/bin/env python
# -*- coding:utf-8 -*-

# DrissionPage 库 文档地址 http://g1879.gitee.io/drissionpagedocs/

#-导入库
from DrissionPage import ChromiumPage,ChromiumOptions


#-配置类
class Config:    
    UA_android="Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36"
    UA_apple="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"


#-创建配置对象
co=ChromiumOptions()
#-启动配置 配置端口
co.set_local_port(9222)

#-创建浏览器
page = ChromiumPage(co)

#-设置文件下载目录 默认是当前目录
page.set.download_path(".")

#启动网址
page.get('${window.location.href}')


test=input('继续 ?')
  
`
class CheckboxOBJ {
    constructor(father_ele) {
        this.eles = [];
        this.father_ele=father_ele;
        this.config = {
            div: false,
            input: true,
            img: true,
            a:true,
            li:true,
            button:true
        };
        for (let key in this.config) this.add(key, this.config[key]);
    }

    create_ele(labelText, isSelected) {
        const label = document.createElement("label");
        label.id = labelText + '_checkbox';
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isSelected;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(labelText));
        label.style.margin = "10px";
        return label;
    }
    add(txt,isSelected) {
        let e = this.create_ele(txt, isSelected);
        this.eles.push(e);
        this.father_ele.appendChild(e);
        return this;
    }
    getValue(ele) {
        return ele.querySelector('input[type="checkbox"]').checked;
    }
    getSelectedEleString(){
        let aa=[];
        this.eles.forEach(e=>{
            if(this.getValue(e)) aa.push(e.querySelector('input[type="checkbox"]').tagName);
        });
        return aa.join(',');

    }

}

class SelectAlert {
    constructor() {
        this.alertBox = this.createAlertBox();
        this.ele_config=new CheckboxOBJ(this.alertBox);
        this.createCheckboxes();
        this.createSaveButton(); // 添加帮助按钮
        this.createCancelButton(); // 添加帮助按钮
        this.showAlertBox();
    }

    createAlertBox() {
        const alertBox = document.createElement("div");
        alertBox.style.position = "fixed";
        alertBox.style.top = "50%";
        alertBox.style.left = "50%";
        alertBox.style.transform = "translate(-50%, -50%)";
        alertBox.style.padding = "15px";
        alertBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        alertBox.style.color = "#fff";
        alertBox.style.borderRadius = "5px";
        alertBox.style.zIndex = "9999";
        alertBox.style.fontSize="20px";
        alertBox.style.padding="30px";
        alertBox.innerText ="选择需要定位的元素：\n";
        return alertBox;
    }

    createCheckbox(labelText) {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(labelText));
        label.style.margin="5px";
        return label;
    }
    createCheckboxes() {
           
        
        
    
        // 创建 <br> 元素
        const br = document.createElement("br");
        this.alertBox.appendChild(br);
    }

    createSaveButton() {
        const saveButton = document.createElement("button");
        saveButton.textContent = "保存";
        saveButton.style.marginTop = "10px";
        saveButton.style.marginRight = "10px";
        saveButton.onclick = () => {
            this.alertBox.style.display='none';
            //设置元素定位选项
            window.flag.set(this.ele_config.getSelectedEleString());
           
            AutoDismissAlert("定位配置信息已经保存",1000);
        };
        this.alertBox.appendChild(saveButton);
    }
    createCancelButton() {
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "取消";
        cancelButton.style.marginTop = "10px";
        cancelButton.style.marginRight = "10px";
        cancelButton.onclick = () => {
            this.alertBox.style.display='none';
            
            
        };
        this.alertBox.appendChild(cancelButton);
    }

    showAlertBox() {
        document.body.appendChild(this.alertBox);
    }
    show(){
        this.alertBox.style.display ="block";
          
    }
    hide(){
        this.alertBox.style.display = "none";  
    }
}

// 使用示例
const selectAlert = new SelectAlert();
selectAlert.hide();


