function set_on() {
    chrome.storage.local.set({ show_div: '显示' }, function () {
        console.log('Data saved.');
    });

    // 读取数据
    chrome.storage.local.get('show_div', function (result) {
        console.log('显示div is ' + result.show_div);
        document.getElementById('ceshi').innerHTML = '->' + result.show_div;
        console.log(result.show_div);

    });

}
function set_off() {
    chrome.storage.local.set({ show_div: '隐藏' }, function () {
        console.log('Data saved.');
    });

    // 读取数据
    chrome.storage.local.get('show_div', function (result) {
        console.log('显示div is ' + result.show_div);
        document.getElementById('ceshi').innerHTML = '->' + result.show_div;
        console.log(result.show_div);

    });

}



// 获取 on1 按钮元素并添加点击事件监听器
console.log(document.URL);


document.getElementById('on1').addEventListener('click', set_on);
document.getElementById('off1').addEventListener('click', set_off);
// 默认展示信息栏
set_on();


