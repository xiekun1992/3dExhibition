define('Exhibition', ['Ground', 'Door', 'Wall', 'Workplace'], function(Ground, Door, Wall, Workplace){
	var width = window.innerWidth,
		height = window.innerHeight;


	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1 ,1000);
	camera.position.set(0, 10, 10);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	renderer.setClearColor(0xffffff);
	renderer.shadowMapEnabled = true;

	var clock = new THREE.Clock();
	// var camControls = new THREE.FirstPersonControls(camera);
	// camControls.lookSpeed = 0.4;
	// camControls.movementSpeed = 20;
	// camControls.noFly = true;
	// camControls.lookVertical = true;
	// camControls.constrainVertical = true;
	// camControls.verticalMin = 1.0;
	// camControls.verticalMax = 2.0;
	// camControls.lon = 10;
	// camControls.lat = 10;
	var camControls = new THREE.TrackballControls(camera);
	camControls.rotateSpeed = 1;
	camControls.zoomSpeed = 1;
	camControls.panSpeed = 1;
	camControls.staticMoving = true;

	var amLight = new THREE.AmbientLight(0x555555);
	scene.add(amLight);

	var spotLight = new THREE.SpotLight(0xffffff, 1);
	spotLight.position.set(0, 10, 0);
	spotLight.castShadow = true;
	scene.add(spotLight);

	document.body.appendChild(renderer.domElement);
	// 地板
	var ground = new Ground();
	ground.mesh.position.set(0, -1, 1.1);
	ground.mesh.rotation.z = -0.5 * Math.PI;
	ground.mesh.receieveShadow = true;
	scene.add(ground.mesh);
	// 墙
	var wall = new Wall();
	scene.add(wall.group);
	// 门
	var door = new Door();
	scene.add(door.mesh);
	// 工作区
	// 靠窗、前面的工作区
	var wpWindowfront = new THREE.Group();
	var wp1 = new THREE.Group();
	var workplace1 = new Workplace();
	workplace1.group.position.set(0, -0.5, 0);
	wp1.add(workplace1.group);

	var workplace2 = new Workplace();
	workplace2.group.position.set(-3, -0.5, 1);
	workplace2.group.rotation.y = -0.5 * Math.PI;
	wp1.add(workplace2.group);

	wp1.position.set(-1, 0, 3);

	var wp2 = new THREE.Group();
	var workplace1 = new Workplace();
	workplace1.group.position.set(0, -0.5, 0);

	var workplace2 = new Workplace();
	workplace2.group.position.set(-3, -0.5, 1);
	workplace2.group.rotation.y = -0.5 * Math.PI;

	wp2.add(workplace1.group);
	wp2.add(workplace2.group);

	wp2.position.set(-5, 0, 5);
	wp2.rotation.y = Math.PI;

	wpWindowfront.add(wp1);
	wpWindowfront.add(wp2);

	wpWindowfront.position.set(0.1, 0, 0);

	scene.add(wpWindowfront);


	// 靠窗、后面的工作区
	var wpWindowback = new THREE.Group();
	var wp1 = new THREE.Group();
	var workplace1 = new Workplace();
	workplace1.group.position.set(0, -0.5, 0);
	wp1.add(workplace1.group);

	var workplace2 = new Workplace();
	workplace2.group.position.set(-3, -0.5, 1);
	workplace2.group.rotation.y = -0.5 * Math.PI;
	wp1.add(workplace2.group);

	wp1.position.set(-1, 0, 4);

	var wp2 = new THREE.Group();
	var workplace1 = new Workplace();
	workplace1.group.position.set(0, -0.5, 0);

	var workplace2 = new Workplace();
	workplace2.group.position.set(-3, -0.5, 1);
	workplace2.group.rotation.y = -0.5 * Math.PI;

	wp2.add(workplace1.group);
	wp2.add(workplace2.group);

	wp2.position.set(-5, 0, 6);
	wp2.rotation.y = Math.PI;

	wpWindowback.add(wp1);
	wpWindowback.add(wp2);

	wpWindowback.position.set(0.1, 0, -7);

	scene.add(wpWindowback);

	// 靠走廊、前面的工作区
	var wp1 = new THREE.Group();
	var workplace1 = new Workplace();
	workplace1.group.position.set(0, -0.5, 0);
	wp1.add(workplace1.group);

	var workplace2 = new Workplace();
	workplace2.group.position.set(-3, -0.5, 1);
	workplace2.group.rotation.y = -0.5 * Math.PI;
	wp1.add(workplace2.group);

	wp1.position.set(4.25, 0, -1.3);
	wp1.rotation.y = 0.5 * Math.PI;

	scene.add(wp1);

	// 靠走廊、后面的工作区
	var wp1 = new THREE.Group();
	var workplace1 = new Workplace();
	workplace1.group.position.set(0, -0.5, 0);
	wp1.add(workplace1.group);

	wp1.position.set(5.25, 0, -4.1);
	// wp1.rotation.y = 0.5 * Math.PI;

	scene.add(wp1);





	function render(){
		camControls.update(clock.getDelta());
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	render();
});