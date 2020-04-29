import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var scene = new THREE.Scene();

//创建一个球体几何对
var geometry = new THREE.PlaneGeometry(50, 50, 50, 50);






// POINT材质


// // 创建一个点材质对象
// var material = new THREE.PointsMaterial({
//     //颜色
//     color: 0x0000ff,
//     //点渲染尺寸
//     size: 3,
// });

// //点模型对象  参数：几何体  点材质
// var point = new THREE.Points(geometry, material);

// //网格模型添加到场景中
// scene.add(point);






// LINE两种材质


// // 直线基础材质对象
// var material = new THREE.LineBasicMaterial({
//     color: 0x0000ff
// });

// //线模型对象
// var line = new THREE.Line(geometry, material);

// //点模型添加到场景中
// scene.add(line);



// // 虚线材质对象：产生虚线效果
// var material = new THREE.LineDashedMaterial({
//     color: 0x0000ff,
//     //显示线段的大小。默认为3。
//     dashSize: 5,
//     //间隙的大小。默认为1
//     gapSize: 5,
// });

// //线模型对象
// var line = new THREE.Line(geometry, material);

// //  computeLineDistances方法  计算LineDashedMaterial所需的距离数组
// line.computeLineDistances();

// //点模型添加到场景中
// scene.add(line);






// MESH 三种材质


// // 基础网格材质对象MeshBasicMaterial,不受带有方向光源影响，没有棱角感。
// var material = new THREE.MeshBasicMaterial({
//     color: 0x0000ff,
//     // 前面FrontSide  背面：BackSide 双面：DoubleSide
//     side: THREE.DoubleSide,
// });

// // MeshLambertMaterial材质可以实现网格Mesh表面与光源的漫反射光照计算，有了光照计算，物体表面分界的位置才会产生棱角感。
// var material = new THREE.MeshLambertMaterial({
//     color: 0x00ff00,
// });

// 高光网格材质MeshPhongMaterial除了和MeshLambertMaterial一样可以实现光源和网格表面的漫反射光照计算，还可以产生高光效果(镜面反射)。
var material = new THREE.MeshPhongMaterial({
    color: 0x220000,
    // transparent设置为true，开启透明，否则opacity不起作用
    transparent: true,
    // 设置材质透明度
    opacity: 0.4,
});

// transparent设置为true，开启透明，否则opacity不起作用
material.transparent = true;
// 设置材质透明度
material.opacity = 0.9;

var mesh = new THREE.Mesh(geometry, material);

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
