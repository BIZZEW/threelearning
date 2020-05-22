import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxGeometry, Geometry } from 'three';
import imgURL from '../images/HeYuan.png';
import px from '../images/px.png';
import py from '../images/py.png';
import pz from '../images/pz.png';
import nx from '../images/nx.png';
import ny from '../images/ny.png';
import nz from '../images/nz.png';
import earthPicNormal from '../images/earth.png';
import earthPic from '../images/EarthPic2.jpg';
import grassPic from '../images/grass.jpg';
import legoPic from '../images/lego.jpg';
import testVid from '../images/test.mp4';

var container;

var camera, scene, renderer;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.z = 3200;

    scene = new THREE.Scene();

    scene.background = new THREE.CubeTextureLoader().load([px, nx, py, ny, pz, nz]);
    // 球体
    var geometry = new THREE.SphereBufferGeometry(100, 100, 100);
    //立方体
    // var geometry = new THREE.BoxGeometry(100, 100, 100);
    //材质对象Material
    var material = new THREE.MeshBasicMaterial({
        //网格模型设置颜色，网格模型颜色和环境贴图会进行融合计算
        color: 0xffffff,
        //设置环境贴图
        envMap: scene.background
        // 环境贴图反射率   控制环境贴图对被渲染三维模型影响程度
        // reflectivity: 0.1,
    });
    //网格模型对象Mesh
    var mesh = new THREE.Mesh(geometry, material);
    //网格模型添加到场景中
    scene.add(mesh);


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

var controls = new OrbitControls(camera, renderer.domElement);
