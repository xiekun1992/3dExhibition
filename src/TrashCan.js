define('TrashCan', [], function(){
	var material = new THREE.MeshLambertMaterial({color: 0xb2f5c3});
	function TrashCan(){
		this.group = new THREE.Group();

		this.geometry = new THREE.CylinderGeometry(2, 1.4, 4, 50, 10, false, 0, 2 * Math.PI);
		this.mesh = new THREE.Mesh(this.geometry, material);

		var tmpGeometry = new THREE.CylinderGeometry(1.98, 1.38, 4, 50, 1, false, 0, 2 * Math.PI);
		var tmpMesh = new THREE.Mesh(tmpGeometry, material);
		tmpMesh.position.set(0, 0.02, 0);

		var meshBSP = new ThreeBSP(this.mesh);
		var tmpBSP = new ThreeBSP(tmpMesh);

		var tmp = meshBSP.subtract(tmpBSP);
		this.mesh = tmp.toMesh();
		this.mesh.material = material;
		this.mesh.geometry.computeFaceNormals();
		this.mesh.geometry.computeVertexNormals();

		this.group.add(this.mesh);

		this.group.recieveShadow = true;
		this.group.castShadow = true;
	}
	return TrashCan;
});