function drag(elementToDrag,event) {
    var scroll = getScrollOffsets();
    var startX = event.clientX+scroll.x;
    var startY = event.clientY+scroll.y;
    var origX = elementToDrag.offsetLeft;
    var origY = elementToDrag.offsetTop;
    var deltaX = startX-origX;
    var deltaY = startY-origY;
    if(document.addEventListener){
        document.addEventListener('mousemove',moveHandler,true);
        document.addEventListener('mouseup',upHandler,true);
    }
    else if(document.attachEvent){
        elementToDrag.setCapture();
        elementToDrag.attachEvent('onmousemove',moveHandler);
        elementToDrag.attachEvent('onmouseup',upHandler);
        elementToDrag.attachEvent('onlosecapture',upHandler);
    }
    if(event.stopPropagation){
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
    if(event.preventDefault){
        event.preventDefault();
    }
    else {
        event.returnValue = false;
    }
}

function upHandler(e) {
    if(!e){
        e = window.event;
    }
    if(document.removeEventListener){
        document.removeEventListener('mouseup',upHandler,true);
        document.removeEventListener('mousemove',moveHandler,true);
    }
    else if(document.detachEvent){
        elementToDrag.detachEvent('onlosecapture',upHandler);
        elementToDrag.detachEvent('onmouseup',upHandler);
        elementToDrag.detachEvent('onmousemove',moveHandler);
        elementToDrag.releaseCapture();
    }
    if(e.stopPropagation){
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
    }
}


function getScrollOffsets() {
    
}
