define('Window', [], function(){
	var frameMaterial = new THREE.MeshPhongMaterial({color: 0xeeeeee});
	var glassMaterial = new THREE.MeshPhongMaterial({color: 0x052c99, transparent: true, opacity: 0.5});

	
	function WindowFrame(long, height, width){
		this.geometry = new THREE.BoxGeometry(long, height, width);
		this.mesh = new THREE.Mesh(this.geometry, frameMaterial);

		var tmp = new THREE.BoxGeometry(long - 0.2, height - 0.2, width);
		var tmpMesh = new THREE.Mesh(tmp, this.material);

		var meshBSP = new ThreeBSP(this.mesh);
		var tmpBSP = new ThreeBSP(tmpMesh);

		this.mesh = meshBSP.subtract(tmpBSP).toMesh();
		this.mesh.material = frameMaterial;
		this.mesh.geometry.computeVertexNormals();
		this.mesh.geometry.computeFaceNormals();
	}
	function Window(){
		this.group = new THREE.Group();

		var frameTop = new WindowFrame(2, 1, 0.1);
		var glassTop = new Glass(1.9, 0.9, 0.02);
		
		var frameLeft = new WindowFrame(1, 1.6, 0.1);
		var glassLeft = new Glass(0.9, 1.5, 0.02);		
		frameLeft.mesh.position.set(-0.5, -1.3, 0);
		glassLeft.mesh.position.set(-0.5, -1.3, 0);

		var frameRight = new WindowFrame(1, 1.6, 0.1);
		var glassRight = new Glass(0.9, 1.5, 0.02);		
		frameRight.mesh.position.set(0.5, -1.3, 0);
		glassRight.mesh.position.set(0.5, -1.3, 0);

		var frameBottom = new WindowFrame(2, 1.2, 0.1);
		var glassBottom = new Glass(1.9, 1.1, 0.02);		
		frameBottom.mesh.position.set(0, -2.7, 0);
		glassBottom.mesh.position.set(0, -2.7, 0);

		// 合并窗户框架
		var topBSP = new ThreeBSP(frameTop.mesh);
		var bottomBSP = new ThreeBSP(frameBottom.mesh);
		var leftBSP = new ThreeBSP(frameLeft.mesh);
		var rightBSP = new ThreeBSP(frameRight.mesh);
		var frameBSP = topBSP.union(bottomBSP).union(leftBSP).union(rightBSP);
		this.frameMesh = frameBSP.toMesh();
		this.frameMesh.material = frameMaterial;
		this.frameMesh.geometry.computeVertexNormals();
		this.frameMesh.geometry.computeFaceNormals();

		// 合并窗玻璃
		var gTopBSP = new ThreeBSP(glassTop.mesh);
		var gBottomBSP = new ThreeBSP(glassBottom.mesh);
		var gLeftBSP = new ThreeBSP(glassLeft.mesh);
		var gRightBSP = new ThreeBSP(glassRight.mesh);
		var glassBSP = gTopBSP.union(gBottomBSP).union(gLeftBSP).union(gRightBSP);
		this.glassMesh = glassBSP.toMesh();
		this.glassMesh.material = glassMaterial;
		this.glassMesh.geometry.computeVertexNormals();
		this.glassMesh.geometry.computeFaceNormals();

		this.group.add(this.frameMesh);
		this.group.add(this.glassMesh);
	}
	function Glass(long, height, width){
		this.geometry = new THREE.BoxGeometry(long, height, width);
		this.mesh = new THREE.Mesh(this.geometry, glassMaterial);
	}

	return Window;
});