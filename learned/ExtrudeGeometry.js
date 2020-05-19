import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry } from 'three';

var scene = new THREE.Scene();

// /**
//  * 创建拉伸网格模型
//  */
// var shape = new THREE.Shape();
// /**四条直线绘制一个矩形轮廓*/
// shape.moveTo(0, 0);//起点
// shape.lineTo(0, 100);//第2点
// shape.lineTo(100, 100);//第3点
// shape.lineTo(100, 0);//第4点
// shape.lineTo(0, 0);//第5点
// var geometry = new THREE.ExtrudeGeometry(//拉伸造型
//     shape,//二维轮廓
//     //拉伸参数
//     {
//         amount: 120,//拉伸长度
//         bevelEnabled: false//无倒角
//     }
// );

// var material = new THREE.MeshBasicMaterial({
//     color: 0x0000ff,
//     // size: 5.0//点对象像素尺寸
// });//材质对象
// var mesh = new THREE.Mesh(geometry, material);//点模型对象
// scene.add(mesh);//点模型添加到场景中




/**
* 创建扫描网格模型
*/
var shape = new THREE.Shape();
/**四条直线绘制一个矩形轮廓*/
shape.moveTo(0, 0);//起点
shape.lineTo(0, 10);//第2点
shape.lineTo(10, 10);//第3点
shape.lineTo(10, 0);//第4点
shape.lineTo(0, 0);//第5点
/**创建轮廓的扫描轨迹(3D样条曲线)*/
var curve = new THREE.SplineCurve3([
    new THREE.Vector3(-10, -50, -50),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(8, 50, 50),
    new THREE.Vector3(-5, 0, 100)
]);
var geometry = new THREE.ExtrudeGeometry(//拉伸造型
    shape,//二维轮廓
    //拉伸参数
    {
        bevelEnabled: true,//无倒角
        bevelSize: 10,
        bevelThickness: 10,
        extrudePath: curve,//选择扫描轨迹
        steps: 100//扫描方向细分数
    }
);

var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    // size: 5.0//点对象像素尺寸
});//材质对象
var mesh = new THREE.Mesh(geometry, material);//点模型对象
scene.add(mesh);//点模型添加到场景中






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
