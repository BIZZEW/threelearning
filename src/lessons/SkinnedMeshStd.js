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
 * 创建骨骼网格模型SkinnedMesh
 */
// 创建一个圆柱几何体，高度120，顶点坐标y分量范围[-60,60]
// var geometry = new THREE.CylinderGeometry(5, 10, 120, 50, 300);

var geometry = new THREE.CylinderBufferGeometry(5, 5, 30, 5, 3, 5, 30);

var position = geometry.attributes.position;

var vertex = new THREE.Vector3();

var skinIndices = [];
var skinWeights = [];

for (var i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);

    var y = (vertex.y + 15);

    var skinIndex = Math.floor(y / 10);
    var skinWeight = (y % 10) / 10;

    skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

// 材质对象
var material = new THREE.MeshPhongMaterial({
    //允许蒙皮动画
    skinning: true,
    side: THREE.DoubleSide,
    // wireframe: true,
});

// 创建骨骼网格模型
var mesh = new THREE.SkinnedMesh(geometry, material);

scene.add(mesh);

// Create a simple "arm"

var bones = [];

var bones0 = new THREE.Bone();
var bones1 = new THREE.Bone();
var bones2 = new THREE.Bone();

bones0.add(bones1);
bones1.add(bones2);

bones.push(bones0);
bones.push(bones1);
bones.push(bones2);

bones0.position.y = 0;
bones1.position.y = 10;
bones2.position.y = 10;

var skeleton = new THREE.Skeleton(bones);

var rootBone = skeleton.bones[0];

mesh.add(rootBone);
mesh.bind(skeleton);

skeleton.bones[0].rotation.x = -0.1;
skeleton.bones[1].rotation.x = 0.2;



/**
 * 骨骼辅助显示
 */
var skeletonHelper = new THREE.SkeletonHelper(mesh);
scene.add(skeletonHelper);



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

var n = 0;
var T = 50;
var step = 0.01;

function render() {
    renderer.render(scene, camera);//执行渲染操作
    requestAnimationFrame(render);//请求再次执行渲染函数render
    // n += 1;
    // if (n < T) {
    //     skeleton.bones[0].rotation.x = skeleton.bones[0].rotation.x - step;
    //     skeleton.bones[1].rotation.x = skeleton.bones[1].rotation.x + step;
    //     skeleton.bones[2].rotation.x = skeleton.bones[2].rotation.x + 2 * step;
    // }
    // if (n < 2 * T && n > T) {
    //     skeleton.bones[0].rotation.x = skeleton.bones[0].rotation.x + step;
    //     skeleton.bones[1].rotation.x = skeleton.bones[1].rotation.x - step;
    //     skeleton.bones[2].rotation.x = skeleton.bones[2].rotation.x - 2 * step;
    // }
    // if (n === 2 * T) {
    //     n = 0;
    // }
}
render();

var controls = new OrbitControls(camera, renderer.domElement);

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxesHelper(250);
scene.add(axisHelper);
