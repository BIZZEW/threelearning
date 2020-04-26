import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var scene = new THREE.Scene();


//长方体 参数：长，宽，高
var geometry1 = new THREE.BoxGeometry(100, 100, 100);
var material1 = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
    opacity: 0.3,
    transparent: true
});
var mesh1 = new THREE.Mesh(geometry1, material1);
scene.add(mesh1);


// 球体 参数：半径60  经纬度细分数40,40
var geometry2 = new THREE.SphereGeometry(60, 40, 40);
var material2 = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    specular: 0xff00ff,
    shininess: 12
});
var mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.translateY(120);
scene.add(mesh2);


// 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
var material3 = new THREE.MeshLambertMaterial({
    color: 0xffff00
});
material3.opacity = 0.5;
material3.transparent = true;
var mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(120, 0, 0);
scene.add(mesh3);


// 正八面体
var geometry4 = new THREE.OctahedronGeometry(50);
var material4 = new THREE.MeshLambertMaterial({
    color: 0x20b2aa
});
var mesh4 = new THREE.Mesh(geometry4, material4);
mesh4.position.set(-120, 0, 0);
scene.add(mesh4);


// 正十二面体
var geometry5 = new THREE.DodecahedronGeometry(50);
var material5 = new THREE.MeshLambertMaterial({
    color: 0xdf4d55
});
var mesh5 = new THREE.Mesh(geometry5, material5);
mesh5.position.set(0, -120, 0);
scene.add(mesh5);


// 正二十面体
var geometry6 = new THREE.IcosahedronGeometry(50);
var material6 = new THREE.MeshLambertMaterial({
    color: 0x2de6ff
});
var mesh6 = new THREE.Mesh(geometry6, material6);
mesh6.position.set(0, 0, 120);
scene.add(mesh6);


/**
 * 光源设置
 */

//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
// 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
scene.add(point); //点光源添加到场景中

// 点光源2  位置和point关于原点对称
var point2 = new THREE.PointLight(0xffffff);
point2.position.set(-400, -200, -300); //点光源位置
scene.add(point2); //点光源添加到场景中

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
