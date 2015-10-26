/**
 * Created by Soyal on 2015/10/25.
 */
var $submit = $("#submit");
var $textarea = $("#input textarea");
var $show = $("#show");
var $usersInfo = $("#usersInfo");
var currentUser = "";
//TODO
var socket = new Socket("ws://www.baidu.com",messageHadnle);
socket.send(JSON.stringify({type:3}));

//1.初始化文本输入框
$textarea.keyup(function(event){
    if(event.keyCode == 13) {
        if(!$.trim($textarea.val())) return false;
        $submit.trigger(("click"));
        $textarea.val("");
    }
});
$textarea.keypress(function() {
    if(event.keyCode == 13) {
        if(!$.trim($textarea.val())) return false;
    }
});
$textarea.keydown(function() {
    if(event.keyCode == 13) {
        if(!$.trim($textarea.val())) return false;
    }
});


//2.更新文本显示框
$submit.click(function(event){
    event.preventDefault();
    event.stopPropagation();
    console.log($textarea.val());
    var $message = messagePackage({
        userName:currentUser,
        timeSign:getTime().time,
        content:$textarea.val()
    });
    $show.append();
    //TODO 将消息发送到服务器

    //让滚动条自动滚到底
    $show.get(0).scrollTop = $show.get(0).scrollHeight;
});


//3.更新用户列表
function updateUsers(jsonText) {
    var userNameArray = JSON.parse(jsonText);
    var elementStr = "";
    for(var i= 0,len=userNameArray.length;i<len;i++){
        elementStr += ("<p>"+userNameArray[i]+"</p>");
    }
    console.log(elementStr);
    $usersInfo.html(elementStr);
}
