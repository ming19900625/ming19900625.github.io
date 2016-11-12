var IDE;
(function (IDE) {
    var QQState = (function () {
        function QQState() {
        }
        QQState.prototype.onInit = function (app) {
            var titleLabel = document.getElementById("titlelabel");
            titleLabel.innerText = "QQ";
            var contentDiv = document.getElementById("content");
            var curDiv = document.getElementById("qq");
            if (curDiv == null) {
                var curDiv = document.createElement("div");
                curDiv.id = "qq";
                curDiv.style.height = "430px";
                curDiv.style.width = "300px";
                //var people: HTMLInputElement = domTools.createPeople("lili", app);
                curDiv.appendChild(IDE.domTools.createPeople("我的手机", app));
                curDiv.appendChild(IDE.domTools.createPeople("李磊", app));
                curDiv.appendChild(IDE.domTools.createPeople("韩梅梅", app));
                curDiv.appendChild(IDE.domTools.createPeople("吉姆", app));
                curDiv.appendChild(IDE.domTools.createPeople("汤姆", app));
                curDiv.appendChild(IDE.domTools.createPeople("韩梅梅", app));
                curDiv.appendChild(IDE.domTools.createPeople("吉姆", app));
                curDiv.appendChild(IDE.domTools.createPeople("汤姆", app));
                contentDiv.appendChild(curDiv);
            }
            else {
                curDiv.hidden = false;
            }
        };
        QQState.prototype.onExit = function () {
            var curDiv = document.getElementById("qq");
            if (curDiv != null) {
                curDiv.hidden = true;
            }
        };
        return QQState;
    }());
    IDE.QQState = QQState;
})(IDE || (IDE = {}));
//# sourceMappingURL=qqState.js.map