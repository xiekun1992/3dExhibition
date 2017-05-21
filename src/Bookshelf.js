define('Bookshelf', [], function(){
	var material = new THREE.MeshLambertMaterial({color: 0xefefef});
	var thick = 0.02;
	function Side(){
		this.geometry = new THREE.BoxGeometry(thick, 1.6, 1);
		this.mesh = new THREE.Mesh(this.geometry, material);
		this.mesh.position.set(0, 0, 0);

		var tmpGeometry = new THREE.BoxGeometry(thick, 1.6 ,1);
		var tmpMesh = new THREE.Mesh(tmpGeometry, material);
		tmpMesh.position.set(0, 0.6, 0.6);
		
		var meshBSP = new ThreeBSP(this.mesh);
		var tmpBSP = new ThreeBSP(tmpMesh);

		var tmp = meshBSP.subtract(tmpBSP);
		this.mesh = tmp.toMesh();
		this.mesh.material = material;
		this.mesh.geometry.computeVertexNormals();
		this.mesh.geometry.computeFaceNormals();

		this.mesh.castShadow = true;
		this.mesh.recieveShadow = true;
	}

	function Bookshelf(){
		this.group = new THREE.Group();

		this.frontGeometry = new THREE.BoxGeometry(2, 0.6, thick);
		this.frontMesh = new THREE.Mesh(this.frontGeometry, material);

		this.backGeometry = new THREE.BoxGeometry(2, 1.6, thick);
		this.backMesh = new THREE.Mesh(this.backGeometry, material);

		this.bottomGeometry = new THREE.BoxGeometry(2, thick, 1);
		this.bottomMesh = new THREE.Mesh(this.bottomGeometry, material);

		this.frontMesh.position.set(0, 0, 0);
		this.backMesh.position.set(0, 0.5, -1);
		this.bottomMesh.position.set(0, -0.3 + thick / 2, -0.5);

		this.frontMesh.castShadow = true;
		this.frontMesh.recieveShadow = true;
		this.backMesh.castShadow = true;
		this.backMesh.recieveShadow = true;
		this.bottomMesh.castShadow = true;
		this.bottomMesh.recieveShadow = true;

		// 合并底盘
		var frontMeshBSP = new ThreeBSP(this.frontMesh);
		var backMeshBSP = new ThreeBSP(this.backMesh);
		var bottomMeshBSP = new ThreeBSP(this.bottomMesh);
		var baseBSP = frontMeshBSP.union(backMeshBSP).union(bottomMeshBSP);
		
		this.side1 = new Side();
		this.side2 = new Side();
		this.side3 = new Side();
		this.side4 = new Side();
		this.side1.mesh.position.set(-1 + thick / 2, 0.5, -0.5);
		this.side2.mesh.position.set(-0.333 + thick / 2, 0.5, -0.5);
		this.side3.mesh.position.set(0.333 - thick / 2, 0.5, -0.5);
		this.side4.mesh.position.set(1 - thick / 2, 0.5, -0.5);

		// 合并隔板
		var side1BSP = new ThreeBSP(this.side1.mesh);
		var side2BSP = new ThreeBSP(this.side2.mesh);
		var side3BSP = new ThreeBSP(this.side3.mesh);
		var side4BSP = new ThreeBSP(this.side4.mesh);
		var sideBSP = side1BSP.union(side2BSP).union(side3BSP).union(side4BSP);

		// 组合书架
		var mesh = baseBSP.union(sideBSP).toMesh();
		mesh.material = material;
		mesh.geometry.computeFaceNormals();
		mesh.geometry.computeVertexNormals();

		this.group.recieveShadow = true;
		this.group.castShadow = true;

		this.group.add(mesh);
	}
	return Bookshelf;
});