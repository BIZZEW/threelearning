import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL';

var renderer, scene, camera;
var geometry, line, material;

var MAX_POINTS = 1000, drawCount = 0, positions;

init();
animate();

function init() {
    // 创建渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 绑定渲染器
    document.body.appendChild(renderer.domElement);

    // 创建相机（视野角度（FOV），长宽比（aspect ratio），近截面（near），远截面（far）
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // 设置相机位置
    camera.position.set(200, 200, 200);
    // camera.position.z = 5;
    // 设置相机方向
    camera.lookAt(0, 0, 0);

    // 创建场景
    scene = new THREE.Scene();

    geometry = new THREE.BufferGeometry();

    // 属性
    positions = new Float32Array(MAX_POINTS * 3);
    // 每个点有三个值
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // 先只绘制两个点
    geometry.setDrawRange(drawCount, 2);

    material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    line = new THREE.Line(geometry, material);

    scene.add(line);

    positions = line.geometry.attributes.position.array;

    var x, y, z, index;
    x = y = z = index = 0;

    for (var i = 0, l = MAX_POINTS; i < l; i++) {
        positions[index++] = x;
        positions[index++] = y;
        positions[index++] = z;

        x += (Math.random() - 0.5) * 20;
        y += (Math.random() - 0.5) * 20;
        z += (Math.random() - 0.5) * 20;
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
}


function render() {
    renderer.render(scene, camera);

    if (drawCount <= MAX_POINTS)
        line.geometry.setDrawRange(drawCount++, 2);
    else
        drawCount = 0;

    // line.geometry.attributes.position.needsUpdate = true;
}

