import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var scene = new THREE.Scene();

var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

var p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
var p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
var p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
var p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标

//顶点坐标添加到geometry对象
geometry.vertices.push(p1, p2, p3, p4);




// threejs提供了Face3对象构建三角形，通过Face3构建一个三角形，不要设置顶点位置坐标数据，
// 只需要通过数组索引值从geometry.vertices数组中获得顶点位置坐标数据。
// Face3构造函数创建一个三角面
var face1 = new THREE.Face3(0, 1, 2);

// 三角面2
var face2 = new THREE.Face3(0, 2, 3);




// 通过三角形面Face3的Face3.vertexNormals属性给三角形的三个顶点分别设置一个顶点法线方向数据。
//三角面每个顶点的法向量
var n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
var n2 = new THREE.Vector3(0, 0, -1); //三角面2Face2顶点2的法向量
var n3 = new THREE.Vector3(0, 0, -1); //三角面3Face3顶点3的法向量

// 设置三角面Face3三个顶点的法向量
face1.vertexNormals.push(n1, n2, n3);


// 使用三维向量THREE.Vector3表示三角形法线方向数值，然后赋值给三角形对象Face3的法线属性Face3.normal。
// 设置三角面法向量
face2.normal = new THREE.Vector3(0, -1, 0);




// 三角形1颜色
face1.color = new THREE.Color(0xffff00);
// 设置三角面face1三个顶点的颜色
// face2.color = new THREE.Color(0xff00ff);

face1.vertexColors = [
    new THREE.Color(0xffff00),
    new THREE.Color(0xff00ff),
    new THREE.Color(0x00ffff),
]




//三角面face1、face2添加到几何体中
geometry.faces.push(face1, face2);




// 三角面(网格)渲染模式
var material = new THREE.MeshBasicMaterial({
    // color: 0x0000ff, //三角面颜色
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide //两面可见
});

//材质对象
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

scene.add(mesh);


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


console.log(scene)
console.log(scene.children)

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
