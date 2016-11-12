var Cylinder = (function () {
    function Cylinder(seg, height) {
        this.seg = seg;
        this.height = height;
    }
    Object.defineProperty(Cylinder.prototype, "getDrawCount", {
        get: function () {
            return this.seg * 12;
        },
        enumerable: true,
        configurable: true
    });
    Cylinder.prototype.setVerticesVector3 = function () {
        this.vertices = new Array();
        var topY = this.height / 2;
        var bottomY = -topY;
        //顶面
        this.vertices.push(new Vector3(0, topY, 0));
        for (var i = 0; i < this.seg; i++) {
            var rad = i / this.seg * 2 * Math.PI;
            var sin = Math.sin(rad);
            var cos = Math.cos(rad);
            this.vertices.push(new Vector3(cos, topY, sin));
        }
        //底面
        this.vertices.push(new Vector3(0, bottomY, 0));
        for (var i = 0; i < this.seg; i++) {
            var rad = i / this.seg * 2 * Math.PI;
            var sin = Math.sin(rad);
            var cos = Math.cos(rad);
            this.vertices.push(new Vector3(cos, bottomY, sin));
        }
        //侧面
        for (var i = 0; i < this.seg; i++) {
            var rad1 = i / this.seg * 2 * Math.PI;
            var sin1 = Math.sin(rad1);
            var cos1 = Math.cos(rad1);
            var rad2 = (i + 1) / this.seg * 2 * Math.PI;
            var sin2 = Math.sin(rad2);
            var cos2 = Math.cos(rad2);
            this.vertices.push(new Vector3(cos1, topY, sin1));
            this.vertices.push(new Vector3(cos1, bottomY, sin1));
            this.vertices.push(new Vector3(cos2, bottomY, sin2));
            this.vertices.push(new Vector3(cos2, topY, sin2));
        }
    };
    Object.defineProperty(Cylinder.prototype, "getVertices", {
        //获取顶点信息
        get: function () {
            this.setVerticesVector3();
            var cylinderVertices = new Float32Array(this.vertices.length * 3);
            for (var i = 0; i < this.vertices.length; i++) {
                var j = i * 3;
                cylinderVertices[j + 0] = this.vertices[i].x;
                cylinderVertices[j + 1] = this.vertices[i].y;
                cylinderVertices[j + 2] = this.vertices[i].z;
            }
            return cylinderVertices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cylinder.prototype, "getVertexIndices", {
        //获取顶点索引
        get: function () {
            var cylinderVertexIndices = new Uint16Array(this.seg * 12);
            //顶部索引
            for (var i = 0; i < this.seg; i++) {
                var j = i * 3;
                var startIndex = 0;
                cylinderVertexIndices[j] = startIndex;
                cylinderVertexIndices[j + 2] = startIndex + i + 1;
                cylinderVertexIndices[j + 1] = startIndex + i + 2;
                if (i == this.seg - 1) {
                    cylinderVertexIndices[j + 1] = 1;
                }
            }
            //底部索引
            for (var i = 0; i < this.seg; i++) {
                var j = (i + this.seg) * 3;
                var startIndex = this.seg + 1;
                cylinderVertexIndices[j] = startIndex;
                cylinderVertexIndices[j + 1] = startIndex + i + 1;
                cylinderVertexIndices[j + 2] = startIndex + i + 2;
                if (i == this.seg - 1) {
                    cylinderVertexIndices[j + 2] = this.seg + 2;
                }
            }
            //侧面索引
            for (var i = 0; i < this.seg; i++) {
                var j = this.seg * 2 * 3 + i * 6;
                var startIndex = this.seg * 2 + 2;
                //cylinderVertexIndices[j] = startIndex + 4 * i;
                //cylinderVertexIndices[j + 1] = startIndex + 4 * i + 1;
                //cylinderVertexIndices[j + 2] = startIndex + 4 * i + 2;
                //cylinderVertexIndices[j + 3] = startIndex + 4 * i;
                //cylinderVertexIndices[j + 4] = startIndex + 4 * i + 2;
                //cylinderVertexIndices[j + 5] = startIndex + 4 * i + 3;
                cylinderVertexIndices[j] = startIndex + 4 * i;
                cylinderVertexIndices[j + 1] = startIndex + 4 * i + 2;
                cylinderVertexIndices[j + 2] = startIndex + 4 * i + 1;
                cylinderVertexIndices[j + 3] = startIndex + 4 * i;
                cylinderVertexIndices[j + 4] = startIndex + 4 * i + 3;
                cylinderVertexIndices[j + 5] = startIndex + 4 * i + 2;
            }
            return cylinderVertexIndices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cylinder.prototype, "getUVs", {
        //获取UV
        get: function () {
            var uvs = new Array();
            uvs.push(new Vector2(0.5, 0.5));
            for (var i = 0; i < this.seg; i++) {
                var rad = i / this.seg * 2 * Math.PI;
                var sin = Math.sin(rad);
                var cos = Math.cos(rad);
                uvs.push(new Vector2((cos + 1) / 2, (sin + 1) / 2));
            }
            //底面
            uvs.push(new Vector2(0.5, 0.5));
            for (var i = 0; i < this.seg; i++) {
                var rad = i / this.seg * 2 * Math.PI;
                var sin = Math.sin(rad);
                var cos = Math.cos(rad);
                uvs.push(new Vector2((cos + 1) / 2, (sin + 1) / 2));
            }
            //侧面
            for (var i = 0; i < this.seg; i++) {
                var rad1 = i / this.seg * 2 * Math.PI;
                //let sin1: number = Math.sin(rad1);
                //let cos1: number = Math.cos(rad1);
                //let rad2: number = (i + 1) / this.seg * 2 * Math.PI;
                //let sin2: number = Math.sin(rad2);
                //let cos2: number = Math.cos(rad2);
                uvs.push(new Vector2(i / this.seg, 0));
                uvs.push(new Vector2(i / this.seg, 1));
                uvs.push(new Vector2((i + 1) / this.seg, 1));
                uvs.push(new Vector2((i + 1) / this.seg, 0));
            }
            var cylinderUVs = new Float32Array(uvs.length * 2);
            for (var i = 0; i < uvs.length; i++) {
                var j = i * 2;
                cylinderUVs[j + 0] = uvs[i].x;
                cylinderUVs[j + 1] = uvs[i].y;
            }
            return cylinderUVs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cylinder.prototype, "getNormals", {
        get: function () {
            var normals = new Array();
            //顶面
            for (var i = 0; i < this.seg + 1; i++) {
                normals.push(new Vector3(0, 1, 0));
            }
            //底面
            for (var i = 0; i < this.seg + 1; i++) {
                normals.push(new Vector3(0, -1, 0));
            }
            //侧面
            for (var i = 0; i < this.seg; i++) {
                var rad1 = i / this.seg * 2 * Math.PI;
                var sin1 = Math.sin(rad1);
                var cos1 = Math.cos(rad1);
                var rad2 = (i + 1) / this.seg * 2 * Math.PI;
                var sin2 = Math.sin(rad2);
                var cos2 = Math.cos(rad2);
                normals.push(new Vector3(cos1, 0, sin1));
                normals.push(new Vector3(cos1, 0, sin1));
                normals.push(new Vector3(cos2, 0, sin2));
                normals.push(new Vector3(cos2, 0, sin2));
            }
            var cylinderNormals = new Float32Array(normals.length * 3);
            for (var i = 0; i < normals.length; i++) {
                var j = i * 3;
                cylinderNormals[j + 0] = normals[i].x;
                cylinderNormals[j + 1] = normals[i].y;
                cylinderNormals[j + 2] = normals[i].z;
            }
            return cylinderNormals;
        },
        enumerable: true,
        configurable: true
    });
    Cylinder.prototype.getString = function (materialName) {
        var result = "";
        result += "#this file create by fsm's program\r\n";
        result += "o Cylinder\r\n"; //名字
        result += "mtllib " + materialName + "\r\n"; //引用关联材质
        var verticesArray = this.getVertices;
        for (var i = 0; i < verticesArray.length; i += 3) {
            result += "v " + verticesArray[i].toFixed(2) + " " + verticesArray[i + 1].toFixed(2) + " " + verticesArray[i + 2].toFixed(2) + "\r\n";
        }
        var uvArray = this.getUVs;
        for (var i = 0; i < uvArray.length; i += 2) {
            result += "vt " + uvArray[i].toFixed(2) + " " + uvArray[i + 1].toFixed(2) + "\r\n";
        }
        var normalArray = this.getNormals;
        for (var i = 0; i < normalArray.length; i += 3) {
            result += "vn " + normalArray[i].toFixed(2) + " " + normalArray[i + 1].toFixed(2) + " " + normalArray[i + 2].toFixed(2) + "\r\n";
        }
        result += "usemtl material1\r\n"; //引用关联材质
        var faceArray = this.getVertexIndices;
        for (var i = 0; i < faceArray.length; i += 3) {
            var a = faceArray[i] + 1;
            var b = faceArray[i + 1] + 1;
            var c = faceArray[i + 2] + 1;
            result += "f " + a + "/" + a + "/" + a + " " + b + "/" + b + "/" + b + " " + c + "/" + c + "/" + c + "\r\n";
        }
        return result;
    };
    Cylinder.prototype.getMaterialStr = function (picName) {
        var result = "";
        result += "#this is create by fsm\r\n"; //#开头代表注释
        result += "newmtl material1\r\n"; //定义一个材质，一个mtl文件中可以定义多个材质
        result += "Ns 96.078431\r\n"; //反射指数描述
        result += "Ka 1.000000 1.000000 1.000000\r\n"; //环境反射（R G B）
        result += "Kd 0.640000 0.640000 0.640000\r\n"; //漫反射（R G B）
        result += "Ks 0.500000 0.500000 0.500000\r\n"; //镜面反射（R G B）
        result += "Ke 0.000000 0.000000 0.000000\r\n"; //
        result += "Ni 1.000000\r\n"; //折射率（0.001~10 正常为1 玻璃为1.5）
        result += "d 1.000000\r\n"; //渐隐指数描述（0.0~1.0）
        result += "illum 2\r\n"; //光照模型
        result += "map_Kd " + picName; //贴图(本次练习除了这项，其他都不用关心，了解就行)
        return result;
    };
    return Cylinder;
}());
//# sourceMappingURL=Cylinder.js.map