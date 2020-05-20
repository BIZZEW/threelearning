import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry, Vector2 } from 'three';
import imgURL from '../images/HeYuan.png';

var scene = new THREE.Scene();

// 纹理贴图映射到一个矩形平面上


//矩形平面
// var geometry = new THREE.PlaneGeometry(256, 256);

// var geometry = new THREE.PlaneGeometry(256, 256, 2, 2);

// var geometry = new THREE.Geometry();

// /**顶点坐标(纹理映射位置)*/
// //顶点1坐标
// var p1 = new THREE.Vector3(0, 0, 10);
// //顶点2坐标
// var p2 = new THREE.Vector3(160, 0, 20);
// //顶点3坐标
// var p3 = new THREE.Vector3(160, 80, 30);
// //顶点4坐标
// var p4 = new THREE.Vector3(0, 80, 40);
// //顶点坐标添加到geometry对象
// geometry.vertices.push(p1, p2, p3, p4);

// /** 三角面1、三角面2*/
// //三角面法向量
// var normal = new THREE.Vector3(0, 0, 1);
// //三角面1
// var face0 = new THREE.Face3(0, 1, 2, normal);
// //三角面2
// var face1 = new THREE.Face3(0, 2, 3, normal);
// //三角面1、2添加到几何体
// geometry.faces.push(face1, face0);
// /**纹理坐标*/
// //图片左下角
// var t0 = new THREE.Vector2(0, 0);
// //图片右下角
// var t1 = new THREE.Vector2(1, 0);
// //图片右上角
// var t2 = new THREE.Vector2(1, 1);
// //图片左上角
// var t3 = new THREE.Vector2(0, 1);
// //选中图片一个三角区域像素——映射到三角面1
// var uv1 = [t0, t1, t2];
// //选中图片一个三角区域像素——映射到三角面2
// var uv2 = [t0, t2, t3];
// //纹理坐标传递给纹理三角面属性
// geometry.faceVertexUvs[0].push(uv2, uv1);



// 下面代码通过几何体BufferGeometry自定义了一个由两个三角形组成的矩形几何体，
// 并且通过几何体的.attributes.uv属性设置了每个顶点对应的第一组UV坐标。

var geometry = new THREE.BufferGeometry();
//类型数组创建顶点位置position数据
var vertices = new Float32Array([
    //顶点1坐标
    0, 0, 0,
    //顶点2坐标
    80, 0, 0,
    //顶点3坐标
    80, 80, 0,
    //顶点4坐标
    0, 80, 0,
]);
// 创建属性缓冲区对象
//3个为一组
var attribute = new THREE.BufferAttribute(vertices, 3);
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribute;

var normals = new Float32Array([
    //顶点1法向量
    0, 0, 1,
    //顶点2法向量
    0, 0, 1,
    //顶点3法向量
    0, 0, 1,
    //顶点4法向量
    0, 0, 1,
]);
// 设置几何体attributes属性的位置normal属性
//3个为一组,表示一个顶点的xyz坐标
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

// Uint16Array类型数组创建顶点索引数据
var indexes = new Uint16Array([
    // 0, 1, 2, 0, 2, 3,
    0, 1, 2, 3, 0, 2,
]);
// 索引数据赋值给几何体的index属性
//1个为一组
geometry.index = new THREE.BufferAttribute(indexes, 1);

/**纹理坐标*/
var uvs = new Float32Array([
    //图片左下角
    0, 0,
    //图片右下角
    1, 0,
    //图片右上角
    1, 1,
    //图片左上角
    0, 1,
]);
// 设置几何体attributes属性的位置normal属性
//2个为一组,表示一个顶点的纹理坐标
geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2);


// var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体

// var geometry = new THREE.SphereGeometry(60, 25, 25); //球体


// TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
// var textureLoader = new THREE.TextureLoader();
// // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
// textureLoader.load(imgURL, function (texture) {
//     //材质对象Material
//     var material = new THREE.MeshLambertMaterial({
//         // color: 0xffffff,
//         // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
//         //设置颜色贴图属性值
//         map: texture,
//     });
//     //网格模型对象Mesh
//     var mesh = new THREE.Mesh(geometry, material);
//     //网格模型添加到场景中
//     scene.add(mesh);
// })



// 图片加载器
var ImageLoader = new THREE.ImageLoader();
// load方法回调函数，按照路径加载图片，返回一个html的元素img对象
ImageLoader.load(imgURL, function (img) {
    // image对象作为参数，创建一个纹理对象Texture
    var texture = new THREE.Texture(img);
    // 下次使用纹理时触发更新
    texture.needsUpdate = true;

    var material = new THREE.MeshLambertMaterial({
        //设置纹理贴图
        map: texture,
    });

    var mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
})

console.log(geometry.faceVertexUvs);

// geometry.faceVertexUvs[0].forEach(elem => {
//     elem.forEach(Vector2 => {
//         Vector2.set(0.9, 0.9);
//     });
// });

/**
 * 局部三角面显示完整纹理贴图
 */
//图片左上角
// var t0 = new THREE.Vector2(0, 1);
// //图片左下角
// var t1 = new THREE.Vector2(0, 0);
// //图片右下角
// var t2 = new THREE.Vector2(1, 0)
// //图片右上角
// var t3 = new THREE.Vector2(1, 1);
// //选中图片一个三角区域像素——用于映射到一个三角面
// var uv1 = [t0, t1, t3];
// //选中图片一个三角区域像素——用于映射到一个三角面
// var uv2 = [t1, t2, t3];

// geometry.faceVertexUvs[0][4] = uv1;

// geometry.faceVertexUvs[0][5] = uv2;







/**
 * 光源设置
 */

//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(200, 200, 200); //点光源位置
// 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
scene.add(point); //点光源添加到场景中

// 点光源2  位置和point关于原点对称
// var point2 = new THREE.PointLight(0xffffff);
// point2.position.set(-400, -200, -300); //点光源位置
// scene.add(point2); //点光源添加到场景中

//环境光    环境光颜色与网格模型的颜色进行RGB进行乘法运算
var ambient = new THREE.AmbientLight(0x444444);
// var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);


// console.log(scene)
// console.log(scene.children)

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 300; //三维场景显示范围控制系数，系数越大，显示的范围越大

//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(300, 300, 300); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

// function render() {
//     renderer.render(scene, camera);//执行渲染操作
// }
// render();

// var controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', render);//监听鼠标、键盘事件

function render() {
    renderer.render(scene, camera);//执行渲染操作
    requestAnimationFrame(render);//请求再次执行渲染函数render
}
render();

var controls = new OrbitControls(camera, renderer.domElement);

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxesHelper(250);
scene.add(axisHelper);
