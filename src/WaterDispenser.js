define('WaterDispenser', [], function(){
	function Bucket(){
		this.material = new THREE.MeshPhongMaterial({color: 0x2b7dd4, transparent: true, opacity: 0.6});
		this.topGeometry = new THREE.CylinderGeometry(2, 2, 4, 50, 10, false, 0, 2 * Math.PI);
		this.bottomGeometry = new THREE.CylinderGeometry(2, 0.3, 1, 50, 10, false, 0, 2 * Math.PI);
		this.loopGeometry = new THREE.CylinderGeometry(2.1, 2.1, 0.4, 50, 10, false, 0, 2 * Math.PI); 

		this.topMesh = new THREE.Mesh(this.topGeometry, this.material);
		this.bottomMesh = new THREE.Mesh(this.bottomGeometry, this.material);
		this.bottomMesh.position.set(0, -2.5, 0);
		this.loopMesh = new THREE.Mesh(this.loopGeometry, this.material);

		var topMeshBSP = new ThreeBSP(this.topMesh);
		var bottomMeshBSP = new ThreeBSP(this.bottomMesh);

		this.loopMesh.position.set(0, 1.8, 0);
		var loopMesh1BSP = new ThreeBSP(this.loopMesh);
		this.loopMesh.position.set(0, 0, 0);
		var loopMesh2BSP = new ThreeBSP(this.loopMesh);
		this.loopMesh.position.set(0, -1.8, 0);
		var loopMesh3BSP = new ThreeBSP(this.loopMesh);

		var tmp = topMeshBSP.union(bottomMeshBSP).union(loopMesh1BSP).union(loopMesh2BSP).union(loopMesh3BSP);
		this.mesh = new tmp.toMesh();
		this.mesh.material = this.material;
		this.mesh.geometry.computeVertexNormals();
		this.mesh.geometry.computeFaceNormals();

		this.mesh.recieveShadow = true;
		this.mesh.castShadow = true;
	}

	function WaterDispenser(){
		this.group = new THREE.Group();

		this.material = new THREE.MeshLambertMaterial({color: 0xeeeeee});
		this.topGeometry = new THREE.CylinderGeometry(1.4, 1.4, 0.2, 50, 10, false, 0, 2 * Math.PI); 
		this.topMesh = new THREE.Mesh(this.topGeometry, this.material);
		this.topMesh.position.set(0, -2.6, 0);

		this.bodyGeometry = new THREE.BoxGeometry(4.6, 9, 4.6, 30, 30, 30);
		this.bodyMesh = new THREE.Mesh(this.bodyGeometry, this.material);
		this.bodyMesh.position.set(0, -7.2, 0);

		var tmpGeometry = new THREE.BoxGeometry(3.6, 2.4, 3);
		var tmpMesh = new THREE.Mesh(tmpGeometry, this.material);
		tmpMesh.position.set(0, -5, 3);

		var switcherGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.1);
		var switcher1Mesh = new THREE.Mesh(switcherGeometry, this.material);
		var switcher2Mesh = new THREE.Mesh(switcherGeometry, this.material);

		var tmpMeshBSP = new ThreeBSP(tmpMesh);
		var bodyMeshBSP = new ThreeBSP(this.bodyMesh);

		switcher1Mesh.position.set(0.8, -4.2, 2);
		switcher2Mesh.position.set(-0.8, -4.2, 2);

		this.bodyMesh = bodyMeshBSP.subtract(tmpMeshBSP).toMesh();
		this.bodyMesh.material = this.material;
		this.bodyMesh.geometry.computeVertexNormals();
		this.bodyMesh.geometry.computeFaceNormals();

		var geometry = new THREE.Geometry();
		this.topMesh.updateMatrix();
		this.bodyMesh.updateMatrix();
		switcher1Mesh.updateMatrix();
		switcher2Mesh.updateMatrix();
		geometry.merge(this.topMesh.geometry, this.topMesh.matrix);
		geometry.merge(this.bodyMesh.geometry, this.bodyMesh.matrix);
		geometry.merge(switcher1Mesh.geometry, switcher1Mesh.matrix);
		geometry.merge(switcher2Mesh.geometry, switcher2Mesh.matrix);

		this.bodyMesh = new THREE.Mesh(geometry, this.material);

		this.bodyMesh.recieveShadow = true;
		this.bodyMesh.castShadow = true;

		var bucket = new Bucket();

		console.log(JSON.stringify(this.bodyMesh.toJSON()));
		this.group.add(bucket.mesh);
		this.group.add(this.bodyMesh);
	}

	return WaterDispenser;
});