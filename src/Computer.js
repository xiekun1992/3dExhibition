define('Computer', [], function(){
	var material = new THREE.MeshLambertMaterial({color: 0x555555});
	// 显示器
	function Monitor(){
		this.group = new THREE.Group();
		this.front = new THREE.BoxGeometry(6, 4, 0.3);
		this.frontMesh = new THREE.Mesh(this.front, material);

		// 顶点
		var vertices = [
			new THREE.Vector3(2.6, 2, 0),
			new THREE.Vector3(2, 1.4, -0.6),
			new THREE.Vector3(-2, 1.4, -0.6),
			new THREE.Vector3(-2.6, 2, 0),
			new THREE.Vector3(2.6, -2, 0),
			new THREE.Vector3(2, -1.4, -0.6),
			new THREE.Vector3(-2, -1.4, -0.6),
			new THREE.Vector3(-2.6, -2, 0)
		];
		var faces = [
			new THREE.Face3(0, 1, 2),
            new THREE.Face3(2, 3, 0),
            new THREE.Face3(0, 1, 5),
            new THREE.Face3(5, 4, 0),
            new THREE.Face3(4, 5, 6),
            new THREE.Face3(6, 7, 4),
            new THREE.Face3(7, 6, 2),
            new THREE.Face3(2, 3, 7),
            new THREE.Face3(1, 5, 6),
            new THREE.Face3(6, 2, 1),
            new THREE.Face3(0, 4, 7),
            new THREE.Face3(7, 3, 0)
		];
		this.back = new THREE.Geometry();
		this.back.vertices = vertices;
		this.back.faces = faces;
		this.back.computeFaceNormals();
		this.backMesh = new THREE.Mesh(this.back, material);
		this.backMesh.position.set(0, 0, 0);

		this.bar = new THREE.BoxGeometry(1, 1.2, 0.1);
		this.barMesh = new THREE.Mesh(this.bar, material);
		this.barMesh.position.set(0, -2.2, -0.5);
		this.barMesh.rotation.x = 0.1 * Math.PI;

		this.base = new THREE.BoxGeometry(2.4, 0.2, 1.4);
		this.baseMesh = new THREE.Mesh(this.base, material);
		this.baseMesh.position.set(0, -2.8, -0.4);

		this.group.add(this.frontMesh);
		this.group.add(this.backMesh);
		this.group.add(this.barMesh);
		this.group.add(this.baseMesh);
	}
	// 键盘
	function Keyboard(){
		this.geometry = new THREE.BoxGeometry(5, 0.1, 1.6);
		this.mesh = new THREE.Mesh(this.geometry, material);
	}
	// 鼠标
	function Mouse(){
		this.group = new THREE.Group();

		this.geometry = new THREE.BoxGeometry(1, 0.5, 2);
		this.mouseMesh = new THREE.Mesh(this.geometry, material);

		this.wheelGeometry = new THREE.TorusGeometry(0.06, 0.06, 40, 40, Math.PI);
		var mWheelMaterial = new THREE.MeshLambertMaterial({color: 0xF35656});
		this.wheelMesh = new THREE.Mesh(this.wheelGeometry, mWheelMaterial);
		this.wheelMesh.position.set(0, 0.06, -0.4);
		this.wheelMesh.rotation.y = 0.5 * Math.PI;
		this.wheelMesh.rotation.x = -0.2 * Math.PI;

		this.meshBSP = new ThreeBSP(this.mouseMesh);
		
		var sphere1 = new THREE.SphereGeometry(1, 40, 40, 0, Math.PI * 2, 0, Math.PI);
		var m1 = new THREE.MeshBasicMaterial({wireframe: true});
		var sphere1Mesh = new THREE.Mesh(sphere1, m1);
		sphere1Mesh.position.set(0, -0.8, 0);
		var sphere1BSP = new ThreeBSP(sphere1Mesh);
		
		var sphere2Mesh = new THREE.Mesh(sphere1, m1);
		sphere2Mesh.position.set(0.4, 0, 0);
		var sphere2BSP = new ThreeBSP(sphere2Mesh);

		var sphere3Mesh = new THREE.Mesh(sphere1, m1);
		sphere3Mesh.position.set(-0.4, 0, 0);
		var sphere3BSP = new ThreeBSP(sphere3Mesh);

		var sphere4Mesh = new THREE.Mesh(sphere1, m1);
		sphere4Mesh.position.set(0, 0, 0.2);
		var sphere4BSP = new ThreeBSP(sphere4Mesh);

		var tmpMesh = sphere1BSP.intersect(this.meshBSP);
		tmpMesh = sphere2BSP.intersect(tmpMesh);
		tmpMesh = sphere3BSP.intersect(tmpMesh);
		tmpMesh = sphere4BSP.intersect(tmpMesh);

		this.mesh = tmpMesh.toMesh();
		this.mesh.material = material;
		this.mesh.geometry.computeFaceNormals();
		this.mesh.geometry.computeVertexNormals();

		this.group.add(this.mesh);
		this.group.add(this.wheelMesh);
	}
	// 机箱
	function Case(){
		this.geometry = new THREE.BoxGeometry(2, 4, 4);
		this.mesh = new THREE.Mesh(this.geometry, material);
	}
	return function Computer(){
		this.group = new THREE.Group();
		var monitor = new Monitor();
		var keyboard = new Keyboard();
		keyboard.mesh.position.set(0, -3, 2);
		var computerCase = new Case();
		computerCase.mesh.position.set(-5, -1, 1);
		var mouse = new Mouse();
		mouse.group.position.set(4, -3, 2);

		this.group.add(monitor.group);
		this.group.add(keyboard.mesh);
		this.group.add(computerCase.mesh);
		this.group.add(mouse.group);
	};
});