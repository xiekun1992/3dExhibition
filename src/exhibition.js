define('Exhibition', ['Ground', 'Door', 'Wall', 'Workplace', 'Computer', 'Cabinet', 'Bookshelf', 'TrashCan', 'WaterDispenser', 'Chair'], 
	function(Ground, Door, Wall, Workplace, Computer, Cabinet, Bookshelf, TrashCan, WaterDispenser, Chair){
	var width = window.innerWidth,
		height = window.innerHeight;

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1 ,1000);
	camera.position.set(-10, 0, 0);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var renderer = new THREE.WebGLRenderer({antiAlias: true});
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
	// camControls.staticMoving = true;

	var amLight = new THREE.AmbientLight(0x888888);
	scene.add(amLight);

	var spotLight = new THREE.SpotLight(0xdddddd, 1);
	// var spotLight = new THREE.SpotLight(0xfbdf75, 1);
	spotLight.position.set(0, 10, 0);
	spotLight.castShadow = true;
	scene.add(spotLight);

	document.body.appendChild(renderer.domElement);

	function render(){
		camControls.update(clock.getDelta());
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	render();

	function onResize(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	window.addEventListener('resize', onResize, false);

	/************************** 添加模型 ***************************/


	// 地板
	var ground = new Ground();
	ground.mesh.position.set(0, -1, 1.1);
	ground.mesh.rotation.z = -0.5 * Math.PI;
	ground.mesh.receieveShadow = true;
	scene.add(ground.mesh);
	function loadModel(name, cb){
		var loader = new THREE.ObjectLoader();
		loader.load('../models/' + name + '.json', 
		function(obj){
			obj.receieveShadow = true;
			obj.castShadow = true;
			cb && cb(obj);
			scene.add(obj);
		}, function ( xhr ) {
	        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	    }, function ( xhr ) {
	        console.error( 'An error happened' );
	    });
	}
	// 墙
	function createWall(){
		loadModel('wall/wall', function(obj){
			obj.position.set(-5.4, 0.5, 0);
		});
		loadModel('wall/kick_line', function(obj){
			obj.position.set(-4.25, -0.9, -5);
		});
		loadModel('wall/slate', function(obj){
			obj.position.set(-5.4, -0.64, 4.2);
		});
	}
	createWall();
	function createWindow(x, y, z){
		loadModel('window/frame', function(obj){
			obj.scale.set(0.8, 0.6, 0.8);
			obj.rotation.y = 0.5 * Math.PI;
			obj.position.set(x, y, z);
		});
		loadModel('window/glass', function(obj){
			obj.scale.set(0.8, 0.6, 0.8);
			obj.rotation.y = 0.5 * Math.PI;
			obj.position.set(x, y, z);
			obj.castShadow = false;
		});
	}
	createWindow(-5.4, 1.37, 0);
	createWindow(-5.4, 1.37, 4.2);
	createWindow(-5.4, 1.37, -4.2);
	// 门
	var door = new Door();
	door.group.position.set(5.34, 0.1, 4);
	scene.add(door.group);
	// 饮水机
	function createWaterDispenser(){
		loadModel('water_dispenser/waterDispenser', function(obj){
			obj.scale.set(0.1, 0.1, 0.1);
			obj.position.set(1, -0.5, 7.1);
			obj.rotation.y = Math.PI;
		});
		loadModel('water_dispenser/bucket', function(obj){
			obj.scale.set(0.1, 0.1, 0.1);
			obj.position.set(1, 0.22, 7.1);
			obj.rotation.y = Math.PI;
			obj.castShadow = false;
		});
	}
	createWaterDispenser();
	// 座椅
	function createChair(){
		var chair = new Chair();
		chair.group.scale.set(0.4, 0.4, 0.4);
		chair.group.position.set(-1, -0.69, 0);
		chair.group.rotation.y = 0.25 * Math.PI;
		return chair.group;
	}
	// 垃圾桶
	function createTrashCan(){
		var trashCan = new TrashCan();
		trashCan.group.scale.set(0.05, 0.05, 0.05);
		trashCan.group.position.set(-1.5, -0.9, 0.6);
		return trashCan.group;
	}
	// 书架
	function createBookshelf(){
		var bookshelf = new Bookshelf();
		bookshelf.group.scale.set(0.2, 0.24, 0.24);
		bookshelf.group.rotation.y = -0.5 * Math.PI;
		bookshelf.group.position.set(-0.27, -0.41, -0.5);
		return bookshelf.group;
	}
	// 工作柜
	function createCabinet(){
		var cabinet = new Cabinet();
		cabinet.group.scale.set(0.2, 0.2, 0.25);
		cabinet.group.position.set(-0.31, -0.58, -0.7);
		cabinet.group.rotation.y = -0.5 * Math.PI;
		return cabinet.group;
	}
	// 工位电脑
	function createPC(){
		var computer = new Computer(0.1);
		computer.computerCase.mesh.position.set(-0.5, -0.6, 0.3);
		computer.computerCase.mesh.rotation.y = 0.76 * Math.PI;

		computer.group.position.set(-0.5, -0.2, 0.5);
		computer.group.rotation.y = -0.75 * Math.PI;
		return computer.group;
	}
	// 工作区
	// function createWorkspace(position, rotation){
		// var workplaceGroup = new THREE.Group();
		// var workplace = new Workplace();
		// workplace.group.position.set(0, -0.5, 0);
		// var pc = createPC();
		// var cabinet = createCabinet();
		// var bookshelf = new createBookshelf();
		// var trashCan = new createTrashCan();
		// var chair = new createChair();


		// workplaceGroup.add(pc);
		// workplaceGroup.add(cabinet);
		// workplaceGroup.add(bookshelf);
		// workplaceGroup.add(trashCan);
		// workplaceGroup.add(chair);
		// workplaceGroup.add(workplace.group);
		
		// if(rotation){
		// 	workplaceGroup.rotation.x = rotation.x || 0;
		// 	workplaceGroup.rotation.y = rotation.y || 0;
		// 	workplaceGroup.rotation.z = rotation.z || 0;
		// }
		// workplaceGroup.position.set(position.x, position.y + 0.05, position.z);
		// return workplaceGroup;
	// }
	function createWorkspace(position, rotationY){
		loadModel('workplace/desk', function(obj){
			obj.position.set(-1 + position.x, -0.5 + position.y, position.z);
			obj.rotation.z = 0.5 * Math.PI;
			obj.rotation.y = (-rotationY || 0) * Math.PI;
		});
		loadModel('workplace/wall', function(obj){
			obj.position.set(position.x, -0.5 + position.y, position.z);
			obj.rotation.y = (rotationY || 0) * Math.PI;
		});
	}
	// 靠窗、前面的工作区
	createWorkspace({x: -1, y: 0, z: 3});
	// createWorkspace({x: -3, y: 0, z: 3}, -0.5);
	// var wpWindowfront = new THREE.Group();
	// var wp1 = new THREE.Group();
	
	// wp1.add(createWorkspace({x: 0, y: 0, z: 0}));
	// wp1.add(createWorkspace({x: -3, y: 0, z: 1}, {y: -0.5 * Math.PI}));

	// wp1.position.set(-1, 0, 3);
	// wpWindowfront.add(wp1);

	// var wp2 = new THREE.Group();

	// wp2.add(createWorkspace({x: 0, y: 0, z: 0}));
	// wp2.add(createWorkspace({x: -3, y: 0, z: 1}, {y: -0.5 * Math.PI}));

	// wp2.position.set(-5, 0, 5);
	// wp2.rotation.y = Math.PI;
	// wpWindowfront.add(wp2);


	// wpWindowfront.position.set(0.1, 0, 0);

	// scene.add(wpWindowfront);


	// // 靠窗、后面的工作区
	// var wpWindowback = new THREE.Group();
	// var wp1 = new THREE.Group();

	// wp1.add(createWorkspace({x: 0, y: 0, z: 0}));
	// wp1.add(createWorkspace({x: -3, y: 0, z: 1}, {y: -0.5 * Math.PI}));

	// wp1.position.set(-1, 0, 4);

	// var wp2 = new THREE.Group();
	// wp2.add(createWorkspace({x: 0, y: 0, z: 0}));
	// wp2.add(createWorkspace({x: -3, y: 0, z: 1}, {y: -0.5 * Math.PI}));

	// wp2.position.set(-5, 0, 6);
	// wp2.rotation.y = Math.PI;

	// wpWindowback.add(wp1);
	// wpWindowback.add(wp2);

	// wpWindowback.position.set(0.1, 0, -7);

	// scene.add(wpWindowback);

	// // 靠走廊、前面的工作区
	// var wp1 = new THREE.Group();
	// wp1.add(createWorkspace({x: 0, y: 0, z: 0}));
	// wp1.add(createWorkspace({x: -3, y: 0, z: 1}, {y: -0.5 * Math.PI}));

	// wp1.position.set(4.25, 0, -1.3);
	// wp1.rotation.y = 0.5 * Math.PI;

	// scene.add(wp1);

	// // 靠走廊、后面的工作区
	// var wp1 = new THREE.Group();
	// wp1.add(createWorkspace({x: 0, y: 0, z: 0}));

	// wp1.position.set(5.25, 0, -4.1);

	// scene.add(wp1);
});