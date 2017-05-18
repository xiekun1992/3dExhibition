define('Chair', [], function(){
	var material1 = new THREE.MeshLambertMaterial({color: 0x555555});
	var material2 = new THREE.MeshLambertMaterial({color: 0x3da1ff});
	function Wheel(){
		this.wheelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.16, 40, 1, false, 0, 2 * Math.PI);
		this.wheelMesh = new THREE.Mesh(this.wheelGeometry, material1);
		this.wheelMesh.rotation.z = 0.5 * Math.PI;

		this.wheelMesh.recieveShadow = true;
		this.wheelMesh.castShadow = true;
	}
	function Base(){
		this.group = new THREE.Group();

		this.xGeometry = new THREE.BoxGeometry(1.6, 0.14, 0.13);
		this.xMesh = new THREE.Mesh(this.xGeometry, material1);

		this.yGeometry = new THREE.BoxGeometry(1.6, 0.14, 0.13);
		this.yMesh = new THREE.Mesh(this.yGeometry, material1);
		this.yMesh.rotation.y = 0.5 * Math.PI;

		this.zGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6, 30, 1, false, 0, 2 * Math.PI);
		this.zMesh = new THREE.Mesh(this.zGeometry, material1);
		this.zMesh.position.set(0, 0.23, 0);

		this.xMesh.recieveShadow = true;
		this.xMesh.castShadow = true;
		this.yMesh.recieveShadow = true;
		this.yMesh.castShadow = true;
		this.zMesh.recieveShadow = true;
		this.zMesh.castShadow = true;

		var wheel1 = new Wheel();
		var wheel2 = new Wheel();
		var wheel3 = new Wheel();
		var wheel4 = new Wheel();
		var wheels = new THREE.Group();

		wheel1.wheelMesh.position.set(0, 0, 0.7);
		wheel2.wheelMesh.position.set(0, 0, -0.7);
		wheel3.wheelMesh.position.set(-0.7, 0, 0);
		wheel4.wheelMesh.position.set(0.7, 0, 0);

		wheel3.wheelMesh.rotation.y = 0.5 * Math.PI;
		wheel4.wheelMesh.rotation.y = 0.5 * Math.PI;

		wheels.add(wheel1.wheelMesh);
		wheels.add(wheel2.wheelMesh);
		wheels.add(wheel3.wheelMesh);
		wheels.add(wheel4.wheelMesh);

		wheels.position.set(0, -0.15, 0);

		this.group.add(this.xMesh);
		this.group.add(this.yMesh);
		this.group.add(this.zMesh);
		this.group.add(wheels);

		this.group.position.set(0, -0.53, 0);
	}
	function Handrail(){
		this.frontGeometry = new THREE.BoxGeometry(0.14, 0.1, 0.56);
		this.frontMesh = new THREE.Mesh(this.frontGeometry, material1);
		this.topGeometry = new THREE.BoxGeometry(0.14, 0.1, 1);
		this.topMesh = new THREE.Mesh(this.topGeometry, material1);
		this.topMesh.position.set(0, 0.5, -0.2);
		this.frontMesh.rotation.x = -0.56 * Math.PI;
		this.frontMesh.position.set(0, 0.266, 0.305);
		
		var frontMeshBSP = new ThreeBSP(this.frontMesh);
		var topMeshBSP = new ThreeBSP(this.topMesh);
		this.mesh = frontMeshBSP.union(topMeshBSP).toMesh();
		this.mesh.material = material1;
		this.mesh.geometry.computeFaceNormals();
		this.mesh.geometry.computeVertexNormals();

		this.mesh.recieveShadow = true;
		this.mesh.castShadow = true;
	}
	function Chair(){
		this.group = new THREE.Group();

		this.backGeometry = new THREE.BoxGeometry(1.4, 0.2, 1.5);
		this.backMesh = new THREE.Mesh(this.backGeometry, material2);
		this.bottomGeometry = new THREE.BoxGeometry(1.4, 0.2, 1.4);
		this.bottomMesh = new THREE.Mesh(this.bottomGeometry, material2);
		this.backMesh.rotation.x = -0.56 * Math.PI;
		this.backMesh.position.set(0, 0.75, -0.75);

		var backMeshBSP = new ThreeBSP(this.backMesh);
		var bottomMeshBSP = new ThreeBSP(this.bottomMesh);
		this.mesh = backMeshBSP.union(bottomMeshBSP).toMesh();
		this.mesh.material = material2;
		this.mesh.geometry.computeFaceNormals();
		this.mesh.geometry.computeVertexNormals();	
		this.mesh.recieveShadow = true;
		this.mesh.castShadow = true;

		this.group.add(this.mesh);

		var base = new Base();
		var handrailLeft = new Handrail();
		var handrailRight = new Handrail();

		handrailLeft.mesh.position.set(-0.77, 0.26, 0.3);
		handrailRight.mesh.position.set(0.77, 0.26, 0.3);

		this.group.add(handrailLeft.mesh);
		this.group.add(handrailRight.mesh);

		this.group.add(base.group);
	}

	return Chair;
});