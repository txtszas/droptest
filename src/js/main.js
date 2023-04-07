console.log('hello');


var draggedElement = null;

// 添加拖拽事件监听器
document.addEventListener('dragstart', function (event) {
    draggedElement = event.target;
    draggedElement.classList.add('hide');
    console.log(draggedElement);
});


document.addEventListener('dragend', function (event) {
    console.log('dragend');
    draggedElement.classList.remove('hide');
    //console.log(draggedElement);
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    var dropZone = e.target;
    if (dropZone.className === 'zone') {
        dropZone.innerHTML = draggedElement.innerHTML;
        draggedElement.classList.add('used');
    }
    console.log('drop', dropZone, dropZone.className);
})

document.addEventListener('dragover', function (event) {
    event.preventDefault();
    //console.log(event.target);  
})