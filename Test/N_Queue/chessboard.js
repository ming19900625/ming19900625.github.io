/**
 * 棋盘，可自定义长度
 */
var ChessBoard = (function () {
    /**
     * 创建一个棋盘
     * @param length 棋盘的大小 length * length
     */
    function ChessBoard(length, overFuc) {
        this.forward = false;
        this.isOver = false;
        this.overFuc = null;
        this.moveStep = 0;
        this.innerOver = true;
        if (length <= 3) {
            throw new TypeError("length must larger than 3");
        }
        this.length = length;
        this.curValues = new Array(length);
        this.allResult = new Array();
        this.curMoveY = 0;
        this.forward = true;
        this.overFuc = overFuc;
        //console.log("棋盘创建完成");
    }
    /**
     * 当前走的最后一步是否合适
     *（不会被其他皇后攻击）
     * 这里没有必要判断每一个棋子，只用判断最后走的一步棋即可
     */
    ChessBoard.prototype.curMoveIsFine = function () {
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
    ChessBoard.prototype.cloneResult = function (values) {
        var result = new Array();
        for (var i = 0; i < values.length; i++) {
            result.push(values[i]);
        }
        return result;
    };
    ChessBoard.prototype.move = function () {
        var _this = this;
        function moveInner() {
            if (_this.forward) {
                _this.curMoveY++;
                //如果超出棋盘，结束
                if (_this.curMoveY > _this.length) {
                    _this.isOver = true;
                }
                _this.curValues[_this.curMoveY - 1] = 1;
                if (_this.curMoveIsFine() && _this.curMoveY < _this.length) {
                    _this.forward = true;
                }
                else {
                    _this.forward = false;
                }
            }
            else {
                if (_this.curValues[_this.curMoveY - 1] < _this.length) {
                    _this.curValues[_this.curMoveY - 1]++;
                    if (_this.curMoveIsFine() && _this.curMoveY < _this.length) {
                        _this.forward = true;
                    }
                    else {
                        _this.forward = false;
                    }
                }
                else {
                    _this.curMoveY--;
                    //如果遍历完所有走法，结束
                    if (_this.curMoveY < 1) {
                        _this.isOver = true;
                        return;
                    }
                    _this.forward = false;
                }
            }
        }
        function trampoline(func) {
            var value = func();
            while (typeof value == "function") {
                if (_this.moveStep == 10000) {
                    _this.moveStep = 0;
                    _this.innerOver = true;
                    return;
                }
                value = value();
                _this.moveStep++;
            }
        }
        return trampoline.bind(null, moveInner)();
    };
    ChessBoard.calculate = function (chess) {
        var _this = chess;
        while (!_this.isOver) {
            if (_this.innerOver) {
                _this.innerOver = false;
                _this.move();
            }
            setTimeout(ChessBoard.calculate(_this));
        }
        if (_this.overFuc)
            _this.overFuc();
    };
    Object.defineProperty(ChessBoard.prototype, "getResult", {
        get: function () {
            return this.allResult;
        },
        enumerable: true,
        configurable: true
    });
    return ChessBoard;
}());
//# sourceMappingURL=chessboard.js.map