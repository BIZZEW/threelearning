import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var scene = new THREE.Scene();

// var p1 = new THREE.Vector3(1.2, 2.6, 3.2);
// var p2 = new THREE.Vector3(0.0, 0.0, 0.0);

// p2.copy(p1);

// // p2向量的xyz变为p1的xyz值
// // console.log(p2);

// var p3 = new THREE.Vector3(1.2, 2.6, 3.2);
// var p4 = p3.clone();
// // p2对象和p1对象xyz属性相同
// console.log(p4);



//创建一个立方体几何对象
var box = new THREE.BoxGeometry(10, 10, 10);
//材质对象
var material = new THREE.MeshLambertMaterial({ color: 0x000ff });
//网格模型对象
var mesh = new THREE.Mesh(box, material);
//克隆网格模型
var mesh2 = mesh.clone();
//网格模型mesh平移
mesh.translateX(20);
//网格模型添加到场景中
scene.add(mesh, mesh2);
//几何体缩放
box.scale(1.5, 1.5, 1.5);//几何体缩放






// 高光网格材质MeshPhongMaterial除了和MeshLambertMaterial一样可以实现光源和网格表面的漫反射光照计算，还可以产生高光效果(镜面反射)。
// var material = new THREE.MeshBasicMaterial({
//     color: 0x0000ff,
//     // vertexColors: THREE.FaceColors,
//     // vertexColors: THREE.VertexColors,
//     // wireframe: true,//线框模式渲染,
//     side: THREE.DoubleSide //两面可见
// });

// // transparent设置为true，开启透明，否则opacity不起作用
// material.transparent = true;
// // 设置材质透明度
// material.opacity = 0.9;

// var mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

// mesh.scale.set(0.5, 1.5, 2);

// mesh.scale.x = 2.0;

// mesh.position.y = 80;

// mesh.position.set(80, 2, 10);

// // 等价于mesh.position = mesh.position + 100;
// mesh.translateX(100);//沿着x轴正方向平移距离100

// mesh.translateZ(-50);

// //向量Vector3对象表示方向
// var axis = new THREE.Vector3(1, 1, 1);

// axis.normalize(); //向量归一化

// //沿着axis轴表示方向平移100
// mesh.translateOnAxis(axis, 100);

// // mesh.rotateX(Math.PI / 4);//绕x轴旋转π/4

// var axis2 = new THREE.Vector3(1, 1, 1);//向量axis

// mesh.rotateOnAxis(axis2, Math.PI / 8);//绕axis轴旋转π/8











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
