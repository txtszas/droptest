var draggableElements = document.getElementsByClassName('draggableElement');
var dropZones = document.getElementsByClassName('dropZone');

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
      }
    });
    if (!isDropped) {
      // 拖拽失败，将元素还原到原始位置
      element.style.transform = 'translate(0, 0)';
    }
  });
});


// var draggedElement = null;

// // 添加拖拽事件监听器
// document.addEventListener('dragstart', function (event) {
//     draggedElement = event.target;
//     draggedElement.classList.add('hide');
//     console.log(draggedElement);
// });


// document.addEventListener('dragend', function (event) {
//     console.log('dragend');
//     draggedElement.classList.remove('hide');
//     //console.log(draggedElement);
// });

// document.addEventListener('drop', (e) => {
//     e.preventDefault();
//     var dropZone = e.target;
//     if (dropZone.className === 'zone') {
//         dropZone.innerHTML = draggedElement.innerHTML;
//         draggedElement.classList.add('used');
//     }
//     console.log('drop', dropZone, dropZone.className);
// })

// document.addEventListener('dragover', function (event) {
//     event.preventDefault();
//     //console.log(event.target);  
// })