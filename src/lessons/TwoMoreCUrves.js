import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry } from 'three';

var scene = new THREE.Scene();



// //声明一个几何体对象Geometry
// var geometry = new THREE.Geometry();
// // 三维样条曲线  Catmull-Rom算法
// var curve = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(-50, 20, 90),
//     new THREE.Vector3(-10, 40, 40),
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(60, -60, 0),
//     new THREE.Vector3(70, 0, 80)
// ]);
// //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
// //分段数100，返回101个顶点
// var points = curve.getPoints(100);
// // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
// geometry.setFromPoints(points);
// //材质对象
// var material = new THREE.LineBasicMaterial({
//     color: 0x000000
// });
// //线条模型对象
// var line = new THREE.Line(geometry, material);
// //线条对象添加到场景中
// scene.add(line);





//声明一个几何体对象Geometry
var geometry = new THREE.Geometry();

// var p1 = new THREE.Vector3(-80, 0, 0);

// var p2 = new THREE.Vector3(20, 100, 0);

// var p3 = new THREE.Vector3(80, 0, 0);
// // 三维二次贝赛尔曲线
// var curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);


var p1 = new THREE.Vector3(-80, 0, 0);
var p2 = new THREE.Vector3(-50, 50, 50);
var p3 = new THREE.Vector3(50, -50, -50);
var p4 = new THREE.Vector3(80, 0, 0);
// 三维三次贝赛尔曲线
var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);


//getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
//分段数100，返回101个顶点
var points = curve.getPoints(100);
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
geometry.setFromPoints(points);
//材质对象
var material = new THREE.LineBasicMaterial({
    color: 0x000000
});
//线条模型对象
var line = new THREE.Line(geometry, material);
//线条对象添加到场景中
scene.add(line);





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
