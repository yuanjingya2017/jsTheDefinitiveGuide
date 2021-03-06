//exp22-4
if(window.addEventListener()){
    window.addEventListener('message',handleMessage,false);
}
else {
    window.attachEvent('onmessage',handleMessage);
}
function handleMessage(e) {//不在意消息来源：愿意接受任何来源的Twitter搜索请求
    //但是，希望消息源自内嵌gadget的窗口
    if(e.source!=window.parent)return;
    var searchterm = e.data;//获取内容
    //使用jQuery Ajax工具函数以及Twitter的搜索API来查找匹配消息的tweet
    jQuery.getJson('http://search.twitter.com/search.json?callback=?',
        {q:searchterm},
        function (data) {//使用请求结果调用
            var tweets = data.results;//构造一个HTML文档来显示搜索结果
            var escaped = searchterm.replace('<','&lt;');
            var html = '<h2>'+escaped+'</h2>';
            if(tweets.length==0){
                html+='no tweets found';
            }
            else {
                html+='<dl>';
                for(var i=0;i<tweets.length;i++){
                    var tweet = tweets[i];
                    var text = tweet.text;
                    var from = tweet.from_user;
                    var tweeturl="http://twitter.com/#!/"+
                        from+"/status/"+tweet.id_str;
                    html+="＜dt＞＜a target='_blank' href='"+
                        tweeturl+"'＞"+tweet.from_user+
                        "＜/a＞＜/dt＞＜dd＞"+tweet.text+"＜/dd＞";
                }
                html+="＜/dl＞";
            }
            //设置＜iframe＞文档
            document.body.innerHTML=html;
        });
    $(function () {
        //通知内嵌gadget的页面[3]，
        //我们（gadget）已经准备就绪
        //容器在没有收到这条消息前，它不能发送任何消息
        //因为我们还没有准备好接收消息
        //通常，容器只需要等待onload事件的触发，以此来得知所有的＜iframe＞都已载入完毕
        //我们发送消息告诉容器已经准备就绪，甚至有可能在容器获得onload事件之前
        //我们并不知道容器的源，所以采用"*"来让浏览器把消息发送给任何窗口
        window.parent.postMessage('Twitter Search v0.1','*');
    });
}