import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry } from 'three';
import imgURL from '../images/HeYuan.png';
import grassPic from '../images/grass.jpg';
import testVid from '../images/test.mp4';

// Canvas画布作为Three.js纹理贴图(CanvasTexture)
/**
 * 创建一个canvas对象，并绘制一些轮廓
 */
var canvas = document.createElement("canvas");

canvas.width = 512;
canvas.height = 512;

var ctx = canvas.getContext('2d');
// 矩形区域填充背景
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, 512, 512);
// 文字
ctx.beginPath();
// ctx.translate(0, 512);
//文本填充颜色
// ctx.fillStyle = "#000000";
//字体样式设置
// ctx.font = "bold 48px 宋体";
//文本与fillText定义的纵坐标
ctx.textBaseline = "middle";
//文本居中(以fillText定义的横坐标)
ctx.textAlign = "center";
// ctx.fillText("MY THREE", 0, 0);


// document.body.appendChild(canvas);


var scene = new THREE.Scene();
// canvas画布对象作为CanvasTexture的参数重建一个纹理对象
// canvas画布可以理解为一张图片
var texture = new THREE.CanvasTexture(canvas);
//打印纹理对象的image属性
console.log(texture.image);
//矩形平面
var geometry = new THREE.PlaneGeometry(512, 512);

var material = new THREE.MeshPhongMaterial({
    // 设置纹理贴图
    map: texture,
});

// 创建一个矩形平面网模型，Canvas画布作为矩形网格模型的纹理贴图
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

mesh.translateY(300);

var img = new Image();
img.src = imgURL;
img.onload = function () {
    var bg = ctx.createPattern(img, "no-repeat");
    ctx.rect(0, 0, 512, 512);
    ctx.fillStyle = bg;
    ctx.fill();
    texture.needsUpdate = true;
}


// 视频作为Three.js纹理贴图(VideoTexture)
// VideoTexture.js封装了一个update函数，
// Threejs每次执行渲染方法进行渲染场景中的时候，
// 都会执行VideoTexture封装的update函数，
// 执行update函数中代码this.needsUpdate = true;
// 读取视频流最新一帧图片来更新Threejs模型纹理贴图。

// var scene = new THREE.Scene();
// 创建video对象
let video = document.createElement('video');
// 设置视频地址
video.src = testVid;
//要设置播放
video.autoplay = "autoplay";
// video对象作为VideoTexture参数创建纹理对象
var texture2 = new THREE.VideoTexture(video);
//矩形平面
var geometry2 = new THREE.PlaneGeometry(108, 71);

var material2 = new THREE.MeshPhongMaterial({
    // 设置纹理贴图
    map: texture2
});
//网格模型对象Mesh
var mesh2 = new THREE.Mesh(geometry2, material2);
//网格模型添加到场景中
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
// renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
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
}
render();

var controls = new OrbitControls(camera, renderer.domElement);

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxesHelper(250);
scene.add(axisHelper);
