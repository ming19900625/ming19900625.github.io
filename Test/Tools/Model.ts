class Model {
    private vertexs: Float32Array;
    private uvs: Float32Array;
    private normals: Float32Array;
    private vertexIndexs: Uint16Array;
    //private drawCount: number;

    constructor(textContent: string) {
        let lines: string[];
        if (textContent.indexOf('\r\n') >= 0) {
            lines = textContent.split('\r\n');
        } else {
            lines = textContent.split('\n');
        }

        let vertexNums: number[] = new Array<number>();
        let uvNums: number[] = new Array<number>();
        let normalNums: number[] = new Array<number>();
        let vertexIndexNums: number[] = new Array<number>();

        let uvVector2s: Vector2[] = new Array<Vector2>();
        let normalVector3s: Vector3[] = new Array<Vector3>();

        for (let i: number = 0; i < lines.length; i++) {
            let strs: string[] = lines[i].split(' ');
            if (strs[0] == "v") {
                vertexNums.push(parseFloat(strs[1]));
                vertexNums.push(parseFloat(strs[2]));
                vertexNums.push(parseFloat(strs[3]));
            }
            if (strs[0] == "vt") {
                let uvVector2: Vector2 = new Vector2(parseFloat(strs[1]), parseFloat(strs[2]));
                uvVector2s.push(uvVector2);
                
            }
            if (strs[0] == "vn") {
                let normalVector3: Vector3 = new Vector3(parseFloat(strs[1]), parseFloat(strs[2]), parseFloat(strs[3]));
                normalVector3s.push(normalVector3);

            }
            if (strs[0] == "f") {
                for (let j: number = 1; j < strs.length; j++) {
                    let strss: string[] = strs[j].split('/')
                    for (let k: number = 0; k < strss.length; k++) {
                        let tempValue = strss[k];
                        if (tempValue.length <= 0)
                            continue;
                        if (k == 0) {
                            vertexIndexNums.push(parseInt(tempValue) - 1);
                        }
                        if (k == 1) {
                            let curIndex = parseInt(tempValue) - 1;
                            let curUvVector2: Vector2 = uvVector2s[curIndex];
                            uvNums.push(curUvVector2.x);
                            uvNums.push(curUvVector2.y);
                        }
                        if (k == 2) {
                            let curIndex = parseInt(tempValue) - 1;
                            let curNormalVector3: Vector3 = normalVector3s[curIndex];
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

    public get getVertexs(): Float32Array {
        return this.vertexs;
    }

    public get getUVs(): Float32Array {
        return this.uvs;
    }

    public get getNormals(): Float32Array {
        return this.normals;
    }

    public get getVertexIndexs(): Uint16Array {
        return this.vertexIndexs;
    }

    public get getDrawCount(): number {
        return this.vertexIndexs.length;
    }
}