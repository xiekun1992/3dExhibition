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

		this.group.add(this.frontMesh);
		this.group.add(this.backMesh);
		this.group.add(this.bottomMesh);

		
		this.side1 = new Side();
		this.side2 = new Side();
		this.side3 = new Side();
		this.side4 = new Side();
		this.side1.mesh.position.set(-1 + thick / 2, 0.5, -0.5);
		this.side2.mesh.position.set(-0.333 + thick / 2, 0.5, -0.5);
		this.side3.mesh.position.set(0.333 - thick / 2, 0.5, -0.5);
		this.side4.mesh.position.set(1 - thick / 2, 0.5, -0.5);

		this.group.add(this.side1.mesh);
		this.group.add(this.side2.mesh);
		this.group.add(this.side3.mesh);
		this.group.add(this.side4.mesh);

		this.group.recieveShadow = true;
		this.group.castShadow = true;
	}
	return Bookshelf;
});