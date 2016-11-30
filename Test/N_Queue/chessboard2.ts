/**
 * 棋盘，可自定义长度
 */
class ChessBoard2 {
    private length: number;
    //存的当前棋盘每一行皇后的位置
    private curValues: Array<number>;
    private allResult: Array<Array<number>>;

    private curMoveY: number;
    private forward: boolean = false;
    private isOver: boolean = false;
    private overFuc: Function = null;
    private moveStep: number = 0;
    /**
     * 创建一个棋盘
     * @param length 棋盘的大小 length * length
     */
    constructor(length: number, overFuc: Function) {
        if (length <= 3) {
            throw new TypeError("length must larger than 3");
        }
        this.length = length;
        this.curValues = new Array<number>(length);
        this.allResult = new Array<Array<number>>();
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
    private curMoveIsFine(): boolean {
        //取到最后一步走的行数
        var lastY: number = this.curMoveY - 1;

        //取到最后一步走的列数
        var lastX: number = this.curValues[lastY];

        //这个数据结构决定了行数肯定不会相同，这里只需要关心不在同一列，不在对角线就OK

        //判断是否跟之前的皇后在同一列
        if (this.curValues.indexOf(lastX) != lastY) {
            return false;
        }

        //判断之前的皇后中有无在对角线上
        for (var i: number = 0; i < lastY; i++){
            var j = this.curValues[i];
            if ((i + j) == (lastX + lastY)) {
                //有皇后在右上角
                return false;
            }
            if ((i + j) == (lastX + lastY - 2 * (lastY - i))){
                //有皇后在左上角
                return false;
            }
        }

        //如果当前步数合适，并且是最后一行，记录结果
        if (lastY == (this.length - 1)) {
            this.allResult.push(this.cloneResult(this.curValues));
            //console.log(this.curValues.toString());
        }
        return true;
    }

    private cloneResult(values: Array<number>): Array<number> {
        
        var result = new Array<number>();
        for (let i = 0; i < values.length; i++)
        {
            result.push(values[i]);
        }
        return result;
    }

    private move() {
        let _this = this;
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
                } else {
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

    public static calculate(chess:ChessBoard2) {
        let _this = chess;
        while (!_this.isOver) {
            if (_this.moveStep % 9999 == 0) {
                _this.moveStep++;
                setTimeout(ChessBoard2.calculate(_this),0)
                return;
            }
            _this.move();
            _this.moveStep++;
        }
        if (_this.overFuc)
            _this.overFuc();
    }

    public get getResult(): Array<Array<number>> {
        return this.allResult;
    }
}