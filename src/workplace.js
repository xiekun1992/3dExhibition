define('Workplace', [], function(){
	return function Workplace(){
			this.group = new THREE.Group();
			this.material = new THREE.MeshPhongMaterial({color: 0x4aa3f5});
			this.deskMaterial = new THREE.MeshLambertMaterial({color: 0xbbbbbb});

			this.mesh1Geometry = new THREE.CubeGeometry(0.05, 1, 2, 1, 1, 1);
			this.mesh1 = new THREE.Mesh(this.mesh1Geometry, this.material);

			this.mesh2Geometry = new THREE.CubeGeometry(0.05, 1, 2, 1, 1, 1);
			this.mesh2 = new THREE.Mesh(this.mesh2Geometry, this.material);
			this.mesh2.rotation.y = 0.5 * Math.PI;
			this.mesh2.position.set(-0.976, 0, 1);

			this.geometry1 = new THREE.BoxGeometry(0.05, 0.5, 0.55);
			this.shortMesh1 = new THREE.Mesh(this.geometry1, this.deskMaterial);
			this.shortMesh1.rotation.y = 0.5 * Math.PI;
			this.shortMesh1.position.set(-0.27, -0.25, -0.96);

			this.shortMesh2 = new THREE.Mesh(this.geometry1, this.deskMaterial);
			this.shortMesh2.position.set(-1.93, -0.25, 0.74);

			this.deskGeometry = new THREE.BoxGeometry(0.03, 1.98, 1.98, 20, 20, 20);
			this.mesh3 = new THREE.Mesh(this.deskGeometry, this.deskMaterial);
			this.mesh3.rotation.z = 0.5 * Math.PI;
			this.mesh3.position.set(-0.976, 0, 0);
			this.deskBSP = new ThreeBSP(this.mesh3);

			// 通过二元运算作出凹陷的桌面
			this.sphere = new THREE.SphereGeometry(0.6, 30, 30);
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

			var shortMesh1BSP = new ThreeBSP(this.shortMesh1);
			var shortMesh2BSP = new ThreeBSP(this.shortMesh2);

			var tmpBSP = this.tmp1BSP.union(this.tmp2BSP);
			var resultBSP = this.deskBSP.subtract(this.sphereBSP)
										.subtract(tmpBSP)
										.union(shortMesh1BSP)
										.union(shortMesh2BSP);
			var resultMesh = resultBSP.toMesh();
			resultMesh.material = this.deskMaterial;
			resultMesh.geometry.computeFaceNormals();
			resultMesh.geometry.computeVertexNormals();

			resultMesh.castShadow = true;
			resultMesh.receiveShadow = true;
			
			var mesh1BSP = new ThreeBSP(this.mesh1);
			var mesh2BSP = new ThreeBSP(this.mesh2);

			var wallMesh = mesh1BSP.union(mesh2BSP).toMesh();
			wallMesh.material = this.material;
			wallMesh.geometry.computeFaceNormals();
			wallMesh.geometry.computeVertexNormals();

			wallMesh.castShadow = true;
			wallMesh.receiveShadow = true;

			this.group.add(wallMesh);
			this.group.add(resultMesh);
	};
});