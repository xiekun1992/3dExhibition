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
	spotLight.position.set(0, 20, 0);
	spotLight.castShadow = true;
	scene.add(spotLight);

	document.body.appendChild(renderer.domElement);

	var stats = new Stats();
	stats.showPanel(0);
	document.body.appendChild(stats.dom);

	function render(){
		camControls.update(clock.getDelta());
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		stats.update();
	}
	render();

	function onResize(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	window.addEventListener('resize', onResize, false);

	/************************** 添加模型 ***************************/

	function loadModel(name, cb){
		var promise = new Promise(function(resolve, reject){
			var loader = new THREE.ObjectLoader();
			loader.load('./models/' + name + '.json', 
			function(obj){
				obj.receieveShadow = true;
				obj.castShadow = true;
				resolve(obj);
			}, function ( xhr ) {
		        // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		    }, function ( xhr ) {
		        console.error( 'An error happened' );
		        reject(null);
		    });
		});
		return promise;
	}
	function generateCacheModelLoader(handler, ...promises){
		var promise = Promise.all(promises);
		return function(...args){
			return Promise.resolve(promise).then(function(meshs){
				var meshsCopy = [];
				meshs.forEach(function(o, i){
					meshsCopy[i] = o.clone();
				});
				return Promise.resolve(handler.apply(null, [meshsCopy, ...args]));
			});
		};
	}

	// 地板
	var ground = new Ground();
	ground.mesh.position.set(0, -1, 1.1);
	ground.mesh.rotation.z = -0.5 * Math.PI;
	ground.mesh.receieveShadow = true;
	scene.add(ground.mesh);
	// 墙
	function createWall(){
		loadModel('wall/wall').then(function(obj){
			obj.position.set(-5.4, 0.5, 0);
			scene.add(obj);
		});
		loadModel('wall/kick_line').then(function(obj){
			obj.position.set(-4.25, -0.9, -5);
			scene.add(obj);
		});
		loadModel('wall/slate').then(function(obj){
			obj.position.set(-5.4, -0.64, 4.2);
			scene.add(obj);
		});
	}
	createWall();
	// 窗户
	var createWindow = generateCacheModelLoader(function(meshs, x, y, z){
		var glass = meshs[0], frame = meshs[1];
		var group = new THREE.Group();
		glass.castShadow = false;
		group.add(glass);
		group.add(frame);
		group.scale.set(0.8, 0.6, 0.8);
		group.rotation.y = 0.5 * Math.PI;
		group.position.set(x, y, z);
		scene.add(group);
	}, loadModel('window/glass'), loadModel('window/frame'));

	createWindow(-5.4, 1.37, 0);
	createWindow(-5.4, 1.37, 4.2);
	createWindow(-5.4, 1.37, -4.2);
	// 门
	var door = new Door();
	door.group.position.set(5.34, 0.1, 4);
	scene.add(door.group);
	// 饮水机
	function createWaterDispenser(){
		loadModel('water_dispenser/waterDispenser').then(function(obj){
			obj.scale.set(0.1, 0.1, 0.1);
			obj.position.set(1, -0.5, 7.1);
			obj.rotation.y = Math.PI;
			scene.add(obj);
		});
		loadModel('water_dispenser/bucket').then(function(obj){
			obj.scale.set(0.1, 0.1, 0.1);
			obj.position.set(1, 0.22, 7.1);
			obj.rotation.y = Math.PI;
			obj.castShadow = false;
			scene.add(obj);
		});
	}
	createWaterDispenser();
	// 座椅
	var createChair = generateCacheModelLoader(function(meshs){
		var chair = meshs[0], base = meshs[1];
		chair.scale.set(0.4, 0.4, 0.4);
		chair.position.set(-1, -0.31, -0.56);
		chair.rotation.x = -0.56 * Math.PI;

		base.scale.set(0.4, 0.4, 0.4);
		base.position.set(-1, -0.92, 0);
		base.rotation.z = 0.5 * Math.PI;

		var groupTmp = new THREE.Group();
		groupTmp.add(chair);
		groupTmp.add(base);
		groupTmp.rotation.y = 0.25 * Math.PI;
		groupTmp.position.set(-0.2, 0, -0.6);

		var group = new THREE.Group();
		group.add(groupTmp);
		return group;
	}, loadModel('chair/chair'), loadModel('chair/base'));
	// 垃圾桶
	var createTrashCan = generateCacheModelLoader(function(meshs){
		var trashCan = meshs.shift();
		trashCan.scale.set(0.05, 0.05, 0.05);
		trashCan.position.set(-1.5, -0.85, 0.6);
		var group = new THREE.Group();
		group.add(trashCan);
		return group;
	}, loadModel('trash_can/trashCan'));
	// 书架
	var createBookshelf = generateCacheModelLoader(function(meshs){
		var bookshelf = meshs.shift();
		bookshelf.scale.set(0.2, 0.24, 0.24);
		bookshelf.rotation.y = -0.5 * Math.PI;
		bookshelf.position.set(-0.27, -0.38, -0.5);
		var group = new THREE.Group();
		group.add(bookshelf);
		return group;
	}, loadModel('bookshelf/bookshelf'));
	// 工作柜
	var createCabinet = generateCacheModelLoader(function(meshs){
		var cabinet = meshs[0], wheels = meshs[1];
		cabinet.scale.set(0.2, 0.2, 0.25);
		cabinet.position.set(-0.3, -0.525, -0.74);
		cabinet.rotation.y = -0.5 * Math.PI;
		
		wheels.scale.set(0.2, 0.2, 0.25);
		wheels.position.set(-0.5, -0.93, -0.9);
		wheels.rotation.y = -0.5 * Math.PI;
		wheels.rotation.z = -0.5 * Math.PI;

		var group = new THREE.Group();
		group.add(cabinet);
		group.add(wheels);
		return group;
	}, loadModel('cabinet/cabinet'), loadModel('cabinet/wheels'));
	// 工位电脑
	var createPC = generateCacheModelLoader(function(meshs){
		meshs.forEach(function(o){
			o.scale.set(0.1, 0.1, 0.1);
		});
		var monitor = meshs[0], keyboard = meshs[1], computerCase = meshs[2], mouse = meshs[3], wheel = meshs[4];
		var group = new THREE.Group(), groupTmp = new THREE.Group();

		monitor.position.z = -0.1;

		keyboard.position.set(0, -0.28, 0.23);

		computerCase.position.set(-0.5, -0.6, 0.3);
		computerCase.rotation.y = 0.76 * Math.PI;

		mouse.position.set(0.45, -0.27, 0.3);
		wheel.position.set(0.45, -0.27, 0.24);
		wheel.rotation.set(-0.3 * Math.PI, 0.5 * Math.PI, 0);

		groupTmp.add(monitor);
		groupTmp.add(keyboard);
		groupTmp.add(computerCase);
		groupTmp.add(mouse);
		groupTmp.add(wheel);
		groupTmp.position.set(-0.5, -0.15, 0.5);
		groupTmp.rotation.y = -0.75 * Math.PI;
		// scene.add(group);
		group.add(groupTmp);
		return group;
	}, loadModel('computer/monitor'), loadModel('computer/keyboard'), loadModel('computer/case'), loadModel('computer/mouse/mouse'), loadModel('computer/mouse/wheel'));

	// createPC();
	// 工作区
	var createWorkspace = generateCacheModelLoader(function(meshs, position, rotationY){
		var group = new THREE.Group();
		meshs[0].position.set(-0.985, -0.45, -0.008);
		meshs[0].rotation.z = 0.5 * Math.PI;
		meshs[1].position.y = -0.45;
		group.add(meshs[0], meshs[1]);
		setModels(group);
		// 添加工位上的物品
		addModels();

		function setModels(group){
			group.position.set(position.x, position.y, position.z);
			group.rotation.y = (-rotationY || 0) * Math.PI;
			scene.add(group);
		}
		function addModels(){
			// 添加工作柜
			createCabinet().then(setModels);
			// 添加书架
			createBookshelf().then(setModels);
			// 添加垃圾桶
			createTrashCan().then(setModels);
			// 添加座椅
			createChair().then(setModels);
			// 添加电脑
			createPC().then(setModels);
		}
	}, loadModel('workplace/desk'), loadModel('workplace/wall'));
	// 靠窗、前面的工作区
	createWorkspace({x: -1, y: 0, z: 3});
	createWorkspace({x: -4, y: 0, z: 4}, 0.5);

	createWorkspace({x: -2, y: 0, z: 4}, -0.5);
	createWorkspace({x: -5, y: 0, z: 5}, -1);

	// 靠窗、后面的工作区
	var distance = -6;
	createWorkspace({x: -1, y: 0, z: 3 + distance});
	createWorkspace({x: -4, y: 0, z: 4 + distance}, 0.5);

	createWorkspace({x: -2, y: 0, z: 4 + distance}, -0.5);
	createWorkspace({x: -5, y: 0, z: 5 + distance}, -1);

	// 靠走廊、前面的工作区
	createWorkspace({x: 5.2, y: 0, z: 1.5});
	createWorkspace({x: 4.2, y: 0, z: -1.5}, -0.5);	

	// 靠走廊、后面的工作区
	createWorkspace({x: 5.2, y: 0, z: -4.1});
});