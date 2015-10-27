function Socket(url,callback) {
    var socket = new WebSocket(url);

    socket.onopen = function(event){
        console.log(currentUser," login in");
        var message = {
            type : 0,
            username : currentUser
        };

        socket.send(JSON.stringify(message));
    }

    socket.onmessage = function(event) {
        callback(event);
    }

    socket.onclose = function(event) {

    }

    socket.onerror = function(event) {
        console.log("socket error");
        socket.close();
    }
    return socket;
}

//消息封装函数
function messagePackage(message) {
    /*
     message{
     userName : xx,
     timeSign : 22:12:44,
     content : abc
     }
     */
    var element_section = $("<section></section>");
    var element_section_p1 = $("<p></p>");
    var element_section_p1_user = $("<span></span>");
    var element_section_p1_time = $("<time></time>");
    var element_section_p2_content = $("<p></p>");
    element_section.addClass("message");
    element_section_p1.addClass("header");
    element_section_p2_content.addClass("content");
    element_section_p1_user.text(message.username);
    element_section_p1_time.text(message.timeSign);
    element_section_p2_content.text(message.content);
    element_section_p1.append(element_section_p1_user);
    element_section_p1.append(element_section_p1_time);
    element_section.append(element_section_p1);
    element_section.append(element_section_p2_content);
    return element_section;
}

//用于消息处理的函数
/*
jsonData : {
    type:1(聊天信息)||2(用户列表更新信息),
    username(1,2,3):xx,
    timeSign(1):xx:xx:xx,
    content(1):xxxxxxxxxxxxx,
}
 */

function messageHandle(event) {
	console.log(event.data.type);
    var jsonStr = event.data;
    var data = JSON.parse(jsonStr);
    var $message = null;
    switch(data.type) {
        //更新聊天显示框
        case 1:
            if(data.username == currentUser) return;
            $message = messagePackage({
               username : data.username,
                timeSign : data.timeSign,
                content : data.content
            });
            $show.append($message);
            //让滚动条自动滚到底
            $show.get(0).scrollTop = $show.get(0).scrollHeight;
            break;
        //向已经在线的用户发送用户列表更新信息
        case 2:
            var $userName = $("<p></p>");
            $userName.text(data.username);
            $("#usersInfo").append($userName);

            break;
        //将所有已经在线的用户信息发送给刚加入的用户
        case 3:
            var usernames = data.usernames;
            var $usersInfo = $("#usersInfo");
            $usersInfo.empty();
            for(var i= 0,len=usernames.length;i<len;i++) {
                var $userName = $("<p></p>");
                $userName.text(usernames[i]);
                $usersInfo.append($userName);
            }
           
            break;
        //删除用户信息
        case 4:
            var $usersInfo = $("#usersInfo");
            $usersInfo.find(":contains("+data.username+")").remove();
    }

}

function getTime() {
    var currentTime = {};
    var raw = new Date();
    currentTime.date = raw.getFullYear() + "-" + raw.getMonth() + "-" + raw.getDate();
    currentTime.time = raw.getHours() + ":" + raw.getMinutes() + ":" + String(raw.getMilliseconds()).slice(0,2);
    return currentTime;
}