window.addEventListener('DOMContentLoaded', function () {
    var testVertexCode = '\
    attribute vec3 aVertexPosition;\
    attribute vec2 mp;\
    attribute vec3 normal;\
    uniform mat4 mvpMatrix;\
    uniform mat4 invMatrix;\
    uniform vec3 lightDirection;\
    uniform vec4 ambientColor;\
    varying vec2 mp_v;\
    varying vec4 v_Color;\
    varying vec4 v_AmbientColor;\
    void main(void){\
        vec3 invLight = normalize(invMatrix * vec4(lightDirection, 0.0)).xyz;\
        float diffuse  = clamp(dot(normal, invLight), 0.0, 1.0);\
        gl_Position = mvpMatrix * vec4(aVertexPosition, 1.0);\
        mp_v = mp;\
        v_Color = vec4(vec3(diffuse), 1.0);\
        v_AmbientColor = ambientColor;\
    }', testFragmentCode = '\
    varying lowp vec2 mp_v;\
    uniform sampler2D tex;\
    varying lowp vec4 v_Color;\
    varying lowp vec4 v_AmbientColor;\
    void main(void){\
        gl_FragColor=texture2D(tex,mp_v)*v_Color+v_AmbientColor;\
    }';
    var canvas = document.getElementById("renderCanvas");
    canvas.width = 800;
    canvas.height = 800;
    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    // 黑底, 不透明
    gl.clearColor(1, 0.5, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 清除所有
    //gl.clearDepth(1.0);
    //gl.clear(gl.DEPTH_BUFFER_BIT);
    // Enable depth testing / 开启...深度测试?
    gl.enable(gl.DEPTH_TEST);
    // Near things obscure far things / 近处物体遮挡远处物体？
    gl.depthFunc(gl.LEQUAL);
    //定义Vertext Shader
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, testVertexCode);
    gl.compileShader(vertShader);
    //定义Fragment Shader
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, testFragmentCode);
    gl.compileShader(fragShader);
    //定义Program
    var program = gl.createProgram();
    //附加两个Shader到program
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    //引用
    gl.linkProgram(program);
    gl.useProgram(program);
    var seg = 8;
    var cylinder = new Cylinder(seg, 3);
    //UV
    var cubeVerticesTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cylinder.getUVs, gl.STATIC_DRAW);
    var textureCoordAttribute = gl.getAttribLocation(program, 'mp');
    gl.enableVertexAttribArray(textureCoordAttribute);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    //定义顶点索引
    var cubeVerticesIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cylinder.getVertexIndices, gl.STATIC_DRAW);
    //定义顶点数据
    var cubeVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cylinder.getVertices, gl.STATIC_DRAW);
    var vertexPositionAttribute = gl.getAttribLocation(program, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    //定义法线数据
    var cubeNormalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeNormalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cylinder.getNormals, gl.STATIC_DRAW);
    var vertexNormalAttribute = gl.getAttribLocation(program, 'normal');
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
    var tex = gl.getUniformLocation(program, 'tex');
    var texture = gl.createTexture();
    var image = new Image();
    var m = new matIV();
    // 各种矩阵的生成和初始化  
    var mMatrix = m.identity(m.create());
    var vMatrix = m.identity(m.create());
    var pMatrix = m.identity(m.create());
    var mvpMatrix = m.identity(m.create());
    // 视图变换坐标矩阵  
    m.lookAt([6, 4, -2], [0, 0, 0], [0, 1, 0], vMatrix);
    //m.lookAt([0, -4, 6], [0, 0, 0], [0, 1, 0], vMatrix);
    // 投影坐标变换矩阵  
    m.perspective(90, canvas.width / canvas.height, 0.1, 100, pMatrix);
    // 各矩阵想成，得到最终的坐标变换矩阵  
    m.multiply(pMatrix, vMatrix, mvpMatrix);
    m.multiply(mvpMatrix, mMatrix, mvpMatrix);
    // uniformLocation的获取  
    var uniLocation = gl.getUniformLocation(program, 'mvpMatrix');
    // 向uniformLocation中传入坐标变换矩阵  
    gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
    var invMatrix = gl.getUniformLocation(program, 'invMatrix');
    gl.uniformMatrix4fv(invMatrix, false, vMatrix);
    var lightDirection = [-0.5, 0.5, -0.5];
    var lightD = gl.getUniformLocation(program, 'lightDirection');
    gl.uniform3fv(lightD, lightDirection);
    var ambientColor = [0.1, 0.1, 0.1, 1.0];
    var abc = gl.getUniformLocation(program, 'ambientColor');
    gl.uniform4fv(abc, ambientColor);
    //gl.drawElements(gl.TRIANGLES, seg*12, gl.UNSIGNED_SHORT, 0);
    //gl.flush();
    image.onload = function () {
        //---加载纹理
        // 1.对纹理图像进行y轴反转
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        // 2.开开启0号纹理单元
        gl.activeTexture(gl.TEXTURE0);
        // 3.向target绑定纹理对象
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // 4.配置纹理参数
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); //LINEAR
        // 用图片边缘颜色填充空白区域
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // 镜像填充（轴对称）
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT); //MIRRORED_REPEAT
        // 5.配置纹理图像
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        // 6.将0号纹理传递给着色器
        gl.uniform1i(tex, 0);
        gl.drawElements(gl.TRIANGLES, seg * 12, gl.UNSIGNED_SHORT, 0);
        //gl.drawElements(gl.LINE_LOOP, seg * 12, gl.UNSIGNED_SHORT, 0);
        // context的刷新  
        gl.flush();
    };
    image.src = '../images/11.jpg';
});
//# sourceMappingURL=app.js.map