var IDE;
(function (IDE) {
    var IQIYState = (function () {
        function IQIYState() {
        }
        IQIYState.prototype.onInit = function (app) {
            var titleLabel = document.getElementById("titlelabel");
            titleLabel.innerText = "爱奇艺";
            var contentDiv = document.getElementById("content");
            var curDiv = document.getElementById("iqiy");
            if (curDiv == null) {
                var curDiv = document.createElement("div");
                curDiv.id = "iqiy";
                curDiv.style.height = "430px";
                curDiv.style.width = "300px";
                var video = document.createElement("video");
                video.style.height = "430px";
                video.style.width = "300px";
                video.style.backgroundColor = "black";
                video.src = "http://www.w3school.com.cn/i/movie.ogg";
                video.autoplay = true;
                video.loop = true;
                curDiv.appendChild(video);
                contentDiv.appendChild(curDiv);
            }
            else {
                curDiv.hidden = false;
            }
        };
        IQIYState.prototype.onExit = function () {
            var curDiv = document.getElementById("iqiy");
            if (curDiv != null) {
                curDiv.hidden = true;
            }
        };
        return IQIYState;
    }());
    IDE.IQIYState = IQIYState;
})(IDE || (IDE = {}));
//# sourceMappingURL=iqiyState.js.map