function Socket(url,callback) {
    var socket = new WebSocket(url);

    socket.onopen = function(event){
        socket.send("client in");
    }

    socket.onmessage = function(event) {
        callback(event);
    }

    socket.onclose = function(event) {
        socket.send(("client out"));
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
    element_section_p1_user.text(message.userName);
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
    type:1(聊天信息)||2(用户列表更新信息)||3(用户相关信息),
    username(1,2,3):xx,
    timeSign(1):xx:xx:xx,
    content(1):xxxxxxxxxxxxx,
}
 */
function messageHadnle(event) {
    var jsonStr = event.data;
    var data = JSON.parse(jsonStr);
    var $message = null;
    switch(data.type) {
        //更新聊天显示框
        case 1:
            $message = messagePackage({
               username : data.username,
                timeSign : data.timeSign,
                content : data.content
            });
            $show.append($message);
            break;
        //更新用户列表
        case 2:
            var $userName = $("<p></p>");
            $userName.text(data.username);
            $("#usersInfo").append($userName);
            break;
        //填充用户信息
        case 3:
            currentUser = data.username;
            $("#userMessage span").text(data.username);
            break;
    }

}

function getTime() {
    var currentTime = {};
    var raw = new Date();
    currentTime.date = raw.getFullYear() + "-" + raw.getMonth() + "-" + raw.getDate();
    currentTime.time = raw.getHours() + ":" + raw.getMinutes() + ":" + String(raw.getMilliseconds()).slice(0,2);
    return currentTime;
}