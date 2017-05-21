define('Cabinet', [], function(){
	var material = new THREE.MeshLambertMaterial({color: 0xbbbbbb});
	var wheelMaterial = new THREE.MeshLambertMaterial({color: 0x555555});
	function Drawer(){
		this.geometry = new THREE.BoxGeometry(1.94, 0.6, 0.06);
		this.mesh = new THREE.Mesh(this.geometry, material);
		this.mesh.position.set(0, 0, 0);
	}
	function Wheel(){
		this.wheelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.16, 40, 1, false, 0, 2 * Math.PI);
		this.wheelMesh = new THREE.Mesh(this.wheelGeometry, wheelMaterial);
		this.wheelMesh.rotation.z = 0.5 * Math.PI;
	}
	function Cabinet(){
		this.group = new THREE.Group();

		this.topGeometry = new THREE.BoxGeometry(2, 0.1, 2);
		this.topMesh = new THREE.Mesh(this.topGeometry, material);

		this.bodyGeometry = new THREE.BoxGeometry(1.9, 1.9, 1.9);
		this.bodyMesh = new THREE.Mesh(this.bodyGeometry, material);
		this.bodyMesh.position.set(0, -1 ,0);

		var drawer1 = new Drawer();
		var drawer2 = new Drawer();
		var drawer3 = new Drawer();
		drawer1.mesh.position.set(0, -0.38, 0.96);
		drawer2.mesh.position.set(0, -1, 0.96);
		drawer3.mesh.position.set(0, -1.62, 0.96);

		var wheel1 = new Wheel();
		wheel1.wheelMesh.position.set(0.8, -2.02, 0.8);
		var wheel2 = new Wheel();
		wheel2.wheelMesh.position.set(-0.8, -2.02, 0.8);
		var wheel3 = new Wheel();
		wheel3.wheelMesh.position.set(0.8, -2.02, -0.8);
		var wheel4 = new Wheel();
		wheel4.wheelMesh.position.set(-0.8, -2.02, -0.8);

		var topMeshBSP = new ThreeBSP(this.topMesh);
		var bodyMeshBSP = new ThreeBSP(this.bodyMesh);

		var drawer1BSP = new ThreeBSP(drawer1.mesh);
		var drawer2BSP = new ThreeBSP(drawer2.mesh);
		var drawer3BSP = new ThreeBSP(drawer3.mesh);
		
		var wheel1BSP = new ThreeBSP(wheel1.wheelMesh);
		var wheel2BSP = new ThreeBSP(wheel2.wheelMesh);
		var wheel3BSP = new ThreeBSP(wheel3.wheelMesh);
		var wheel4BSP = new ThreeBSP(wheel4.wheelMesh);

		// 合并柜子
		var mesh = topMeshBSP
					.union(bodyMeshBSP)
					.union(drawer1BSP)
					.union(drawer2BSP)
					.union(drawer3BSP)
					.toMesh();
					
		mesh.material = material;
		mesh.geometry.computeVertexNormals();
		mesh.geometry.computeFaceNormals();
		mesh.castShadow = true;
		mesh.recieveShadow = true;

		var wheelMesh = wheel1BSP
					   .union(wheel2BSP)
					   .union(wheel3BSP)
					   .union(wheel4BSP)
					   .toMesh();

		wheelMesh.material = wheelMaterial;
		wheelMesh.geometry.computeVertexNormals();
		wheelMesh.geometry.computeFaceNormals();
		wheelMesh.castShadow = true;
		wheelMesh.recieveShadow = true;


		this.group.add(mesh);
		this.group.add(wheelMesh);
	}
	return Cabinet;
});