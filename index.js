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
	camera.position.set(0, 0, +1000);

	// new THREE.BoxGeometry(幅, 高さ, 奥行き)
	const geometry = new THREE.BoxGeometry(500, 500, 500);

	const material = new THREE.MeshStandardMaterial({
		color: 0x0000ff
	});

	// new THREE.Mesh(ジオメトリ,マテリアル)
	const box = new THREE.Mesh(geometry, material);
	// シーンに追加
	scene.add(box);

	// new THREE.DirectionalLight(色)
	const light = new THREE.DirectionalLight(0xffffff);
	light.intensity = 2; // 光の強さを倍に

	// ライトの位置を変更
	light.position.set(1, 1, 1);
	// シーンに追加
	scene.add(light);

	tick();

	var timer = 0;

	function tick() {
		timer++;
		requestAnimationFrame(tick);
		if (timer % 100 > 50) {
			box.rotation.x += 0.01;
		}
		else {
			box.rotation.y += 0.01;
		}
		renderer.render(scene, camera);
	}
}