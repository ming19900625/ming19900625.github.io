var IDE;
(function (IDE) {
    var domTools = (function () {
        function domTools() {
        }
        domTools.createIcon = function (imageName) {
            var btnQQ = document.createElement("input");
            btnQQ.className = "icon";
            btnQQ.src = "images/" + imageName + ".png";
            btnQQ.type = "image";
            return btnQQ;
        };
        domTools.createPeople = function (name, app) {
            var btnPeople = document.createElement("input");
            btnPeople.className = "people";
            btnPeople.type = "image";
            btnPeople.value = name;
            btnPeople.onclick = function () {
                app.changeState(new IDE.MessageState(name));
            };
            return btnPeople;
        };
        return domTools;
    }());
    IDE.domTools = domTools;
})(IDE || (IDE = {}));
//# sourceMappingURL=domTools.js.map