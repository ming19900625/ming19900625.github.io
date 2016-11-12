namespace IDE {
    export class MessageState implements IState {
        private name: string;
        constructor(name: string) {
            this.name = name;
        }

        preState: IState;
        afterState: IState;
        onInit(app: App) {
            var titleLabel: HTMLLabelElement = <HTMLLabelElement>document.getElementById("titlelabel");
            titleLabel.innerText = "To " + this.name;

            var contentDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("content"); 

            var curDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("msgbox");
            if (curDiv == null) {
                var curDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                curDiv.id = "msgbox"
                curDiv.style.height = "430px";
                curDiv.style.width = "300px";

                //聊天记录
                var msgBox: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                msgBox.style.height = "380px";
                msgBox.style.width = "300px";
                //msgBox.style.backgroundColor = "red";
                msgBox.style.lineHeight = "380px";
                msgBox.style.textAlign = "center";

                var msgLabel: HTMLLabelElement = <HTMLLabelElement>document.createElement("label");
                msgLabel.innerText = "暂无聊天记录";
                msgBox.appendChild(msgLabel);

                //发送消息框
                var sendBox: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                sendBox.style.height = "50px";
                sendBox.style.width = "300px";
                sendBox.style.backgroundColor = "blue";

                //输入框
                var sendInput: HTMLInputElement = <HTMLInputElement>document.createElement("input");
                sendInput.style.height = "45px";
                sendInput.style.width = "220px";
                sendBox.appendChild(sendInput);

                //发送按钮
                var sendBtn: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
                sendBtn.style.height = "50px";
                sendBtn.style.width = "76px";
                sendBtn.style.position = "relative";
                sendBtn.style.cssFloat = "right";
                sendBtn.innerText = "发送";
                sendBox.appendChild(sendBtn);


                curDiv.appendChild(msgBox);
                curDiv.appendChild(sendBox);

                contentDiv.appendChild(curDiv);
            } else {
                curDiv.hidden = false;
            }
        }
        onExit() {
            var curDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("msgbox");
            if (curDiv != null) {
                curDiv.hidden = true;
            }
        }
    }
}