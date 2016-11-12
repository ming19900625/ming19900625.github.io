var IDE;
(function (IDE) {
    var WXState = (function () {
        function WXState() {
        }
        WXState.prototype.onInit = function (app) {
            var titleLabel = document.getElementById("titlelabel");
            titleLabel.innerText = "微信";
            var contentDiv = document.getElementById("content");
            var curDiv = document.getElementById("wx");
            if (curDiv == null) {
                var curDiv = document.createElement("div");
                curDiv.id = "wx";
                curDiv.style.height = "430px";
                curDiv.style.width = "300px";
                //var people: HTMLInputElement = domTools.createPeople("lili", app);
                curDiv.appendChild(IDE.domTools.createPeople("公众号", app));
                curDiv.appendChild(IDE.domTools.createPeople("订阅号", app));
                curDiv.appendChild(IDE.domTools.createPeople("文件助手", app));
                curDiv.appendChild(IDE.domTools.createPeople("汤姆1", app));
                curDiv.appendChild(IDE.domTools.createPeople("汤姆2", app));
                curDiv.appendChild(IDE.domTools.createPeople("汤姆3", app));
                curDiv.appendChild(IDE.domTools.createPeople("汤姆4", app));
                curDiv.appendChild(IDE.domTools.createPeople("汤姆5", app));
                contentDiv.appendChild(curDiv);
            }
            else {
                curDiv.hidden = false;
            }
        };
        WXState.prototype.onExit = function () {
            var curDiv = document.getElementById("wx");
            if (curDiv != null) {
                curDiv.hidden = true;
            }
        };
        return WXState;
    }());
    IDE.WXState = WXState;
})(IDE || (IDE = {}));
//# sourceMappingURL=wxState.js.map