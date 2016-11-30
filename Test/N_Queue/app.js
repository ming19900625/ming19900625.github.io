window.onload = function () {
    var input = document.getElementById("inputValue");
    var btn = document.getElementById("btn");
    var resultCount = document.getElementById("resultCount");
    var allResult = document.getElementById("allResult");
    var i = 0;
    btn.onclick = function () {
        var length = parseInt(input.value);
        resultCount.innerText = "结果计算中，请稍后...";
        //闭包解决方案  解决堆栈溢出的问题  数据多的时候页面会无响应
        setTimeout(function () {
            try {
                var chessBoard = new ChessBoard1(length);
                var result = chessBoard.getResult;
                resultCount.innerText = length + "皇后的结果总数为：" + result.length;
                allResult.value = "";
                for (var i = 0; i < result.length; i++) {
                    if (i > 100) {
                        allResult.value += "此处省略剩余的结果...";
                        return;
                    }
                    allResult.value += result[i].toString() + "\r\n";
                }
            }
            catch (e) {
                alert(e.message);
            }
        }, 100);
        //异步解决方案  解决数据多的时候页面无相应   但数据多的时候会有堆栈溢出
        //setTimeout(() => {
        //    try {
        //        var chessBoard: ChessBoard2 = new ChessBoard2(length, () => {
        //            let result: Array<Array<number>> = chessBoard.getResult;
        //            resultCount.innerText = length + "皇后的结果总数为：" + result.length;
        //            var resultValue = "";
        //            for (var i: number = 0; i < result.length; i++) {
        //                if (i > 100) {
        //                    allResult.value += "此处省略剩余的结果...";
        //                    return;
        //                }
        //                resultValue += result[i].toString() + "\r\n";
        //            }
        //            allResult.value = resultValue;
        //        });
        //        ChessBoard2.calculate(chessBoard);
        //    }
        //    catch (e) {
        //        alert(e.message);
        //    }
        //}, 0);
        //异步+闭包解决方案  暂未实现
        //setTimeout(() => {
        //    try {
        //        var chessBoard: ChessBoard = new ChessBoard(length, () => {
        //            let result: Array<Array<number>> = chessBoard.getResult;
        //            resultCount.innerText = length + "皇后的结果总数为：" + result.length;
        //            var resultValue = "";
        //            for (var i: number = 0; i < result.length; i++) {
        //                if (i > 100) {
        //                    allResult.value += "此处省略剩余的结果...";
        //                    return;
        //                }
        //                resultValue += result[i].toString() + "\r\n";
        //            }
        //            allResult.value = resultValue;
        //        });
        //        ChessBoard.calculate(chessBoard);
        //    }
        //    catch (e) {
        //        alert(e.message);
        //    }
        //}, 0);
    };
};
//# sourceMappingURL=app.js.map