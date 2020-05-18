import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry } from 'three';

var scene = new THREE.Scene();

// var points = [
//     new THREE.Vector2(-50, -50),
//     new THREE.Vector2(-60, 0),
//     new THREE.Vector2(0, 50),
//     new THREE.Vector2(60, 0),
//     new THREE.Vector2(50, -50),
//     new THREE.Vector2(-50, 50),
// ]
// // 通过顶点定义轮廓
// var shape = new THREE.Shape(points);
// // shape可以理解为一个需要填充轮廓
// // 所谓填充：ShapeGeometry算法利用顶点计算出三角面face3数据填充轮廓
// var geometry = new THREE.ShapeGeometry(shape, 25);

// 通过shpae基类path的方法绘制轮廓（本质也是生成顶点）
var shape = new THREE.Shape();



// 下面代码是通过shpae绘制了一个矩形区域，更多相关的轮廓绘制方法可以查看Shape文档。
// shape.absarc(0, 0, 100, 0, 2 * Math.PI);//圆弧轮廓
// console.log(shape.getPoints(15));//查看shape顶点数据



// 通过shpae基类path的方法绘制轮廓（本质也是生成顶点）
// 四条直线绘制一个矩形轮廓
// shape.moveTo(0, 0);//起点
// shape.lineTo(0, 100);//第2点
// shape.lineTo(100, 100);//第3点
// shape.lineTo(100, 0);//第4点
// shape.lineTo(0, 0);//第5点



var shape = new THREE.Shape();



// 圆弧与直线连接
// var R = 50;
// // 绘制一个半径为R、圆心坐标(0, 0)的半圆弧
// shape.absarc(0, 0, R, 0, Math.PI);
// //从圆弧的一个端点(-R, 0)到(-R, -200)绘制一条直线
// shape.lineTo(-R, -200);
// // 绘制一个半径为R、圆心坐标(0, -200)的半圆弧
// shape.absarc(0, -200, R, Math.PI, 2 * Math.PI);
// //从圆弧的一个端点(R, -200)到(-R, -200)绘制一条直线
// shape.lineTo(R, 0);



// 一个外轮廓圆弧嵌套三个内圆弧轮廓
//外轮廓
// shape.arc(0, 0, 100, 0, 2 * Math.PI);
// // 内轮廓1
// var path1 = new THREE.Shape();
// path1.arc(0, 0, 40, 0, 2 * Math.PI);
// // 内轮廓2
// var path2 = new THREE.Shape();
// path2.arc(80, 0, 10, 0, 2 * Math.PI);
// // 内轮廓3
// var path3 = new THREE.Shape();
// path3.arc(-80, 0, 10, 0, 2 * Math.PI);
// //三个内轮廓分别插入到holes属性中
// shape.holes.push(path1, path2, path3);



// 矩形嵌套矩形或圆弧
//外轮廓
// shape.moveTo(0, 0);//起点
// shape.lineTo(0, 100);//第2点
// shape.lineTo(100, 100);//第3点
// shape.lineTo(100, 0);//第4点
// shape.lineTo(0, 0);//第5点

// //内轮廓
// var path = new THREE.Path();//path对象
// // path.arc(50,50,40,0,2*Math.PI);//圆弧
// path.moveTo(20, 20);//起点
// path.lineTo(20, 80);//第2点
// path.lineTo(80, 80);//第3点
// path.lineTo(80, 20);//第4点
// path.lineTo(20, 20);//第5点
// shape.holes.push(path);//设置内轮廓



// 轮廓对象1
shape.arc(-50, 0, 30, 0, 2 * Math.PI);
// 轮廓对象2
var shape2 = new THREE.Shape();
shape2.arc(50, 0, 30, 0, 2 * Math.PI);
// 轮廓对象3
var shape3 = new THREE.Shape();
shape3.arc(0, 50, 30, 0, 2 * Math.PI);



// var geometry = new THREE.ShapeGeometry(shape, 2);


// 多个shape作为元素组成数组,每一个shape可以理解为一个要填充的轮廓
var geometry = new THREE.ShapeGeometry([shape, shape2, shape3], 30);



//材质对象
var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff,//三角面颜色
    side: THREE.DoubleSide,//两面可见
    wireframe: true
});
//线条模式渲染(查看细分数)
//旋转网格模型对象
var mesh = new THREE.Mesh(geometry, material);
//旋转网格模型添加到场景中
scene.add(mesh);






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
