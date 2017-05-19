define('Test', [], function(){
	return function Test(){
		var width = window.innerWidth,
			height = window.innerHeight;


		this.scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(45, width / height, 0.1 ,1000);
		camera.position.set(0, 0, 10);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(width, height);
		renderer.setClearColor(0xffffff);
		renderer.shadowMapEnabled = true;
		renderer.shadowMapType=THREE.PCFSoftShadowMap;

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
		this.scene.add(amLight);

		var spotLight = new THREE.SpotLight(0xffffff, 1);
		spotLight.position.set(0, 10, 10);
		spotLight.castShadow = true;
		this.scene.add(spotLight);

		var axes = new THREE.AxisHelper(20);
		this.scene.add(axes);

		document.body.appendChild(renderer.domElement);

		this.action = function(){};
		this.render = function(){
			this.action();
			camControls.update(clock.getDelta());
			requestAnimationFrame(this.render);
			renderer.render(this.scene, camera);
		}.bind(this);

		function onResize(){
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
		window.addEventListener('resize', onResize, false);
	};
});