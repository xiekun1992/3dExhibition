define('Window', [], function(){
	function WindowFrame(long, height, width){
		this.geometry = new THREE.BoxGeometry(long, height, width);
		this.material = new THREE.MeshPhongMaterial({color: 0xeeeeee});
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		var tmp = new THREE.BoxGeometry(long - 0.2, height - 0.2, width);
		var tmpMesh = new THREE.Mesh(tmp, this.material);

		var meshBSP = new ThreeBSP(this.mesh);
		var tmpBSP = new ThreeBSP(tmpMesh);

		this.mesh = meshBSP.subtract(tmpBSP).toMesh();
		this.mesh.material = this.material;
		this.mesh.geometry.computeVertexNormals();
		this.mesh.geometry.computeFaceNormals();
	}
	function Window(){
		this.group = new THREE.Group();

		var topGroup = new THREE.Group();
		var frameTop = new WindowFrame(2, 1, 0.1);
		var glassTop = new Glass(1.9, 0.9, 0.02);
		topGroup.add(frameTop.mesh);
		topGroup.add(glassTop.mesh);
		
		var leftGroup = new THREE.Group();
		var frameLeft = new WindowFrame(1, 1.6, 0.1);
		var glassLeft = new Glass(0.9, 1.5, 0.02);		
		leftGroup.add(frameLeft.mesh);
		leftGroup.add(glassLeft.mesh);
		leftGroup.position.set(-0.5, -1.3, 0);

		var rightGroup = new THREE.Group();
		var frameRight = new WindowFrame(1, 1.6, 0.1);
		var glassRight = new Glass(0.9, 1.5, 0.02);		
		rightGroup.add(frameRight.mesh);
		rightGroup.add(glassRight.mesh);
		rightGroup.position.set(0.5, -1.3, 0);

		var bottomGroup = new THREE.Group();
		var frameBottom = new WindowFrame(2, 1.2, 0.1);
		var glassBottom = new Glass(1.9, 1.1, 0.02);		
		bottomGroup.add(frameBottom.mesh);
		bottomGroup.add(glassBottom.mesh);
		bottomGroup.position.set(0, -2.7, 0);

		this.group.add(topGroup);
		this.group.add(leftGroup);
		this.group.add(rightGroup);
		this.group.add(bottomGroup);
	}
	function Glass(long, height, width){
		this.geometry = new THREE.BoxGeometry(long, height, width);
		this.material = new THREE.MeshPhongMaterial({color: 0x052c99, transparent: true, opacity: 0.5});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
	}

	return Window;
});