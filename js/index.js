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

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext('2d');

	const scene = new THREE.Scene();

	// new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
	const camera = new THREE.PerspectiveCamera(
		45,
		width / height,
		1,
		10000
	);
	camera.position.set(0, 0, 1000);

	// new THREE.BoxGeometry(幅, 高さ, 奥行き)
	const geometry = new THREE.BoxGeometry(500, 500, 500);
	const geometry2 = new THREE.SphereGeometry(300, 30, 30);

	const material = new THREE.MeshStandardMaterial({
		color: 0x0000ff
	});
	const loader = new THREE.TextureLoader();
	const texture = loader.load('/imgs/marusohead.jpg');
	const material2 = new THREE.MeshToonMaterial({
		map: texture
		//color: 0x00ff00
	});

	// new THREE.Mesh(ジオメトリ,マテリアル)
	const box = new THREE.Mesh(geometry, material);
	const head = new THREE.Mesh(geometry2, material2);
	// シーンに追加
	scene.add(box);
	//scene.add(head);

	const bodymaterial = new THREE.SpriteMaterial({
		map: new THREE.TextureLoader().load('/imgs/marusobody.png')
	});
	const sprite = new THREE.Sprite(bodymaterial);
	scene.add(sprite);

	const plane = new THREE.GridHelper(1000, 10, 0x888888, 0x888888);
	plane.position.y = -500;
	scene.add(plane);

	// new THREE.DirectionalLight(色)
	const light = new THREE.DirectionalLight(0xffffff);
	const light2 = new THREE.DirectionalLight(0xffffff);
	const light3 = new THREE.AmbientLight(0xffffff);
	//light.intensity = 2; // 光の強さを倍に
	light3.intensity = 0.5;

	// ライトの位置を変更
	light.position.set(0, 1, 1);
	light2.position.set(-1, -1, -1);
	// シーンに追加
	scene.add(light);
	//scene.add(light2);
	scene.add(light3);

	tick();

	var rotX = 0;
	var rotY = 0;
	var mouseX = 0;
	var mouseY = 0;

	document.addEventListener("mousemove", (event) => {
		mouseX = event.pageX;
		mouseY = event.pageY;
	});

	function tick() {
		requestAnimationFrame(tick);
		const targetRotX = (mouseX / window.innerWidth) * 360 - 180;
		const targetRotY = 90 - (mouseY / window.innerHeight) * 180;
		rotX += (targetRotX - rotX) * 0.1;
		rotY += (targetRotY - rotY) * 0.1;
		const radianX = rotX * Math.PI / 180;
		const radianY = rotY * Math.PI / 180;
		camera.position.x = 1000 * Math.sin(radianX);
		camera.position.y = 1000 * Math.sin(radianY);
		if ((Math.sin(radianX) ** 2) + (Math.sin(radianY) ** 2) < 1) {
			if (Math.cos(radianX) > 0) {
				camera.position.z = 1000 * Math.sqrt(1 - (Math.sin(radianX) ** 2) - (Math.sin(radianY) ** 2));
			}
			else {
				camera.position.z = -1000 * Math.sqrt(1 - (Math.sin(radianX) ** 2) - (Math.sin(radianY) ** 2));
			}
		}
		else {
			if (Math.cos(radianX) > 0) {
				camera.position.z = 1000 * Math.sqrt((Math.sin(radianX) ** 2) + (Math.sin(radianY) ** 2) - 1);
			}
			else {
				camera.position.z = -1000 * Math.sqrt((Math.sin(radianX) ** 2) + (Math.sin(radianY) ** 2) - 1);
			}
		}
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		renderer.render(scene, camera);
		document.getElementById('edit_area').textContent = Math.sin(radianX) ** 2;
		document.getElementById('edit_area2').textContent = Math.sin(radianY) ** 2;
	}
}