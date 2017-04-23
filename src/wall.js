function Wall(){
	this.group = new THREE.Group();
	this.material = new THREE.MeshLambertMaterial({color: 0xffffff});
	// this.texture = THREE.ImageUtils.loadTexture("../textures/brick-wall.jpg");

	// this.material.map = this.texture;
	this.height = 4;
	this.width = 0.1;

	this.rightGeometry = new THREE.BoxGeometry(this.width, this.height, 10.9);
	this.rightMesh = new THREE.Mesh(this.rightGeometry, this.material);
	this.rightMesh.position.set(5.3, 0, -0.4);
	this.rightMesh.castShadow = true;

	this.topGeometry = new THREE.BoxGeometry(this.width, this.height, 10.5);
	this.topMesh = new THREE.Mesh(this.topGeometry, this.material);
	this.topMesh.rotation.y = 0.5 * Math.PI;
	this.topMesh.position.set(0, 0, -5.8);

	this.leftGeometry = new THREE.BoxGeometry(this.width, this.height, 10.9);
	this.leftMesh = new THREE.Mesh(this.leftGeometry, this.material);
	this.leftMesh.position.set(-5.3, 0, -0.4);

	this.bottomGeometry = new THREE.BoxGeometry(this.width, this.height, 10.5);
	this.bottomMesh = new THREE.Mesh(this.bottomGeometry, this.material);
	this.bottomMesh.rotation.y = 0.5 * Math.PI;
	// this.bottomMesh.rotation.x = -0.1 * Math.PI;
	this.bottomMesh.position.set(0, 0, 5);


	this.group.add(this.rightMesh);
	this.group.add(this.topMesh);
	this.group.add(this.leftMesh);
	this.group.add(this.bottomMesh);
}