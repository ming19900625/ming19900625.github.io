window.onload = () => {
    var appDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("app");
    var app: IDE.App = new IDE.App(appDiv);
    app.changeState(new IDE.HomeState());

    var backBtn: HTMLInputElement = <HTMLInputElement>document.getElementById("backBtn");
    backBtn.onclick = () => {
        if (app != null) {
            app.back();
        }
    }
    var forwardBtn: HTMLInputElement = <HTMLInputElement>document.getElementById("forwardBtn");
    forwardBtn.onclick = () => {
        if (app != null) {
            app.forward();
        }
    }
}

namespace IDE {
    export interface IState {
        preState: IState;
        afterState: IState;
        onInit(app: App);
        onExit();
    }

    export class App {
        divContent: HTMLDivElement;
        constructor(div: HTMLDivElement) {
            this.divContent = div;
        }
        curState: IState = null;
        changeState(s: IState) {
            if (s != null) {
                if (this.curState != null) {
                    this.curState.afterState = s;
                    s.preState = this.curState;
                    this.curState.onExit();
                }
                this.curState = s;
                this.curState.onInit(this);
            }
        }
        back() {
            if (this.curState != null) {
                if (this.curState.preState != null) {
                    let preState: IState = this.curState.preState;
                    this.curState.onExit();
                    this.curState = preState;
                    this.curState.onInit(this);
                }
            }
        }
        forward() {
            if (this.curState != null) {
                if (this.curState.afterState != null) {
                    let afterState: IState = this.curState.afterState;
                    this.curState.onExit();
                    this.curState = afterState;
                    this.curState.onInit(this);
                }
            }
        }
        data: AppData = new AppData();
    }

    export class AppData {
        public user: string;
        public pass: string;
    }
}