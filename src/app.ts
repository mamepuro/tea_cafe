import * as $ from "jquery";
import * as THREE from "three";
$(function () {
    let $mainFrame = $("body");

    // シーン、カメラ、レンダラを生成
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, $mainFrame.width() / $mainFrame.height(), 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize($mainFrame.width(), $mainFrame.height());
    camera.position.z = 5;
    camera.position.y = 1;

    // 自動生成されたcanvas要素をdivへ追加する。
    $mainFrame.append(renderer.domElement);

    // ここらへんは好きなオブジェクトをシーンに突っ込んじゃってください。
    const geometry = new THREE.BufferGeometry();
    const norm = [];
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(norm, 3));
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    const vertices = new Float32Array([
        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0,
        1.0, 1.0, 0.0,

        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0,
        -1.0, -1.0, 0.0
    ]);

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);

    //let geometry = new THREE.BoxGeometry(1, 1, 1);
    // let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    //let material = new THREE.MeshNormalMaterial();

    // Asixヘルパー
    let axisHelper = new THREE.AxesHelper(10);
    //scene.add(axisHelper);

    // Gridヘルパー
    let gridHelper = new THREE.GridHelper(20, 5);
    //scene.add(gridHelper);

    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // コールバック関数 render をrequestAnimationFrameに渡して、
    // 繰り返し呼び出してもらう。
    let render = function () {
        window.requestAnimationFrame(render);
        cube.rotation.y += 0.01;
        //cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    render();

    $(window).keypress(function (eventObject) {
        if ('h' == eventObject.key) {
            camera.rotation.y += 0.01;
        }
        if ('l' == eventObject.key) {
            camera.rotation.y -= 0.01;
        }
        if ('j' == eventObject.key) {
            camera.rotation.x -= 0.01;
        }
        if ('k' == eventObject.key) {
            camera.rotation.x += 0.01;
        }
    });
});