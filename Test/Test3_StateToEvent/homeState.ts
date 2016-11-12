namespace IDE {
    export class HomeState implements IState {
        preState: IState;
        afterState: IState;
        onInit(app: App) {
            var titleLabel: HTMLLabelElement = <HTMLLabelElement>document.getElementById("titlelabel");
            titleLabel.innerText = "HomePage";

            var contentDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("content"); 

            var curDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("home");
            if (curDiv == null) {
                var curDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                curDiv.id = "home"
                curDiv.style.height = "430px";
                curDiv.style.width = "300px";

                var btnQQ: HTMLInputElement = domTools.createIcon("QQ");
                var btnWX: HTMLInputElement = domTools.createIcon("WX");
                var btnIQIY: HTMLInputElement = domTools.createIcon("IQIY");
                var btnQQMusic: HTMLInputElement = domTools.createIcon("QQMusic");
                curDiv.appendChild(btnQQ);
                curDiv.appendChild(btnWX);
                curDiv.appendChild(btnIQIY);
                curDiv.appendChild(btnQQMusic);
                btnQQ.onclick = () => {
                    app.changeState(new IDE.QQState());
                }
                btnWX.onclick = () => {
                    app.changeState(new IDE.WXState());
                }
                btnIQIY.onclick = () => {
                    app.changeState(new IDE.IQIYState());
                }
                btnQQMusic.onclick = () => {
                    alert("QQMusic已停止运行");
                }

                contentDiv.appendChild(curDiv);
            } else {
                curDiv.hidden = false;
            }
        }
        onExit() {
            var curDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("home");
            if (curDiv != null) {
                curDiv.hidden = true;
            }
        }
    }
}