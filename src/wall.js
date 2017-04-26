function Wall(){
	this.group = new THREE.Group();
	this.material = new THREE.MeshLambertMaterial({color: 0xffffff});
	// this.material = new THREE.MeshBasicMaterial({color: 0xffffff});
	// this.texture = THREE.ImageUtils.loadTexture("../textures/brick-wall.jpg");

	// this.material.map = this.texture;
	this.height = 2;
	this.width = 0.1;

	this.rightGeometry = new THREE.BoxGeometry(this.width, this.height, 18);
	this.rightMesh = new THREE.Mesh(this.rightGeometry, this.material);
	this.rightMesh.position.set(5.3, 0, 0);
	this.rightMesh.castShadow = true;

	this.topGeometry = new THREE.BoxGeometry(this.width, this.height, 10.5);
	this.topMesh = new THREE.Mesh(this.topGeometry, this.material);
	this.topMesh.rotation.y = 0.5 * Math.PI;
	this.topMesh.position.set(0, 0, -5.25);

	this.leftGeometry = new THREE.BoxGeometry(this.width, this.height, 18);
	this.leftMesh = new THREE.Mesh(this.leftGeometry, this.material);
	this.leftMesh.position.set(-5.3, 0, 0);

	this.bottomGeometry = new THREE.BoxGeometry(this.width, this.height, 10.5);
	this.bottomMesh = new THREE.Mesh(this.bottomGeometry, this.material);
	this.bottomMesh.rotation.y = 0.5 * Math.PI;
	// this.bottomMesh.rotation.x = -0.1 * Math.PI;
	this.bottomMesh.position.set(0, 0, 7.45);

	// pillars
	this.pillar1 = new THREE.BoxGeometry(1, 2, 0.5);
	this.pillar2 = new THREE.BoxGeometry(1, 2, 0.5);
	this.pillar3 = new THREE.BoxGeometry(0.5, 2, 2);
	this.pillar1Mesh = new THREE.Mesh(this.pillar1, this.material);
	this.pillar2Mesh = new THREE.Mesh(this.pillar2, this.material);
	this.pillar3Mesh = new THREE.Mesh(this.pillar3, this.material);

	this.pillar1Mesh.position.set(-3.75, 0, -5.05);
	this.pillar2Mesh.position.set(-3.75, 0, 7.25);
	this.pillar3Mesh.position.set(5, 0, 6.5);


	this.group.add(this.pillar1Mesh);
	this.group.add(this.pillar2Mesh);
	this.group.add(this.pillar3Mesh);
	this.group.add(this.rightMesh);
	this.group.add(this.topMesh);
	this.group.add(this.leftMesh);
	this.group.add(this.bottomMesh);
}