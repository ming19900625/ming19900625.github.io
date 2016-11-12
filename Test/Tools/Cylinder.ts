class Cylinder {
    seg: number;//分段
    height: number;
    vertices: Vector3[];
    constructor(seg: number, height: number) {
        this.seg = seg;
        this.height = height;
    }

    public get getDrawCount(): number {
        return this.seg * 12;
    }

    public setVerticesVector3(): void {
        this.vertices = new Array<Vector3>();

        let topY = this.height / 2;
        let bottomY = -topY;

        //顶面
        this.vertices.push(new Vector3(0, topY, 0));
        for (let i: number = 0; i < this.seg; i++) {
            let rad: number = i / this.seg * 2 * Math.PI;
            let sin: number = Math.sin(rad);
            let cos: number = Math.cos(rad);
            this.vertices.push(new Vector3(cos, topY, sin));
        }
        //底面
        this.vertices.push(new Vector3(0, bottomY, 0));
        for (let i: number = 0; i < this.seg; i++) {
            let rad: number = i / this.seg * 2 * Math.PI;
            let sin: number = Math.sin(rad);
            let cos: number = Math.cos(rad);
            this.vertices.push(new Vector3(cos, bottomY, sin));
        }
        //侧面
        for (let i: number = 0; i < this.seg; i++) {
            let rad1: number = i / this.seg * 2 * Math.PI;
            let sin1: number = Math.sin(rad1);
            let cos1: number = Math.cos(rad1);
            let rad2: number = (i + 1) / this.seg * 2 * Math.PI;
            let sin2: number = Math.sin(rad2);
            let cos2: number = Math.cos(rad2);
            this.vertices.push(new Vector3(cos1, topY, sin1));
            this.vertices.push(new Vector3(cos1, bottomY, sin1));
            this.vertices.push(new Vector3(cos2, bottomY, sin2));
            this.vertices.push(new Vector3(cos2, topY, sin2));
        }
    }
    //获取顶点信息
    public get getVertices(): Float32Array {
        this.setVerticesVector3();
        let cylinderVertices: Float32Array = new Float32Array(this.vertices.length*3);
        for (let i: number = 0; i < this.vertices.length; i++)
        {
            let j: number = i * 3;
            cylinderVertices[j + 0] = this.vertices[i].x;
            cylinderVertices[j + 1] = this.vertices[i].y;
            cylinderVertices[j + 2] = this.vertices[i].z;
        }
        return cylinderVertices;
    }

    //获取顶点索引
    public get getVertexIndices(): Uint16Array
    {
        let cylinderVertexIndices: Uint16Array = new Uint16Array(this.seg*12);
        //顶部索引
        for (let i: number = 0; i < this.seg; i++) {
            let j: number = i * 3;
            let startIndex = 0;
            cylinderVertexIndices[j] = startIndex;
            cylinderVertexIndices[j + 2] = startIndex + i + 1;
            cylinderVertexIndices[j + 1] = startIndex + i + 2;
            if (i == this.seg - 1)
            {
                cylinderVertexIndices[j + 1] = 1;
            }
        }
        //底部索引
        for (let i: number = 0; i < this.seg; i++) {
            let j: number = (i + this.seg) * 3;
            let startIndex = this.seg + 1;
            cylinderVertexIndices[j] = startIndex;
            cylinderVertexIndices[j + 1] = startIndex + i + 1;
            cylinderVertexIndices[j + 2] = startIndex + i + 2;
            if (i == this.seg - 1) {
                cylinderVertexIndices[j + 2] = this.seg + 2;
            }
        }

        //侧面索引
        for (let i: number = 0; i < this.seg; i ++) {
            let j: number = this.seg * 2 * 3 + i * 6;
            let startIndex = this.seg * 2 + 2;
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
    }

    //获取UV
    public get getUVs(): Float32Array {
        let uvs: Vector2[] = new Array<Vector2>();

        uvs.push(new Vector2(0.5, 0.5));
        for (let i: number = 0; i < this.seg; i++) {
            let rad: number = i / this.seg * 2 * Math.PI;
            let sin: number = Math.sin(rad);
            let cos: number = Math.cos(rad);
            uvs.push(new Vector2((cos + 1) / 2, (sin + 1) / 2));
        }
        //底面
        uvs.push(new Vector2(0.5, 0.5));
        for (let i: number = 0; i < this.seg; i++) {
            let rad: number = i / this.seg * 2 * Math.PI;
            let sin: number = Math.sin(rad);
            let cos: number = Math.cos(rad);
            uvs.push(new Vector2((cos + 1) / 2, (sin + 1) / 2));
        }
        //侧面
        for (let i: number = 0; i < this.seg; i++) {
            let rad1: number = i / this.seg * 2 * Math.PI;
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

        let cylinderUVs: Float32Array = new Float32Array(uvs.length * 2);
        for (let i: number = 0; i < uvs.length; i++) {
            let j: number = i * 2;
            cylinderUVs[j + 0] = uvs[i].x;
            cylinderUVs[j + 1] = uvs[i].y;
        }
        return cylinderUVs;
    }

    public get getNormals(): Float32Array {
        let normals: Vector3[] = new Array<Vector3>();

        //顶面
        for (let i: number = 0; i < this.seg+1; i++) {
            normals.push(new Vector3(0, 1, 0));
        }
        //底面
        for (let i: number = 0; i < this.seg+1; i++) {
            normals.push(new Vector3(0, -1, 0));
        }
        //侧面
        for (let i: number = 0; i < this.seg; i++) {
            let rad1: number = i / this.seg * 2 * Math.PI;
            let sin1: number = Math.sin(rad1);
            let cos1: number = Math.cos(rad1);
            let rad2: number = (i + 1) / this.seg * 2 * Math.PI;
            let sin2: number = Math.sin(rad2);
            let cos2: number = Math.cos(rad2);
            normals.push(new Vector3(cos1, 0, sin1));
            normals.push(new Vector3(cos1, 0, sin1));
            normals.push(new Vector3(cos2, 0, sin2));
            normals.push(new Vector3(cos2, 0, sin2));
        }

        let cylinderNormals: Float32Array = new Float32Array(normals.length * 3);
        for (let i: number = 0; i < normals.length; i++) {
            let j: number = i * 3;
            cylinderNormals[j + 0] = normals[i].x;
            cylinderNormals[j + 1] = normals[i].y;
            cylinderNormals[j + 2] = normals[i].z;
        }
        return cylinderNormals;
    }

    public getString(materialName:string): string {
        let result: string = "";
        result += "#this file create by fsm's program\r\n";
        result += "o Cylinder\r\n";//名字
        result += "mtllib " + materialName+"\r\n";//引用关联材质
        let verticesArray: Float32Array = this.getVertices;
        for (let i: number = 0; i < verticesArray.length; i += 3) {
            result += "v " + verticesArray[i].toFixed(2) + " " + verticesArray[i + 1].toFixed(2) + " " + verticesArray[i + 2].toFixed(2) + "\r\n";
        }
        let uvArray: Float32Array = this.getUVs;
        for (let i: number = 0; i < uvArray.length; i += 2) {
            result += "vt " + uvArray[i].toFixed(2) + " " + uvArray[i + 1].toFixed(2) + "\r\n";
        }
        let normalArray: Float32Array = this.getNormals;
        for (let i: number = 0; i < normalArray.length; i += 3){
            result += "vn " + normalArray[i].toFixed(2) + " " + normalArray[i + 1].toFixed(2) + " " + normalArray[i + 2].toFixed(2) + "\r\n";
        }
        result += "usemtl material1\r\n";//引用关联材质
        let faceArray: Uint16Array = this.getVertexIndices;
        for (let i: number = 0; i < faceArray.length; i += 3) {
            let a: number = faceArray[i] + 1;
            let b: number = faceArray[i + 1] + 1;
            let c: number = faceArray[i + 2] + 1;
            result += "f " + a + "/" + a + "/" + a + " " + b + "/" + b + "/" + b + " " + c + "/" + c + "/" + c + "\r\n";
        }
        return result;
    }

    public getMaterialStr(picName:string):string {
        let result: string = "";
        result += "#this is create by fsm\r\n";          //#开头代表注释
        result += "newmtl material1\r\n"                 //定义一个材质，一个mtl文件中可以定义多个材质
        result += "Ns 96.078431\r\n"                     //反射指数描述
        result += "Ka 1.000000 1.000000 1.000000\r\n"    //环境反射（R G B）
        result += "Kd 0.640000 0.640000 0.640000\r\n"    //漫反射（R G B）
        result += "Ks 0.500000 0.500000 0.500000\r\n"    //镜面反射（R G B）
        result += "Ke 0.000000 0.000000 0.000000\r\n"    //
        result += "Ni 1.000000\r\n"                      //折射率（0.001~10 正常为1 玻璃为1.5）
        result += "d 1.000000\r\n"                       //渐隐指数描述（0.0~1.0）
        result += "illum 2\r\n"                          //光照模型
        result += "map_Kd " + picName;                   //贴图(本次练习除了这项，其他都不用关心，了解就行)
        return result;
    }

}