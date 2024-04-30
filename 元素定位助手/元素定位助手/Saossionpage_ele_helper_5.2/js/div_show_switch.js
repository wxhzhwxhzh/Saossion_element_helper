function set_on() {
    chrome.storage.local.set({ show_div: '显示' }, function () {
        console.log('Data saved.');
    });

    // 读取数据
    chrome.storage.local.get('show_div', function (result) {
        
        document.getElementById('ceshi').innerHTML = '->' + result.show_div;
        document.getElementById('on1').innerHTML = '关闭信息展示栏';
        document.getElementById('on1').style.backgroundColor = 'red'
        // console.log(result.show_div);

    });

}
function set_off() {
    chrome.storage.local.set({ show_div: '隐藏' }, function () {
        console.log('Data saved.');
    });

    // 读取数据
    chrome.storage.local.get('show_div', function (result) {
        
        document.getElementById('ceshi').innerHTML = '->' + result.show_div;
        document.getElementById('on1').innerHTML = '开启信息展示栏';
        document.getElementById('on1').style.backgroundColor = 'green'
        // console.log(result.show_div);

    });

}

function toggleSwitch() {
    // 切换开关状态
    var checkBox = document.getElementById("kaiguan1");
    if (checkBox.checked) {        
        
        set_off();
    } else {       
        
        set_on();
    }
}
function toggleSwitch_button() {
        // 切换开关状态

    if (document.getElementById('ceshi').innerHTML.includes('显示')) {

        set_off();
        
    } else {
        set_on();
        
    }
}
function scan_finger_print(){
    window.open("https://ip77.net/", "_blank");
}

// 获取 on1 按钮元素并添加点击事件监听器




document.getElementById('on1').addEventListener('click', scan_finger_print);






