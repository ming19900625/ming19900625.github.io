/**
 * 棋盘，可自定义长度
 */
class ChessBoard1 {
    private length: number;
    //存的当前棋盘每一行皇后的位置
    private curValues: Array<number>;
    private allResult: Array<Array<number>>;

    private curMoveY: number;
    /**
     * 创建一个棋盘
     * @param length 棋盘的大小 length * length
     */
    constructor(length: number) {
        if (length <= 3) {
            throw new TypeError("length must larger than 3");
        }
        this.length = length;
        this.curValues = new Array<number>(length);
        this.allResult = new Array<Array<number>>();
        this.curMoveY = 0;
        //console.log("棋盘创建完成");
    }

    /**
     * 当前走的最后一步是否合适
     *（不会被其他皇后攻击）
     * 这里没有必要判断每一个棋子，只用判断最后走的一步棋即可
     */
    private curMoveIsFine(): boolean {
        //取到最后一步走的行数
        let lastY: number = this.curMoveY - 1;

        //取到最后一步走的列数
        let lastX: number = this.curValues[lastY];

        //这个数据结构决定了行数肯定不会相同，这里只需要关心不在同一列，不在对角线就OK

        //判断是否跟之前的皇后在同一列
        if (this.curValues.indexOf(lastX) != lastY) {
            return false;
        }

        //判断之前的皇后中有无在对角线上
        for (let i: number = 0; i < lastY; i++){
            let j = this.curValues[i];
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
        
        let result = new Array<number>();
        for (let i = 0; i < values.length; i++)
        {
            result.push(values[i]);
        }
        return result;
    }

    private move() {
        let _this = this;
        function forward() {
            _this.curMoveY++;
            //如果超出棋盘，结束
            if (_this.curMoveY > _this.length)
                return;
            _this.curValues[_this.curMoveY - 1] = 1;
            if (_this.curMoveIsFine() && _this.curMoveY < _this.length) {
                return function () {
                    return forward();
                }
            }
            else {
                return function () {
                    return change();
                }
            }
        }
        function change() {
            if (_this.curValues[_this.curMoveY - 1] < _this.length) {
                _this.curValues[_this.curMoveY - 1]++;
                if (_this.curMoveIsFine() && _this.curMoveY < _this.length) {
                    return function () {
                        return forward();
                    }
                } else {
                    return function () {
                        return change();
                    }
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
                }
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
    }

    public get getResult(): Array<Array<number>> {
        this.move();
        return this.allResult;
    }
}