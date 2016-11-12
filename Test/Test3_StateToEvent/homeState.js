var IDE;
(function (IDE) {
    var HomeState = (function () {
        function HomeState() {
        }
        HomeState.prototype.onInit = function (app) {
            var titleLabel = document.getElementById("titlelabel");
            titleLabel.innerText = "HomePage";
            var contentDiv = document.getElementById("content");
            var curDiv = document.getElementById("home");
            if (curDiv == null) {
                var curDiv = document.createElement("div");
                curDiv.id = "home";
                curDiv.style.height = "430px";
                curDiv.style.width = "300px";
                var btnQQ = IDE.domTools.createIcon("QQ");
                var btnWX = IDE.domTools.createIcon("WX");
                var btnIQIY = IDE.domTools.createIcon("IQIY");
                var btnQQMusic = IDE.domTools.createIcon("QQMusic");
                curDiv.appendChild(btnQQ);
                curDiv.appendChild(btnWX);
                curDiv.appendChild(btnIQIY);
                curDiv.appendChild(btnQQMusic);
                btnQQ.onclick = function () {
                    app.changeState(new IDE.QQState());
                };
                btnWX.onclick = function () {
                    app.changeState(new IDE.WXState());
                };
                btnIQIY.onclick = function () {
                    app.changeState(new IDE.IQIYState());
                };
                btnQQMusic.onclick = function () {
                    alert("QQMusic已停止运行");
                };
                contentDiv.appendChild(curDiv);
            }
            else {
                curDiv.hidden = false;
            }
        };
        HomeState.prototype.onExit = function () {
            var curDiv = document.getElementById("home");
            if (curDiv != null) {
                curDiv.hidden = true;
            }
        };
        return HomeState;
    }());
    IDE.HomeState = HomeState;
})(IDE || (IDE = {}));
//# sourceMappingURL=homeState.js.map