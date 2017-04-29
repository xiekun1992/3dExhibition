define('Workplace', [], function(){
	return function Workplace(){
			this.group = new THREE.Group();
			this.material = new THREE.MeshLambertMaterial({color: 0x3da1ff});
			this.deskMaterial = new THREE.MeshLambertMaterial({color: 0xbbbbbb});

			this.geometry = new THREE.BoxGeometry(0.05, 1, 2);
			this.mesh1 = new THREE.Mesh(this.geometry, this.material);

			this.mesh2 = new THREE.Mesh(this.geometry, this.material);
			this.mesh2.rotation.y = 0.5 * Math.PI;
			this.mesh2.position.set(-0.976, 0, 1);

			this.geometry1 = new THREE.BoxGeometry(0.05, 0.5, 0.55);
			this.shortMesh1 = new THREE.Mesh(this.geometry1, this.deskMaterial);
			this.shortMesh1.rotation.y = 0.5 * Math.PI;
			this.shortMesh1.position.set(-0.27, -0.25, -0.96);

			this.shortMesh2 = new THREE.Mesh(this.geometry1, this.deskMaterial);
			this.shortMesh2.position.set(-1.93, -0.25, 0.74);

			this.deskGeometry = new THREE.BoxGeometry(0.03, 1.98, 1.98);
			this.mesh3 = new THREE.Mesh(this.deskGeometry, this.deskMaterial);
			this.mesh3.rotation.z = 0.5 * Math.PI;
			this.mesh3.position.set(-0.976, 0, 0);
			this.deskBSP = new ThreeBSP(this.mesh3);

			this.sphere = new THREE.SphereGeometry(0.6, 32, 32);
			this.sphereMesh = new THREE.Mesh(this.sphere, this.deskMaterial);
			this.sphereMesh.position.set(-1.176, 0, -0.176);
			this.sphereBSP = new ThreeBSP(this.sphereMesh);

			this.tmp = new THREE.BoxGeometry(2, 1, 1);
			this.tmpMesh1 = new THREE.Mesh(this.tmp, this.deskMaterial);
			this.tmpMesh1.position.set(-1.6, 0, -0.8);
			this.tmp1BSP = new ThreeBSP(this.tmpMesh1);

			this.tmpMesh2 = new THREE.Mesh(this.tmp, this.deskMaterial);
			this.tmpMesh2.position.set(-2, 0, -0.1);
			this.tmp2BSP = new ThreeBSP(this.tmpMesh2);

			var tmpBSP = this.tmp1BSP.union(this.tmp2BSP);
			var resultBSP = this.deskBSP.subtract(this.sphereBSP)
										.subtract(tmpBSP);
			var resultMesh = resultBSP.toMesh();
			resultMesh.material = this.deskMaterial;
			resultMesh.geometry.computeFaceNormals();
			resultMesh.geometry.computeVertexNormals();

			resultMesh.castShadow = true;
			this.mesh1.castShadow = true;
			this.mesh2.castShadow = true;
			this.shortMesh1.castShadow = true;
			this.shortMesh2.castShadow = true;

			this.group.add(this.mesh1);
			this.group.add(this.mesh2);
			this.group.add(this.shortMesh1);
			this.group.add(this.shortMesh2);
			this.group.add(resultMesh);

	}
});