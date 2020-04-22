import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL';

// 创建渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 绑定渲染器
document.body.appendChild(renderer.domElement);

// 创建相机（视野角度（FOV），长宽比（aspect ratio），近截面（near），远截面（far）
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(0, 0, 5);
// camera.position.z = 5;
// 设置相机方向
camera.lookAt(0, 0, 0);

// 创建场景
var scene = new THREE.Scene();



var geometry = new THREE.BufferGeometry();
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
var vertices = new Float32Array([
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0,
    1.0, 1.0, 0.0,

    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    -1.0, -1.0, 0.0,

    // 1.0, 1.0, 0.0,
    // 1.0, -1.0, 0.0,
    // -1.0, -1.0, 0.0,
    // -1.0, 1.0, 0.0,
]);

// itemSize = 3 因为每个顶点都是一个三元组。
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

geometry.setDrawRange(0, 3);

console.log(geometry.toJSON());
console.log(geometry.id);

var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);



if (WEBGL.isWebGLAvailable()) {
    animate();
    // line.geometry.attributes.position.needsUpdate = true;
} else {
    var warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}

function animate() {
    // 使渲染器能够在每次屏幕刷新时对场景进行绘制的循环
    requestAnimationFrame(animate);

    // 让几何体旋转起来
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    // mesh.rotation.z += 0.01;

    // 渲染器渲染（场景，相机）
    renderer.render(scene, camera);
}
