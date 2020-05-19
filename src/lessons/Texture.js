import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry } from 'three';
import imgURL from '../images/HeYuan.png';

var scene = new THREE.Scene();

// 纹理贴图映射到一个矩形平面上


//矩形平面
var geometry = new THREE.PlaneGeometry(256, 256);

// var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体

// var geometry = new THREE.SphereGeometry(60, 25, 25); //球体


// TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
// var textureLoader = new THREE.TextureLoader();
// // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
// textureLoader.load(imgURL, function (texture) {
//     //材质对象Material
//     var material = new THREE.MeshLambertMaterial({
//         // color: 0xffffff,
//         // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
//         //设置颜色贴图属性值
//         map: texture,
//     });
//     //网格模型对象Mesh
//     var mesh = new THREE.Mesh(geometry, material);
//     //网格模型添加到场景中
//     scene.add(mesh);
// })



// 图片加载器
var ImageLoader = new THREE.ImageLoader();
// load方法回调函数，按照路径加载图片，返回一个html的元素img对象
ImageLoader.load(imgURL, function (img) {
    // image对象作为参数，创建一个纹理对象Texture
    var texture = new THREE.Texture(img);
    // 下次使用纹理时触发更新
    texture.needsUpdate = true;

    var material = new THREE.MeshLambertMaterial({
        //设置纹理贴图
        map: texture,
    });

    var mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
})





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
