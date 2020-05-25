import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry, Geometry } from 'three';
import imgURL from '../images/HeYuan.png';
import earthPicNormal from '../images/earth.png';
import earthPic from '../images/EarthPic2.jpg';
import grassPic from '../images/grass.jpg';
import legoPic from '../images/lego.jpg';
import testVid from '../images/test.mp4';
import ballPic from '../images/ball.png';
import rainPic from '../images/rain.png';

var scene = new THREE.Scene();
/**
 * 创建两个网格模型并设置一个父对象group
 */
// 创建两个用于动画的网格模型
// 先创建两个用于关键帧动画的网格模型。
var group = new THREE.Group();

var geometry1 = new THREE.BoxGeometry(50, 10, 10);

var geometry2 = new THREE.SphereGeometry(10, 100, 100);

var material1 = new THREE.MeshLambertMaterial({
    // color: 0x000000,
});

var material2 = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
});

var mesh1 = new THREE.Mesh(geometry1, material1);

var mesh2 = new THREE.Mesh(geometry2, material2);

/**
 * 创建两个网格模型并设置一个父对象group
 */
mesh1.name = "Box"; //网格模型1命名
mesh2.name = "Sphere"; //网格模型2命名

group.add(mesh1); //网格模型添加到组中
group.add(mesh2); //网格模型添加到组中

scene.add(group);




// 编辑关键帧
// 下面代码中的关键帧动画是通过关键帧KeyframeTrack和剪辑AnimationClip两个API来完成，
// 实际开发中如果需要制作一个复杂三维模型的帧动画，比如一个人走路、跑步等动作，
// 一般情况是美术通过3dmax、blender等软件编辑好，不需要程序员用代码实现。

/**
 * 编辑group子对象网格模型mesh1和mesh2的帧动画数据
 */
// 创建名为Box对象的关键帧数据
//关键帧时间数组，离散的时间点序列
var times = [0, 10];
//与时间点对应的值组成的数组
var values = [
    0, 0, 0,
    150, 0, 0
];
// 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
var posTrack = new THREE.KeyframeTrack('Box.position', times, values);
// 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
var colorKF = new THREE.KeyframeTrack('Box.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);

// 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
var scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 3, 3, 3]);

// duration决定了默认的播放时间，一般取所有帧动画的最大时间
// duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
var duration = 20;
// 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
var clip = new THREE.AnimationClip("default", duration, [posTrack, colorKF, scaleTrack]);




// 播放关键帧
// 下面代码是通过操作AnimationAction和混合器AnimationMixer两个API播放已有的帧动画数据。

// 混合器THREE.AnimationMixer()的参数是案例代码中编写的两个网格模型的父对象group，
// 实际开发中参数Group也可以是你加载外部模型返回的模型对象。

/**
 * 播放编辑好的关键帧数据
 */
// group作为混合器的参数，可以播放group中所有子对象的帧动画
var mixer = new THREE.AnimationMixer(group);

// 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
var AnimationAction = mixer.clipAction(clip);

//通过操作Action设置播放方式
//默认1，可以调节播放速度
AnimationAction.timeScale = 20;
// AnimationAction.loop = THREE.LoopOnce; //不循环播放
//开始播放
AnimationAction.play();







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
var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(292, 109, 268); //设置相机位置
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

// 创建一个时钟对象Clock
var clock = new THREE.Clock();

function render() {

    renderer.render(scene, camera);//执行渲染操作
    requestAnimationFrame(render);//请求再次执行渲染函数render

    //clock.getDelta()方法获得两帧的时间间隔
    // 更新混合器相关的时间
    mixer.update(clock.getDelta());
}
render();

var controls = new OrbitControls(camera, renderer.domElement);

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxesHelper(250);
scene.add(axisHelper);
