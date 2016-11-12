var IDE;
(function (IDE) {
    var MessageState = (function () {
        function MessageState(name) {
            this.name = name;
        }
        MessageState.prototype.onInit = function (app) {
            var titleLabel = document.getElementById("titlelabel");
            titleLabel.innerText = "To " + this.name;
            var contentDiv = document.getElementById("content");
            var curDiv = document.getElementById("msgbox");
            if (curDiv == null) {
                var curDiv = document.createElement("div");
                curDiv.id = "msgbox";
                curDiv.style.height = "430px";
                curDiv.style.width = "300px";
                //聊天记录
                var msgBox = document.createElement("div");
                msgBox.style.height = "380px";
                msgBox.style.width = "300px";
                //msgBox.style.backgroundColor = "red";
                msgBox.style.lineHeight = "380px";
                msgBox.style.textAlign = "center";
                var msgLabel = document.createElement("label");
                msgLabel.innerText = "暂无聊天记录";
                msgBox.appendChild(msgLabel);
                //发送消息框
                var sendBox = document.createElement("div");
                sendBox.style.height = "50px";
                sendBox.style.width = "300px";
                sendBox.style.backgroundColor = "blue";
                //输入框
                var sendInput = document.createElement("input");
                sendInput.style.height = "45px";
                sendInput.style.width = "220px";
                sendBox.appendChild(sendInput);
                //发送按钮
                var sendBtn = document.createElement("button");
                sendBtn.style.height = "50px";
                sendBtn.style.width = "76px";
                sendBtn.style.position = "relative";
                sendBtn.style.cssFloat = "right";
                sendBtn.innerText = "发送";
                sendBox.appendChild(sendBtn);
                curDiv.appendChild(msgBox);
                curDiv.appendChild(sendBox);
                contentDiv.appendChild(curDiv);
            }
            else {
                curDiv.hidden = false;
            }
        };
        MessageState.prototype.onExit = function () {
            var curDiv = document.getElementById("msgbox");
            if (curDiv != null) {
                curDiv.hidden = true;
            }
        };
        return MessageState;
    }());
    IDE.MessageState = MessageState;
})(IDE || (IDE = {}));
//# sourceMappingURL=messageState.js.map