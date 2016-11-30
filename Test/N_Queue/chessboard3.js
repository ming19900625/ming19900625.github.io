/**
 * 棋盘，可自定义长度
 */
var ChessBoard3 = (function () {
    /**
     * 创建一个棋盘
     * @param length 棋盘的大小 length * length
     */
    function ChessBoard3(length) {
        if (length <= 3) {
            throw new TypeError("length must larger than 3");
        }
        this.length = length;
        this.curValues = new Array(length);
        this.allResult = new Array();
        this.curMoveY = 0;
        //console.log("棋盘创建完成");
    }
    /**
     * 当前走的最后一步是否合适
     *（不会被其他皇后攻击）
     * 这里没有必要判断每一个棋子，只用判断最后走的一步棋即可
     */
    ChessBoard3.prototype.curMoveIsFine = function () {
        //取到最后一步走的行数
        var lastY = this.curMoveY - 1;
        //取到最后一步走的列数
        var lastX = this.curValues[lastY];
        //这个数据结构决定了行数肯定不会相同，这里只需要关心不在同一列，不在对角线就OK
        //判断是否跟之前的皇后在同一列
        if (this.curValues.indexOf(lastX) != lastY) {
            return false;
        }
        //判断之前的皇后中有无在对角线上
        for (var i = 0; i < lastY; i++) {
            var j = this.curValues[i];
            if ((i + j) == (lastX + lastY)) {
                //有皇后在右上角
                return false;
            }
            if ((i + j) == (lastX + lastY - 2 * (lastY - i))) {
                //有皇后在左上角
                return false;
            }
        }
        //如果当前步数合适，并且是最后一行，记录结果
        if (lastY == (this.length - 1)) {
            this.allResult.push(this.cloneResult(this.curValues));
        }
        return true;
    };
    ChessBoard3.prototype.cloneResult = function (values) {
        var result = new Array();
        for (var i = 0; i < values.length; i++) {
            result.push(values[i]);
        }
        return result;
    };
    ChessBoard3.prototype.move = function () {
        var _this = this;
        function forward() {
            _this.curMoveY++;
            //如果超出棋盘，结束
            if (_this.curMoveY > _this.length)
                return;
            _this.curValues[_this.curMoveY - 1] = 1;
            if (_this.curMoveIsFine() && _this.curMoveY < _this.length) {
                return function () {
                    return forward();
                };
            }
            else {
                return function () {
                    return change();
                };
            }
        }
        function change() {
            if (_this.curValues[_this.curMoveY - 1] < _this.length) {
                _this.curValues[_this.curMoveY - 1]++;
                if (_this.curMoveIsFine() && _this.curMoveY < _this.length) {
                    return function () {
                        return forward();
                    };
                }
                else {
                    return function () {
                        return change();
                    };
                }
            }
            else {
                _this.curValues[_this.curMoveY - 1] = 0;
                _this.curMoveY--;
                //如果遍历完所有走法，结束
                if (_this.curMoveY < 1) {
                    return;
                }
                return function () {
                    return change();
                };
            }
        }
        function trampoline(func) {
            var value = func();
            while (typeof value == "function") {
                value = value();
            }
            return value;
        }
        return trampoline.bind(null, forward)();
    };
    Object.defineProperty(ChessBoard3.prototype, "getResult", {
        get: function () {
            this.move();
            return this.allResult;
        },
        enumerable: true,
        configurable: true
    });
    return ChessBoard3;
}());
//# sourceMappingURL=chessboard3.js.map