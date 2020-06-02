window.addEventListener("DOMContentLoaded", init);

function init() {
	// ここに処理を追加していきます

	const width = 960;
	const height = 540;

	const renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector("#myCanvas")
	});

	renderer.setPixelRatio(window.devicePixelRatio);

	renderer.setSize(width, height);

	const scene = new THREE.Scene();

	// new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
	const camera = new THREE.PerspectiveCamera(
		45,
		width / height,
		1,
		10000
	);
	camera.position.set(0, 0, +2000);

	// new THREE.BoxGeometry(幅, 高さ, 奥行き)
	const geometry = new THREE.BoxGeometry(500, 500, 500);
	const geometry2 = new THREE.SphereGeometry(300, 30, 30);

	const material = new THREE.MeshStandardMaterial({
		color: 0x0000ff
	});
	const loader = new THREE.TextureLoader();
	const texture = loader.load('/imgs/marusohead.jpg');
	const material2 = new THREE.MeshStandardMaterial({
		map: texture
	});

	// new THREE.Mesh(ジオメトリ,マテリアル)
	const box = new THREE.Mesh(geometry, material);
	const head = new THREE.Mesh(geometry2, material2);
	// シーンに追加
	//scene.add(box);
	scene.add(head);

	// new THREE.DirectionalLight(色)
	const light = new THREE.DirectionalLight(0xffffff);
	const light2 = new THREE.DirectionalLight(0xffffff);
	const light3 = new THREE.AmbientLight(0xffffff);
	light.intensity = 2; // 光の強さを倍に

	// ライトの位置を変更
	light.position.set(1, 1, 1);
	light2.position.set(-1, -1, -1);
	// シーンに追加
	/*scene.add(light);
	scene.add(light2);*/
	scene.add(light3);

	tick();

	var timer = 0;

	function tick() {
		timer++;
		requestAnimationFrame(tick);
		/*if (timer % 100 > 50) {
			box.rotation.x += 0.01;
		}
		else {
			box.rotation.y += 0.01;
		}*/
		camera.position.x = 2000 * Math.sin(timer * Math.PI / 180);
		camera.position.z = 2000 * Math.cos(timer * Math.PI / 180);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		renderer.render(scene, camera);
	}
}
