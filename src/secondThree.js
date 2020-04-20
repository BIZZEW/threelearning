import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL';

// 创建渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

// 绑定渲染器
document.body.appendChild(renderer.domElement);

// 创建相机（视野角度（FOV），长宽比（aspect ratio），近截面（near），远截面（far）
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// 设置相机位置
camera.position.set(0, 0, 100);
// 设置相机方向
camera.lookAt(0, 0, 0);

// 创建场景
var scene = new THREE.Scene();

// 创建一个蓝色的线条材质
var material = new THREE.LineBasicMaterial({ color: 0x00ff00 });

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(0, 0, 10));
geometry.vertices.push(new THREE.Vector3(0, 0, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));

var line = new THREE.Line(geometry, material);

// 线条加入场景
scene.add(line);

if (WEBGL.isWebGLAvailable())
    animate();
else {
    var warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}

function animate() {
    // 使渲染器能够在每次屏幕刷新时对场景进行绘制的循环
    requestAnimationFrame(animate);

    // 让几何体旋转起来
    line.rotation.x += 0.01;
    line.rotation.y += 0.01;
    line.rotation.z += 0.01;

    // 渲染器渲染（场景，相机）
    renderer.render(scene, camera);
}