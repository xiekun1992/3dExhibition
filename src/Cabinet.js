define('Cabinet', [], function(){
	var material = new THREE.MeshLambertMaterial({color: 0xbbbbbb});
	var material1 = new THREE.MeshLambertMaterial({color: 0xff0000});
	function Drawer(){
		this.group = new THREE.Group();

		this.outerGeometry = new THREE.BoxGeometry(1.94, 0.6, 0.06);
		this.outerMesh = new THREE.Mesh(this.outerGeometry, material);
		this.outerMesh.position.set(0, 0, 0);

		this.group.add(this.outerMesh);
	}
	function Wheel(){
		this.wheelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.16, 40, 1, false, 0, 2 * Math.PI);
		this.material = new THREE.MeshLambertMaterial({color: 0x555555});
		this.wheelMesh = new THREE.Mesh(this.wheelGeometry, this.material);
		this.wheelMesh.rotation.z = 0.5 * Math.PI;
	}
	function Cabinet(){
		this.group = new THREE.Group();

		this.topGeometry = new THREE.BoxGeometry(2, 0.1, 2);
		this.topMesh = new THREE.Mesh(this.topGeometry, material);

		this.bodyGeometry = new THREE.BoxGeometry(1.9, 1.9, 1.9);
		this.bodyMesh = new THREE.Mesh(this.bodyGeometry, material);
		this.bodyMesh.position.set(0, -1 ,0);

		var drawer1 = new Drawer();
		var drawer2 = new Drawer();
		var drawer3 = new Drawer();
		drawer1.group.position.set(0, -0.38, 0.96);
		drawer2.group.position.set(0, -1, 0.96);
		drawer3.group.position.set(0, -1.62, 0.96);

		var wheel1 = new Wheel();
		wheel1.wheelMesh.position.set(0.8, -2.02, 0.8);
		var wheel2 = new Wheel();
		wheel2.wheelMesh.position.set(-0.8, -2.02, 0.8);
		var wheel3 = new Wheel();
		wheel3.wheelMesh.position.set(0.8, -2.02, -0.8);
		var wheel4 = new Wheel();
		wheel4.wheelMesh.position.set(-0.8, -2.02, -0.8);

		this.group.add(this.topMesh);
		this.group.add(this.bodyMesh);

		this.group.add(drawer1.group);
		this.group.add(drawer2.group);
		this.group.add(drawer3.group);

		this.group.add(wheel1.wheelMesh);
		this.group.add(wheel2.wheelMesh);
		this.group.add(wheel3.wheelMesh);
		this.group.add(wheel4.wheelMesh);

		this.group.castShadow = true;
		this.group.recieveShadow = true;
	}
	return Cabinet;
});