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

// var texture = new THREE.TextureLoader().load(ballPic);

// var spriteMaterial = new THREE.SpriteMaterial({
//     color: 0xff00ff,
//     rotation: Math.PI / 4,
//     map: texture,
// });

// var sprite = new THREE.Sprite(spriteMaterial);

// scene.add(sprite);

// sprite.scale.set(10, 10, 1);


/**
 * 精灵创建下雨效果
 */
// 加载雨滴理贴图
var textureTree = new THREE.TextureLoader().load(rainPic);

var group = new THREE.Group();
// 批量创建表示雨滴的精灵模型
for (let i = 0; i < 1000; i++) {
    var spriteMaterial = new THREE.SpriteMaterial({
        //设置精灵纹理贴图
        map: textureTree,
        opacity: 0.8,
        transparent: true
    });
    // 创建精灵模型对象
    var sprite = new THREE.Sprite(spriteMaterial);

    // scene.add(sprite);

    group.add(sprite);

    // 控制精灵大小,
    //// 只需要设置x、y两个分量就可以
    var k1 = Math.random() - 0.5;
    var k2 = Math.random() - 0.5;
    var k3 = Math.random() - 0.5;
    var k4 = Math.random() - 0.5;
    sprite.scale.set(10 * k4, 10 * k4, 1);
    // 设置精灵模型位置，在整个空间上上随机分布
    sprite.position.set(1000 * k1, 500 * k2 + 500, 1000 * k3);
}

scene.add(group);

var geometry = new THREE.PlaneGeometry(1000, 1000);

var texture = new THREE.TextureLoader().load(grassPic);

texture.wrapS = THREE.RepeatWrapping;

texture.wrapT = THREE.RepeatWrapping;

texture.repeat.set(10, 10);

var material = new THREE.MeshLambertMaterial({
    color: 0x777700,
    map: texture,
});

var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

mesh.rotateX(-Math.PI / 2);








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
// renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

// function render() {
//     renderer.render(scene, camera);//执行渲染操作
// }
// render();

// var controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', render);//监听鼠标、键盘事件

function render() {

    group.children.forEach(sprite => {
        sprite.position.y -= (5 - (sprite.scale.y / 10 + 0.5));
        if (sprite.position.y < 0) {
            var k2 = Math.random() - 0.5;
            sprite.position.y = k2 * 500 + 100;
        }
    });

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
// var axisHelper = new THREE.AxesHelper(250);
// scene.add(axisHelper);
