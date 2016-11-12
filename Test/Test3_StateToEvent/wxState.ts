namespace IDE {
    export class WXState implements IState {
        preState: IState;
        afterState: IState;
        onInit(app: App) {
            var titleLabel: HTMLLabelElement = <HTMLLabelElement>document.getElementById("titlelabel");
            titleLabel.innerText = "微信";

            var contentDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("content"); 

            var curDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("wx");
            if (curDiv == null) {
                var curDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                curDiv.id = "wx"
                curDiv.style.height = "430px";
                curDiv.style.width = "300px";

                //var people: HTMLInputElement = domTools.createPeople("lili", app);
                curDiv.appendChild(domTools.createPeople("公众号", app));
                curDiv.appendChild(domTools.createPeople("订阅号", app));
                curDiv.appendChild(domTools.createPeople("文件助手", app));
                curDiv.appendChild(domTools.createPeople("汤姆1", app));
                curDiv.appendChild(domTools.createPeople("汤姆2", app));
                curDiv.appendChild(domTools.createPeople("汤姆3", app));
                curDiv.appendChild(domTools.createPeople("汤姆4", app));
                curDiv.appendChild(domTools.createPeople("汤姆5", app));

                contentDiv.appendChild(curDiv);
            } else {
                curDiv.hidden = false;
            }
        }
        onExit() {
            var curDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("wx");
            if (curDiv != null) {
                curDiv.hidden = true;
            }
        }
    }
}