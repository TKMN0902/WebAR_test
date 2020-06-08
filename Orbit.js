window.addEventListener("DOMContentLoaded", init);

function init() {
	// �����ɏ�����ǉ����Ă����܂�

	const width = 960;
	const height = 540;

	const renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector("#myCanvas")
	});

	renderer.setPixelRatio(window.devicePixelRatio);

	renderer.setSize(width, height);

	const scene = new THREE.Scene();

	// new THREE.PerspectiveCamera(��p, �A�X�y�N�g��, �`��J�n����, �`��I������)
	const camera = new THREE.PerspectiveCamera(
		45,
		width / height,
		1,
		10000
	);
	camera.position.set(0, 0, +2000);
	const controls = new THREE.OrbitControls(camera);

	// new THREE.BoxGeometry(��, ����, ���s��)
	const geometry = new THREE.BoxGeometry(500, 500, 500);

	const material = new THREE.MeshStandardMaterial({
		color: 0x0000ff
	});

	// new THREE.Mesh(�W�I���g��,�}�e���A��)
	const box = new THREE.Mesh(geometry, material);
	// �V�[���ɒǉ�
	scene.add(box);

	// new THREE.DirectionalLight(�F)
	const light = new THREE.DirectionalLight(0xffffff);
	const light2 = new THREE.DirectionalLight(0xffffff);
	const light3 = new THREE.AmbientLight(0xffffff);
	light.intensity = 2; // ���̋�����{��

	// ���C�g�̈ʒu��ύX
	light.position.set(1, 1, 1);
	light2.position.set(-1, -1, -1);
	// �V�[���ɒǉ�
	scene.add(light);
	//scene.add(light2);
	//scene.add(light3);

	tick();

	function tick() {
		requestAnimationFrame(tick);
		renderer.render(scene, camera);
	}
}
