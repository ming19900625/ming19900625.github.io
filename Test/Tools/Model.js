var Model = (function () {
    //private drawCount: number;
    function Model(textContent) {
        var lines;
        if (textContent.indexOf('\r\n') >= 0) {
            lines = textContent.split('\r\n');
        }
        else {
            lines = textContent.split('\n');
        }
        var vertexNums = new Array();
        var uvNums = new Array();
        var normalNums = new Array();
        var vertexIndexNums = new Array();
        var uvVector2s = new Array();
        var normalVector3s = new Array();
        for (var i = 0; i < lines.length; i++) {
            var strs = lines[i].split(' ');
            if (strs[0] == "v") {
                vertexNums.push(parseFloat(strs[1]));
                vertexNums.push(parseFloat(strs[2]));
                vertexNums.push(parseFloat(strs[3]));
            }
            if (strs[0] == "vt") {
                var uvVector2 = new Vector2(parseFloat(strs[1]), parseFloat(strs[2]));
                uvVector2s.push(uvVector2);
            }
            if (strs[0] == "vn") {
                var normalVector3 = new Vector3(parseFloat(strs[1]), parseFloat(strs[2]), parseFloat(strs[3]));
                normalVector3s.push(normalVector3);
            }
            if (strs[0] == "f") {
                for (var j = 1; j < strs.length; j++) {
                    var strss = strs[j].split('/');
                    for (var k = 0; k < strss.length; k++) {
                        var tempValue = strss[k];
                        if (tempValue.length <= 0)
                            continue;
                        if (k == 0) {
                            vertexIndexNums.push(parseInt(tempValue) - 1);
                        }
                        if (k == 1) {
                            var curIndex = parseInt(tempValue) - 1;
                            var curUvVector2 = uvVector2s[curIndex];
                            uvNums.push(curUvVector2.x);
                            uvNums.push(curUvVector2.y);
                        }
                        if (k == 2) {
                            var curIndex = parseInt(tempValue) - 1;
                            var curNormalVector3 = normalVector3s[curIndex];
                            normalNums.push(curNormalVector3.x);
                            normalNums.push(curNormalVector3.y);
                            normalNums.push(curNormalVector3.z);
                        }
                    }
                }
            }
        }
        this.vertexs = new Float32Array(vertexNums);
        this.uvs = new Float32Array(uvNums);
        this.normals = new Float32Array(normalNums);
        this.vertexIndexs = new Uint16Array(vertexIndexNums);
    }
    Object.defineProperty(Model.prototype, "getVertexs", {
        get: function () {
            return this.vertexs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "getUVs", {
        get: function () {
            return this.uvs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "getNormals", {
        get: function () {
            return this.normals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "getVertexIndexs", {
        get: function () {
            return this.vertexIndexs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "getDrawCount", {
        get: function () {
            return this.vertexIndexs.length;
        },
        enumerable: true,
        configurable: true
    });
    return Model;
}());
//# sourceMappingURL=Model.js.map