function fileinfo(files) {
    for(var i=0;i<files.length;i++){
        var f = files[i];
        console.log(f.name,f.size,f.type,f.lastModifiedDate);
    }
}

function getBlob(url,callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.responseType = 'blob';
    xhr.onload = function () {//onload比onreadystatechange
                              // 更容易将Blob传递给回调函数
        callback(xhr.response);
        xhr.send(null);
    }
}

var bb = new Blob({type: "x-optional/mime-type-here"});
bb.append('this blob contains this text and 10 big-endian 32-bit signed ints.');
bb.append('\0');
var ab = new ArrayBuffer(4*10);
var dv = new DataView(ab);
for(var i=0;i<10;i++){
    dv.setInt32(i*4,i);
}
bb.append(ab);

var getBlobURL = (window.URL&&URL.createObjectURL.bind(URL))||(window.webkitURL&&webkitURL.createObjectURL.bind(webkitURL))||window.createObjectURL;
var revokeBlobURL = (window.URL&&URL.revokeObjectURL.bind(URL))||(window.webkitURL&&webkitURL.revokeObjectURL.bind(webkitURL))||window.revokeObjectURL;
window.onload = function () {
    var droptarget = document.getElementById('droptarget');
    droptarget.ondragenter = function (e) {
        var types = e.dataTransfer.types;
        if(!types||(types.contains&&types.contains('Files')||(types.indexOf&&types.indexOf('Flies')!=-1)){
            droptarget.classList.add('active');
            return false;
        }
    };
    droptarget.ondragleave = function () {
        droptarget.classList.remove('active');
    };
    droptarget.ondragover = function (e) {
        return false;
    };
    droptarget.ondrop = function (e) {
        var files = e.dataTransfer.files;
        for(var i=0;i<files.length;i++){
            var type = files[i].type;
            if(type.substring(0,6)!='image/')
                continue;
            var img = document.createElement('img');
            img.src = getBlobURL(files[i]);
            img.onload = function () {
                this.width = 100;
                document.body.appendChild(this);
                revokeBlobURL(this.src);
            }
        }
        droptarget.classList.remove('active');
        return false;
    }
};