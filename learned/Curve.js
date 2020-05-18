import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry } from 'three';

var scene = new THREE.Scene();


// 使用threejs的API圆弧线ArcCurve绘制一个圆弧轮廓。

// //声明一个几何体对象Geometry
// var geometry = new THREE.Geometry();
// //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
// var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
// //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
// var points = arc.getPoints(100);//分段数50，返回51个顶点
// // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
// geometry.setFromPoints(points);
// //材质对象
// var material = new THREE.LineBasicMaterial({
//     color: 0x000000
// });
// //线条模型对象
// var line = new THREE.Line(geometry, material);
// //线条对象添加到场景中
// scene.add(line);

// console.log("points", points);

// console.log("geometry.vertices", geometry.vertices);




// 和上面绘制圆弧线代码实现的功能相同，不过没有借助圆弧线THREE.ArcCurve，
// 通过三角函数计算生成圆弧线上的顶点。设置这个案例的目的就是，
// 你可以通过对比两个代码案例，明白Threejs一些曲线API本质上就是通过某种算法得到了沿着特定轨迹的顶点数据。

//声明一个几何体对象Geometry
// var geometry = new THREE.Geometry();
// //圆弧半径
// var R = 100;
// //分段数量
// var N = 50;
// // 批量生成圆弧上的顶点数据
// for (var i = 0; i < N; i++) {
//     var angle = 2 * Math.PI / N * i;
//     var x = R * Math.sin(angle);
//     var y = R * Math.cos(angle);
//     geometry.vertices.push(new THREE.Vector3(x, y, 0));
// }

// // geometry.vertices.push(new THREE.Vector3(0, 100, 0));

// // 插入最后一个点，line渲染模式下，产生闭合效果
// geometry.vertices.push(geometry.vertices[0])
// //材质对象
// var material = new THREE.LineBasicMaterial({
//     color: 0x000000
// });
// //线条模型对象
// var line = new THREE.Line(geometry, material);
// //线条对象添加到场景中
// scene.add(line);




// 直接给几何体Geometry设置两个顶点数据。

//声明一个几何体对象Geometry
// var geometry = new THREE.Geometry();
// //顶点1坐标
// var p1 = new THREE.Vector3(50, 0, 0);
// //顶点2坐标
// var p2 = new THREE.Vector3(0, 70, 0);
// //顶点坐标添加到geometry对象
// geometry.vertices.push(p1, p2);
// //材质对象
// var material = new THREE.LineBasicMaterial({
//     color: 0xffff00,
// });
// //线条模型对象
// var line = new THREE.Line(geometry, material);
// //线条对象添加到场景中
// scene.add(line);





// 通过LineCurve3绘制一条三维直线。

//声明一个几何体对象Geometry
var geometry = new THREE.Geometry();
//顶点1坐标
var p1 = new THREE.Vector3(50, 0, 0);
//顶点2坐标
var p2 = new THREE.Vector3(0, 70, 50);
// 三维直线LineCurve3
var LineCurve = new THREE.LineCurve3(p1, p2);

var pointArr = LineCurve.getPoints(10);

geometry.setFromPoints(pointArr);
//材质对象
var material = new THREE.LineBasicMaterial({
    color: 0xffff00,
});
//线条模型对象
var line = new THREE.Line(geometry, material);
//线条对象添加到场景中
scene.add(line);





// 通过LineCurve绘制一条二维直线。

// var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
// var p1 = new THREE.Vector2(50, 0); //顶点1坐标
// var p2 = new THREE.Vector2(0, 70); //顶点2坐标
// // 二维直线LineCurve
// var LineCurve = new THREE.LineCurve(p1, p2);
// var pointArr = LineCurve.getPoints(10);
// geometry.setFromPoints(pointArr);
// //材质对象
// var material = new THREE.LineBasicMaterial({
//     color: 0xffff00,
// });
// //线条模型对象
// var line = new THREE.Line(geometry, material);
// //线条对象添加到场景中
// scene.add(line);






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
