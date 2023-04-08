function drapbind(draggableElementClassName, dropZoneClassName) {
    var draggableElements = document.getElementsByClassName(draggableElementClassName);
    var dropZones = document.getElementsByClassName(dropZoneClassName);

    Array.from(draggableElements).forEach(function (element) {
    var mc = new Hammer.Manager(element);
    mc.add(new Hammer.Pan({ threshold: 0 }));

    // 监听拖拽事件
    mc.on('pan', function (e) {
        // 移动被拖拽的元素
        element.style.transform = 'translate(' + e.deltaX + 'px, ' + e.deltaY + 'px)';
    });

    // 监听拖拽结束事件
    mc.on('panend', function (e) {
        // 判断是否在指定区域内
        var isDropped = false;
        Array.from(dropZones).forEach(function (zone) {
        var rect = zone.getBoundingClientRect();
        if (e.center.x >= rect.left && e.center.x <= rect.right &&
            e.center.y >= rect.top && e.center.y <= rect.bottom) {
            // 拖拽成功，将元素放入指定区域
            zone.appendChild(element);
            element.style.transform = 'translate(0, 0)';
            isDropped = true;
            updateScore();
        }
        });
        if (!isDropped) {
        // 拖拽失败，将元素还原到原始位置
        element.style.transform = 'translate(0, 0)';
        }
    });
    });
}

drapbind('draggableElement', 'dropZone');
drapbind('draggableElement2', 'dropZone2');

$('.start').on('click', () => {
    startTimer();
    $('.screen1').toggleClass('hide');
    $('.screen2').toggleClass('hide');
})

function updateScore() {
    const score = Math.round($('.right .draggableElement,.right .draggableElement2').length * 100 / 14);
    const scoreDom = document.getElementById('score');
    scoreDom.innerHTML = score;
}

// 计时器逻辑

let intervalId; // 用于存储计时器的 interval ID
let startTime; // 记录计时器开始的时间
let elapsedTime = 0; // 记录已过去的时间

function startTimer() {
    startTime = Date.now() - elapsedTime; // 获取当前时间作为计时器开始的时间
    intervalId = setInterval(updateTimer, 1000); // 每秒钟更新一次计时器
}

function stopTimer() {
    clearInterval(intervalId); // 清除计时器
}

function resetTimer() {
    stopTimer(); // 先停止计时器
    elapsedTime = 0; // 重置已过去的时间
    updateTimer(); // 更新计时器显示
}

function updateTimer() {
    const currentTime = Date.now(); // 获取当前时间
    elapsedTime = currentTime - startTime; // 计算已过去的时间
    const seconds = Math.floor(elapsedTime / 1000); // 转换为秒
    const minutes = Math.floor(seconds / 60); // 计算分钟数
    const remainingSeconds = seconds % 60; // 计算剩余的秒数

    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${minutes}:${padZero(remainingSeconds)}`; // 更新计时器显示
}

function padZero(number) {
    return number < 10 ? '0' + number : number; // 在数字前面补零，保持两位数的格式
}


$('.show_score_list').on('click', () => {
    $('.screen2').toggleClass('hide');
    $('.screen3').toggleClass('hide');
    $('body').addClass('scoreBg');
})