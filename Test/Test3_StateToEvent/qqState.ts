namespace IDE {
    export class QQState implements IState {
        preState: IState;
        afterState: IState;
        onInit(app: App) {
            var titleLabel: HTMLLabelElement = <HTMLLabelElement>document.getElementById("titlelabel");
            titleLabel.innerText = "QQ";

            var contentDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("content"); 

            var curDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("qq");
            if (curDiv == null) {
                var curDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                curDiv.id = "qq"
                curDiv.style.height = "430px";
                curDiv.style.width = "300px";

                //var people: HTMLInputElement = domTools.createPeople("lili", app);
                curDiv.appendChild(domTools.createPeople("我的手机", app));
                curDiv.appendChild(domTools.createPeople("李磊", app));
                curDiv.appendChild(domTools.createPeople("韩梅梅", app));
                curDiv.appendChild(domTools.createPeople("吉姆", app));
                curDiv.appendChild(domTools.createPeople("汤姆", app));
                curDiv.appendChild(domTools.createPeople("韩梅梅", app));
                curDiv.appendChild(domTools.createPeople("吉姆", app));
                curDiv.appendChild(domTools.createPeople("汤姆", app));

                contentDiv.appendChild(curDiv);
            } else {
                curDiv.hidden = false;
            }
        }
        onExit() {
            var curDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("qq");
            if (curDiv != null) {
                curDiv.hidden = true;
            }
        }
    }
}