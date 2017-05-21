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

		// 合并支架
		var xMeshBSP = new ThreeBSP(this.xMesh);
		var yMeshBSP = new ThreeBSP(this.yMesh);
		var zMeshBSP = new ThreeBSP(this.zMesh);
		var meshBSP = xMeshBSP.union(yMeshBSP).union(zMeshBSP);


		var wheel1 = new Wheel();
		var wheel2 = new Wheel();
		var wheel3 = new Wheel();
		var wheel4 = new Wheel();

		wheel1.wheelMesh.position.set(0, -0.15, 0.7);
		wheel2.wheelMesh.position.set(0, -0.15, -0.7);
		wheel3.wheelMesh.position.set(-0.7, -0.15, 0);
		wheel4.wheelMesh.position.set(0.7, -0.15, 0);

		wheel3.wheelMesh.rotation.y = 0.5 * Math.PI;
		wheel4.wheelMesh.rotation.y = 0.5 * Math.PI;

		// 合并滚轮
		var wheel1BSP = new ThreeBSP(wheel1.wheelMesh);
		var wheel2BSP = new ThreeBSP(wheel2.wheelMesh);
		var wheel3BSP = new ThreeBSP(wheel3.wheelMesh);
		var wheel4BSP = new ThreeBSP(wheel4.wheelMesh);
		var wheelsBSP = wheel1BSP.union(wheel2BSP).union(wheel3BSP).union(wheel4BSP);

		this.mesh = wheelsBSP.union(meshBSP).toMesh();
		this.mesh.material = material1;
		this.mesh.geometry.computeFaceNormals();
		this.mesh.geometry.computeVertexNormals();	
		this.mesh.position.set(0, -0.75, 0.7);

		this.mesh.recieveShadow = true;
		this.mesh.castShadow = true;
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

		// 合并扶手和基座
		var baseBSP = new ThreeBSP(base.mesh);
		var handrailLeftBSP = new ThreeBSP(handrailLeft.mesh);
		var handrailRightBSP = new ThreeBSP(handrailRight.mesh);
		baseMesh = baseBSP.union(handrailLeftBSP).union(handrailRightBSP).toMesh();
		baseMesh.material = material1;
		baseMesh.geometry.computeVertexNormals();
		baseMesh.geometry.computeFaceNormals();
		baseMesh.recieveShadow = true;
		baseMesh.castShadow = true;

		this.group.add(baseMesh);
	}

	return Chair;
});