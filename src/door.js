define('Door', [], function (){
	function DoorFrame(){
		this.geometry = new THREE.BoxGeometry(0.14, 2.2, 1);
		this.material = new THREE.MeshLambertMaterial({side: THREE.DoubleSide});
		this.texture = THREE.ImageUtils.loadTexture("./textures/wood-0.jpg");
		// this.texture.wrapS = THREE.RepeatWrapping;
		// this.texture.wrapT = THREE.RepeatWrapping;

		this.material.map = this.texture;
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		// this.mesh.material.map.repeat.set(2, 2);
		this.mesh.position.set(0, 0, 0);
		// this.mesh.position.set(5.29, -0.1, 4);
		var meshBSP = new ThreeBSP(this.mesh);

		var innerDoorGeometry = new THREE.BoxGeometry(0.14, 2.15, 0.86);
		var innerDoorMesh = new THREE.Mesh(innerDoorGeometry, this.material);
		innerDoorMesh.position.set(0, -0.05, 0);
		var innerDoorBSP = new ThreeBSP(innerDoorMesh);

		var tmp = meshBSP.subtract(innerDoorBSP);
		this.mesh = tmp.toMesh();
		this.mesh.material = this.material;
		this.mesh.geometry.computeVertexNormals();
		this.mesh.geometry.computeFaceNormals();

		this.mesh.recieveShadow = true;
		this.mesh.castShadow = true;
	}
	function InnerDoor(){
		this.geometry = new THREE.BoxGeometry(0.04, 2.15, 0.86);
		// console.log(this.geometry.faceVertexUvs);

		// var woods = [new THREE.Vector2(0, 0), new THREE.Vector2(0.1, 0), new THREE.Vector2(0.1, 0.1), new THREE.Vector2(0, 0.1)];
		// for(var i = 0; i < 12; i++){
		// 	if(i % 2 == 0){
		// 		this.geometry.faceVertexUvs[0][0] = [woods[0], woods[1], woods[3]];
		// 	}
		// 	else{
		// 		this.geometry.faceVertexUvs[0][1] = [woods[1], woods[2], woods[3]];
		// 	}
			
		// }

		this.material = new THREE.MeshLambertMaterial({side: THREE.DoubleSide});
		this.texture = THREE.ImageUtils.loadTexture("./textures/wood-0.jpg");
		// this.texture.wrapS = THREE.RepeatWrapping;
		// this.texture.wrapT = THREE.RepeatWrapping;

		this.material.map = this.texture;
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		// this.mesh.material.map.repeat.set(2, 2);
		this.mesh.position.set(-0.04, -0.03, 0);

		this.mesh.recieveShadow = true;
		this.mesh.castShadow = true;
		// this.mesh.position.set(5.29, -0.1, 4);
	}
	function Doorknob(){
		this.group = new THREE.Group();

		this.lockGeometry = new THREE.BoxGeometry(0.06, 0.16, 0.07);
		this.texture = THREE.ImageUtils.loadTexture('./textures/metal.jpg');
		this.material = new THREE.MeshLambertMaterial({map: this.texture});

		this.lockMesh = new THREE.Mesh(this.lockGeometry, this.material);
		this.lockMesh.position.set(-0.041, -0.02, -0.38);

		this.doorknobAxisGeometry = new THREE.BoxGeometry(0.1, 0.02, 0.02);
		this.doorknobAxisMesh = new THREE.Mesh(this.doorknobAxisGeometry, this.material);
		this.doorknobAxisMesh.position.set(-0.041, 0, -0.38);

		this.doorknobGeometry1 = new THREE.BoxGeometry(0.02, 0.02, 0.16);
		this.doorknobMesh1 = new THREE.Mesh(this.doorknobGeometry1, this.material);
		this.doorknobMesh1.position.set(-0.1, 0, -0.31);

		this.doorknobGeometry2 = new THREE.BoxGeometry(0.02, 0.02, 0.16);
		this.doorknobMesh2 = new THREE.Mesh(this.doorknobGeometry2, this.material);
		this.doorknobMesh2.position.set(0.018, 0, -0.31);

		var doorknobAxisBSP = new ThreeBSP(this.doorknobAxisMesh);
		var doorknob1BSP = new ThreeBSP(this.doorknobMesh1);
		var doorknob2BSP = new ThreeBSP(this.doorknobMesh2);

		var tmp = doorknobAxisBSP.union(doorknob1BSP).union(doorknob2BSP);
		this.doorknobMesh = tmp.toMesh();
		this.doorknobMesh.material = this.material;
		this.doorknobMesh.geometry.computeVertexNormals();
		this.doorknobMesh.geometry.computeFaceNormals();

		this.lockMesh.recieveShadow = true;
		this.lockMesh.castShadow = true;
		this.doorknobAxisMesh.recieveShadow = true;
		this.doorknobAxisMesh.castShadow = true;
		this.doorknobMesh.recieveShadow = true;
		this.doorknobMesh.castShadow = true;


		this.group.add(this.lockMesh);
		this.group.add(this.doorknobAxisMesh);
		this.group.add(this.doorknobMesh);
	}

	function Door(){
		this.group = new THREE.Group();

		var innerDoor = new InnerDoor();
		var doorFrame = new DoorFrame();
		var doorknob = new Doorknob();

		this.group.add(innerDoor.mesh);
		this.group.add(doorFrame.mesh);
		this.group.add(doorknob.group);
	}

	return Door;
});