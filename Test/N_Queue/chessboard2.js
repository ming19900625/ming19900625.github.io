/**
 * 棋盘，可自定义长度
 */
var ChessBoard2 = (function () {
    /**
     * 创建一个棋盘
     * @param length 棋盘的大小 length * length
     */
    function ChessBoard2(length, overFuc) {
        this.forward = false;
        this.isOver = false;
        this.overFuc = null;
        this.moveStep = 0;
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
    ChessBoard2.prototype.curMoveIsFine = function () {
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
    ChessBoard2.prototype.cloneResult = function (values) {
        var result = new Array();
        for (var i = 0; i < values.length; i++) {
            result.push(values[i]);
        }
        return result;
    };
    ChessBoard2.prototype.move = function () {
        var _this = this;
        if (_this.forward) {
            _this.curMoveY++;
            //如果超出棋盘，结束
            if (_this.curMoveY > _this.length) {
                _this.isOver = true;
                return;
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
    };
    ChessBoard2.calculate = function (chess) {
        var _this = chess;
        while (!_this.isOver) {
            if (_this.moveStep % 9999 == 0) {
                _this.moveStep++;
                setTimeout(ChessBoard2.calculate(_this), 0);
                return;
            }
            _this.move();
            _this.moveStep++;
        }
        if (_this.overFuc)
            _this.overFuc();
    };
    Object.defineProperty(ChessBoard2.prototype, "getResult", {
        get: function () {
            return this.allResult;
        },
        enumerable: true,
        configurable: true
    });
    return ChessBoard2;
}());
//# sourceMappingURL=chessboard2.js.map