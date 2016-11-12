namespace IDE {
    export class IQIYState implements IState {
        preState: IState;
        afterState: IState;
        onInit(app: App) {
            var titleLabel: HTMLLabelElement = <HTMLLabelElement>document.getElementById("titlelabel");
            titleLabel.innerText = "爱奇艺";

            var contentDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("content"); 

            var curDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("iqiy");
            if (curDiv == null) {
                var curDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                curDiv.id = "iqiy"
                curDiv.style.height = "430px";
                curDiv.style.width = "300px";

                var video: HTMLVideoElement = <HTMLVideoElement>document.createElement("video");
                video.style.height = "430px";
                video.style.width = "300px";
                video.style.backgroundColor = "black";
                video.src = "http://www.w3school.com.cn/i/movie.ogg";
                video.autoplay = true;
                video.loop = true;
                curDiv.appendChild(video);

                contentDiv.appendChild(curDiv);
            } else {
                curDiv.hidden = false;
            }
        }
        onExit() {
            var curDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("iqiy");
            if (curDiv != null) {
                curDiv.hidden = true;
            }
        }
    }
}