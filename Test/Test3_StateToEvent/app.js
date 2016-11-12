window.onload = function () {
    var appDiv = document.getElementById("app");
    var app = new IDE.App(appDiv);
    app.changeState(new IDE.HomeState());
    var backBtn = document.getElementById("backBtn");
    backBtn.onclick = function () {
        if (app != null) {
            app.back();
        }
    };
    var forwardBtn = document.getElementById("forwardBtn");
    forwardBtn.onclick = function () {
        if (app != null) {
            app.forward();
        }
    };
};
var IDE;
(function (IDE) {
    var App = (function () {
        function App(div) {
            this.curState = null;
            this.data = new AppData();
            this.divContent = div;
        }
        App.prototype.changeState = function (s) {
            if (s != null) {
                if (this.curState != null) {
                    this.curState.afterState = s;
                    s.preState = this.curState;
                    this.curState.onExit();
                }
                this.curState = s;
                this.curState.onInit(this);
            }
        };
        App.prototype.back = function () {
            if (this.curState != null) {
                if (this.curState.preState != null) {
                    var preState = this.curState.preState;
                    this.curState.onExit();
                    this.curState = preState;
                    this.curState.onInit(this);
                }
            }
        };
        App.prototype.forward = function () {
            if (this.curState != null) {
                if (this.curState.afterState != null) {
                    var afterState = this.curState.afterState;
                    this.curState.onExit();
                    this.curState = afterState;
                    this.curState.onInit(this);
                }
            }
        };
        return App;
    }());
    IDE.App = App;
    var AppData = (function () {
        function AppData() {
        }
        return AppData;
    }());
    IDE.AppData = AppData;
})(IDE || (IDE = {}));
//# sourceMappingURL=app.js.map