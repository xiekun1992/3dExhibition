define('Computer', [], function(){
	var material = new THREE.MeshLambertMaterial({color: 0x555555});
	// 显示器
	function Monitor(scale){
		this.front = new THREE.BoxGeometry(6 * scale, 4 * scale, 0.3 * scale);
		this.frontMesh = new THREE.Mesh(this.front, material);

		// 顶点
		var vertices = [
			new THREE.Vector3(2.6 * scale, 2 * scale, 0),
			new THREE.Vector3(2 * scale, 1.4 * scale, -0.6 * scale),
			new THREE.Vector3(-2 * scale, 1.4 * scale, -0.6 * scale),
			new THREE.Vector3(-2.6 * scale, 2 * scale, 0),
			new THREE.Vector3(2.6 * scale, -2 * scale, 0),
			new THREE.Vector3(2 * scale, -1.4 * scale, -0.6 * scale),
			new THREE.Vector3(-2 * scale, -1.4 * scale, -0.6 * scale),
			new THREE.Vector3(-2.6 * scale, -2 * scale, 0)
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

		this.bar = new THREE.BoxGeometry(1 * scale, 1.2 * scale, 0.1 * scale);
		this.barMesh = new THREE.Mesh(this.bar, material);
		this.barMesh.position.set(0, -2.2 * scale, -0.5 * scale);
		this.barMesh.rotation.x = 0.1 * Math.PI;

		this.base = new THREE.BoxGeometry(2.4 * scale, 0.2 * scale, 1.4 * scale);
		this.baseMesh = new THREE.Mesh(this.base, material);
		this.baseMesh.position.set(0, -2.8 * scale, -0.4 * scale);

		var geometry = new THREE.Geometry();

		this.frontMesh.updateMatrix();
		this.backMesh.updateMatrix();
		this.barMesh.updateMatrix();
		this.baseMesh.updateMatrix();

		geometry.merge(this.frontMesh.geometry, this.frontMesh.matrix);
		geometry.merge(this.backMesh.geometry, this.backMesh.matrix);
		geometry.merge(this.barMesh.geometry, this.barMesh.matrix);
		geometry.merge(this.baseMesh.geometry, this.baseMesh.matrix);

		this.mesh = new THREE.Mesh(geometry, material);

		this.mesh.recieveShadow = true;
		this.mesh.castShadow = true;
	}
	// 键盘
	function Keyboard(scale){
		this.geometry = new THREE.BoxGeometry(scale * 6, scale * 0.2, scale * 1.8);
		this.mesh = new THREE.Mesh(this.geometry, material);
	}
	// 鼠标
	function Mouse(scale){
		this.group = new THREE.Group();

		this.geometry = new THREE.BoxGeometry(scale * 1, scale * 0.5, scale * 2);
		this.mouseMesh = new THREE.Mesh(this.geometry, material);

		this.wheelGeometry = new THREE.TorusGeometry(scale * 0.06, scale * 0.06, 40, 40, Math.PI);
		var mWheelMaterial = new THREE.MeshLambertMaterial({color: 0xF35656});
		this.wheelMesh = new THREE.Mesh(this.wheelGeometry, mWheelMaterial);
		this.wheelMesh.position.set(scale * 0, scale * 0.06, scale * -0.4);
		this.wheelMesh.rotation.y = 0.5 * Math.PI;
		this.wheelMesh.rotation.x = -0.2 * Math.PI;

		this.meshBSP = new ThreeBSP(this.mouseMesh);
		
		var sphere1 = new THREE.SphereGeometry(scale * 1, 40, 40, 0, Math.PI * 2, 0, Math.PI);
		var m1 = new THREE.MeshBasicMaterial({wireframe: true});
		var sphere1Mesh = new THREE.Mesh(sphere1, m1);
		sphere1Mesh.position.set(0, scale * -0.8, 0);
		var sphere1BSP = new ThreeBSP(sphere1Mesh);
		
		var sphere2Mesh = new THREE.Mesh(sphere1, m1);
		sphere2Mesh.position.set(scale * 0.4, 0, 0);
		var sphere2BSP = new ThreeBSP(sphere2Mesh);

		var sphere3Mesh = new THREE.Mesh(sphere1, m1);
		sphere3Mesh.position.set(scale * -0.4, 0, 0);
		var sphere3BSP = new ThreeBSP(sphere3Mesh);

		var sphere4Mesh = new THREE.Mesh(sphere1, m1);
		sphere4Mesh.position.set(0, 0, scale * 0.2);
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
	function Case(scale){
		this.geometry = new THREE.BoxGeometry(scale * 2, scale * 4, scale * 4);
		this.mesh = new THREE.Mesh(this.geometry, material);
	}
	return function Computer(scale){
		scale = scale || 1;
		this.group = new THREE.Group();
		this.monitor = new Monitor(scale);
		this.keyboard = new Keyboard(scale);
		this.keyboard.mesh.position.set(0, scale * -2.8, scale * 2);
		this.computerCase = new Case(scale);
		this.computerCase.mesh.position.set(scale * -5, scale * -1, scale * 1);
		this.mouse = new Mouse(scale * 0.8);
		this.mouse.group.position.set(scale * 4, scale * -2.7, scale * 2);

		this.group.add(this.monitor.mesh);
		this.group.add(this.keyboard.mesh);
		this.group.add(this.computerCase.mesh);
		this.group.add(this.mouse.group);



	};
});