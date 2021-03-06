import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry, Geometry } from 'three';
import imgURL from '../images/HeYuan.png';
import earthPicNormal from '../images/earth.png';
import earthPic from '../images/EarthPic2.jpg';
import grassPic from '../images/grass.jpg';
import legoPic from '../images/lego.jpg';
import testVid from '../images/test.mp4';

var scene = new THREE.Scene();

var geometry = new THREE.PlaneGeometry(128, 128); //矩形平面
/**
 * 创建纹理对象的像素数据
 */
var width = 32; //纹理宽度
var height = 32; //纹理高度
var size = width * height; //像素大小
var data = new Uint8Array(size * 3); //size*3：像素在缓冲区占用空间
for (let i = 0; i < size * 3; i += 3) {
    // 随机设置RGB分量的值
    data[i] = 255 * Math.random()
    data[i + 1] = 255 * Math.random()
    data[i + 2] = 255 * Math.random()
}
// 创建数据文理对象   RGB格式：THREE.RGBFormat
var texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat);
texture.needsUpdate = true; //纹理更新
//打印纹理对象的image属性
// console.log(texture.image);

var material = new THREE.MeshPhongMaterial({
    map: texture, // 设置纹理贴图
}); //材质对象Material
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

mesh.translateY(200);



var geometry2 = new THREE.PlaneGeometry(128, 128); //矩形平面
/**
 * 创建纹理对象的像素数据
 */
var width2 = 32; //纹理宽度
var height2 = 32; //纹理高度
var size2 = width2 * height2; //像素大小
var data2 = new Uint8Array(size2 * 4); //size*4：像素在缓冲区占用空间
for (let i = 0; i < size * 4; i += 4) {
    // 随机设置RGB分量的值
    data2[i] = 255 * Math.random()
    data2[i + 1] = 255 * Math.random()
    data2[i + 2] = 255 * Math.random()
    // 设置透明度分量A
    data2[i + 3] = 255 * Math.random()
}
// 创建数据文理对象   RGBA格式：THREE.RGBAFormat
var texture2 = new THREE.DataTexture(data2, width2, height2, THREE.RGBAFormat);
texture2.needsUpdate = true; //纹理更新
//打印纹理对象的image属性
console.log(texture2.image);

var material2 = new THREE.MeshPhongMaterial({
    map: texture2, // 设置纹理贴图
    transparent: true,//允许透明设置
});
var mesh2 = new THREE.Mesh(geometry2, material2);

scene.add(mesh2);








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
// var width = window.innerWidth; //窗口宽度
// var height = window.innerHeight; //窗口高度
// var k = width / height; //窗口宽高比
// var s = 300; //三维场景显示范围控制系数，系数越大，显示的范围越大

// //创建相机对象
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(300, 300, 300); //设置相机位置
// camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

/**
 * 透视投影相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
/**透视投影相机对象*/
var camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
camera.position.set(20, 20, 20); //设置相机位置
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
    // 使用加减法可以设置不同的运动方向

    // 设置纹理偏移
    // texture.offset.x -= 0.06;

    // mesh.rotateY(0.01);
}
render();

var controls = new OrbitControls(camera, renderer.domElement);

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxesHelper(250);
scene.add(axisHelper);
