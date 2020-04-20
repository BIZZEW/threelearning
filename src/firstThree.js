import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL';

// 创建场景
var scene = new THREE.Scene();
// 创建相机（视野角度（FOV），长宽比（aspect ratio），近截面（near），远截面（far）
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 创建渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

// 绑定渲染器
document.body.appendChild(renderer.domElement);

// 创建几何体
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 创建网格（几何体，材质）
var cube = new THREE.Mesh(geometry, material);

// 网格加入场景
scene.add(cube);

// 设置相机位置
camera.position.z = 5;

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
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    // 渲染器渲染（场景，相机）
    renderer.render(scene, camera);
}