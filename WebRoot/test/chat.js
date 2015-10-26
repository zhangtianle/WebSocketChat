function Socket(url,callback) {
    var socket = new WebSocket(url);

    socket.onopen = function(event){
        console.log("success");
        socket.send("client in");
    }

    socket.onmessage = function(event) {
        callback(event);
    }

    socket.onclose = function(event) {
        console.log(("client out"));
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
function messageHadnle(event) {
    var jsonStr = event.data;
    var data = JSON.parse(jsonStr);
    var $message = messagePackage({
        userName:"haha",
        timeSign:"12:22:11",
        content:"这是消息内容"
    });
    $show.append($message);
}
function getTime() {
    var currentTime = {};
    var raw = new Date();
    currentTime.date = raw.getFullYear() + "-" + raw.getMonth() + "-" + raw.getDate();
    currentTime.time = raw.getHours() + ":" + raw.getMinutes() + ":" + String(raw.getMilliseconds()).slice(0,2);
    return currentTime;
}