import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry, Vector2 } from 'three';
import imgURL from '../images/HeYuan.png';

var scene = new THREE.Scene();
//立方体
// var geometry = new THREE.BoxGeometry(100, 100, 100);
var geometry = new THREE.PlaneGeometry(204, 102, 4, 4); //矩形平面
// var geometry = new THREE.SphereGeometry(60, 25, 25); //球体
// var geometry = new THREE.CylinderGeometry(60, 60, 25,25); //圆柱

console.log(geometry.faces);
console.log(geometry.faceVertexUvs);

geometry.faces.forEach(elem => {
    console.log(elem.materialIndex);
})
// 材质对象1
var material1 = new THREE.MeshPhongMaterial({
    color: 0xffff3f
});
// 材质对象2
var material2 = new THREE.MeshPhongMaterial({
    color: 0x0000ff
});
//材质对象Material
// 数组材质
var materialArr = [material1, material2];
// 设置几何体的材质索引(对于PlaneGeometry而言所有Face3的材质索引默认0)
geometry.faces[4].materialIndex = 1;
geometry.faces[5].materialIndex = 1;
//网格模型对象Mesh
var mesh = new THREE.Mesh(geometry, materialArr);

scene.add(mesh);

// 材质对象1
// var material_1 = new THREE.MeshPhongMaterial({
//     color: 0xffff3f
// });
// // 纹理加载器
// var textureLoader = new THREE.TextureLoader();
// // 加载图片，返回Texture对象
// var texture = textureLoader.load(imgURL);
// // 材质对象2
// var material_2 = new THREE.MeshLambertMaterial({
//     // 设置纹理贴图
//     map: texture,
//     // wireframe: true,
// });
// // 设置材质数组
// var materialArr = [material_2, material_1, material_1, material_1, material_1, material_1];
// // 设置数组材质对象作为网格模型材质参数
// //网格模型对象Mesh
// var mesh = new THREE.Mesh(geometry, materialArr);
// //网格模型添加到场景中
// scene.add(mesh);






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
