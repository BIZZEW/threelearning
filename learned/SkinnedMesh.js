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

var geometry = new THREE.CylinderBufferGeometry(5, 10, 120, 50, 300);
//平移后，y分量范围[0,120]
geometry.translate(0, 60, 0);
//控制台查看顶点坐标
// console.log("position", geometry.attributes.position);

var position = geometry.attributes.position;

var vertex = new THREE.Vector3();

var skinIndices = [];
var skinWeights = [];

/**
 * 设置几何体对象Geometry的蒙皮索引skinIndices、权重skinWeights属性
 * 实现一个模拟腿部骨骼运动的效果
 */
//遍历几何体顶点，为每一个顶点设置蒙皮索引、权重属性
//根据y来分段，0~60一段、60~100一段、100~120一段
for (var i = 0; i < position.count; i++) {
    //第i个顶点
    // var vertex = geometry.vertices[i];
    vertex.fromBufferAttribute(position, i);
    if (vertex.y <= 60) {
        // 设置每个顶点蒙皮索引属性  受根关节Bone1影响
        skinIndices.push(0, 0, 0, 0);
        // 设置每个顶点蒙皮权重属性
        // 影响该顶点关节Bone1对应权重是1-vertex.y/60
        skinWeights.push((1 - (vertex.y / 60)), (vertex.y / 60), 0, 0);
    } else if ((60 < vertex.y) && (vertex.y <= 100)) {
        // Vector4(1, 0, 0, 0)表示对应顶点受关节Bone2影响
        skinIndices.push(1, 0, 0, 0);
        // 影响该顶点关节Bone2对应权重是1-(vertex.y-60)/40
        skinWeights.push((1 - ((vertex.y - 60) / 40)), ((vertex.y - 60) / 40), 0, 0);
    } else if (100 < vertex.y && vertex.y <= 120) {
        // Vector4(2, 0, 0, 0)表示对应顶点受关节Bone3影响
        skinIndices.push(2, 0, 0, 0);
        // 影响该顶点关节Bone3对应权重是1-(vertex.y-100)/20
        skinWeights.push((1 - ((vertex.y - 100) / 20)), ((vertex.y - 100) / 20), 0, 0);
    }
}

geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

// 材质对象
var material = new THREE.MeshPhongMaterial({
    //允许蒙皮动画
    skinning: true,
    // wireframe: true,
});

// 创建骨骼网格模型
var SkinnedMesh = new THREE.SkinnedMesh(geometry, material);
//设置网格模型位置
// SkinnedMesh.position.set(50, 120, 50);
//旋转网格模型
// SkinnedMesh.rotateX(Math.PI);
//网格模型添加到场景中
scene.add(SkinnedMesh);

/**
 * 骨骼系统
 */
//关节1，用来作为根关节
var Bone1 = new THREE.Bone();
//关节2
var Bone2 = new THREE.Bone();
//关节3
var Bone3 = new THREE.Bone();
// 设置关节父子关系   多个骨头关节构成一个树结构
Bone1.add(Bone2);
Bone2.add(Bone3);
// 设置关节之间的相对位置
//根关节Bone1默认位置是(0,0,0)
Bone1.position.y = 0;
//Bone2相对父对象Bone1位置
Bone2.position.y = 60;
//Bone3相对父对象Bone2位置
Bone3.position.y = 40;

// 所有Bone对象插入到Skeleton中，全部设置为.bones属性的元素
//创建骨骼系统
var skeleton = new THREE.Skeleton([Bone1, Bone2, Bone3]);

// console.log(skeleton.bones);
// 返回所有关节的世界坐标
// skeletion.bones.forEach(elem=>{
//     console.log(elem.getWorldPosition(new THREE.Vector3()));
// });

//骨骼关联网格模型
//根骨头关节添加到网格模型
SkinnedMesh.add(Bone1);
//网格模型绑定到骨骼系统
SkinnedMesh.bind(skeleton);
// console.log(SkinnedMesh);

/**
 * 骨骼辅助显示
 */
var skeletonHelper = new THREE.SkeletonHelper(SkinnedMesh);
scene.add(skeletonHelper);

// 转动关节带动骨骼网格模型出现弯曲效果  好像腿弯曲一样
skeleton.bones[1].rotation.x = 0.5;
skeleton.bones[2].rotation.x = 0.5;



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
