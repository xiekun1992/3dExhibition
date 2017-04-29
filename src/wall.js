define('Wall', [], function(){
	return function Wall(){
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

		// 柱子
		this.pillar1 = new THREE.BoxGeometry(1, 2, 0.5);
		this.pillar2 = new THREE.BoxGeometry(1, 2, 0.5);
		this.pillar3 = new THREE.BoxGeometry(0.5, 2, 2);
		this.pillar1Mesh = new THREE.Mesh(this.pillar1, this.material);
		this.pillar2Mesh = new THREE.Mesh(this.pillar2, this.material);
		this.pillar3Mesh = new THREE.Mesh(this.pillar3, this.material);

		this.pillar1Mesh.position.set(-3.75, 0, -5.05);
		this.pillar2Mesh.position.set(-3.75, 0, 7.25);
		this.pillar3Mesh.position.set(5, 0, 6.5);

		// 脚踢线
		var footWidth = 0.06, footHeight = 0.1;
		this.footMaterial = new THREE.MeshLambertMaterial({color: 0x5A2611});

		this.footRight = new THREE.BoxGeometry(footWidth, footHeight, 18);
		this.footRightMesh = new THREE.Mesh(this.footRight, this.footMaterial);
		this.footRightMesh.position.set(5.24, -0.9, 0);

		this.footTop = new THREE.BoxGeometry(footWidth, footHeight, 10.5);
		this.footTopMesh = new THREE.Mesh(this.footTop, this.footMaterial);
		this.footTopMesh.position.set(0, -0.9, -5.19);
		this.footTopMesh.rotation.y = 0.5 * Math.PI;

		this.footLeft = new THREE.BoxGeometry(footWidth, footHeight, 18);
		this.footLeftMesh = new THREE.Mesh(this.footLeft, this.footMaterial);
		this.footLeftMesh.position.set(-5.24, -0.9, 0);

		this.footBottom = new THREE.BoxGeometry(footWidth, footHeight, 10.5);
		this.footBottomMesh = new THREE.Mesh(this.footBottom, this.footMaterial);
		this.footBottomMesh.position.set(0, -0.9, 7.39);
		this.footBottomMesh.rotation.y = 0.5 * Math.PI;

		// 靠窗、后面的柱子脚踢线
		var footPillar1Group = new THREE.Group();
		this.footPillar1Left = new THREE.BoxGeometry(footWidth, footHeight, 0.5);
		this.footPillar1LeftMesh = new THREE.Mesh(this.footPillar1Left, this.footMaterial);
		this.footPillar1LeftMesh.position.set(-4.28, -0.9, -5.05);

		this.footPillar1Right = new THREE.BoxGeometry(footWidth, footHeight, 0.5);
		this.footPillar1RightMesh = new THREE.Mesh(this.footPillar1Right, this.footMaterial);
		this.footPillar1RightMesh.position.set(-3.22, -0.9, -5.05);

		this.footPillar1Bottom = new THREE.BoxGeometry(footWidth, footHeight, 1.12);
		this.footPillar1BottomMesh = new THREE.Mesh(this.footPillar1Bottom, this.footMaterial);
		this.footPillar1BottomMesh.position.set(-3.75, -0.9, -4.77);
		this.footPillar1BottomMesh.rotation.y = 0.5 * Math.PI;

		footPillar1Group.add(this.footPillar1LeftMesh);
		footPillar1Group.add(this.footPillar1RightMesh);
		footPillar1Group.add(this.footPillar1BottomMesh);

		// 靠窗、前面的柱子脚踢线
		var footPillar2Group = new THREE.Group();
		this.footPillar2Left = new THREE.BoxGeometry(footWidth, footHeight, 0.5);
		this.footPillar2LeftMesh = new THREE.Mesh(this.footPillar2Left, this.footMaterial);
		this.footPillar2LeftMesh.position.set(-4.28, -0.9, 7.25);

		this.footPillar2Right = new THREE.BoxGeometry(footWidth, footHeight, 0.5);
		this.footPillar2RightMesh = new THREE.Mesh(this.footPillar2Right, this.footMaterial);
		this.footPillar2RightMesh.position.set(-3.22, -0.9, 7.25);

		this.footPillar2Bottom = new THREE.BoxGeometry(footWidth, footHeight, 1.12);
		this.footPillar2BottomMesh = new THREE.Mesh(this.footPillar2Bottom, this.footMaterial);
		this.footPillar2BottomMesh.position.set(-3.75, -0.9, 6.97);
		this.footPillar2BottomMesh.rotation.y = 0.5 * Math.PI;

		footPillar2Group.add(this.footPillar2LeftMesh);
		footPillar2Group.add(this.footPillar2RightMesh);
		footPillar2Group.add(this.footPillar2BottomMesh);

		// 靠门、前面的柱子脚踢线
		var footPillar3Group = new THREE.Group();
		this.footPillar3Left = new THREE.BoxGeometry(footWidth, footHeight, 2);
		this.footPillar3LeftMesh = new THREE.Mesh(this.footPillar3Left, this.footMaterial);
		this.footPillar3LeftMesh.position.set(4.72, -0.9, 6.5);

		this.footPillar3Bottom = new THREE.BoxGeometry(footWidth, footHeight, 0.5 + footWidth);
		this.footPillar3BottomMesh = new THREE.Mesh(this.footPillar3Bottom, this.footMaterial);
		this.footPillar3BottomMesh.position.set(4.97, -0.9, 5.47);
		this.footPillar3BottomMesh.rotation.y = 0.5 * Math.PI;

		footPillar3Group.add(this.footPillar3LeftMesh);
		footPillar3Group.add(this.footPillar3BottomMesh);


		this.group.add(footPillar1Group);
		this.group.add(footPillar2Group);
		this.group.add(footPillar3Group);

		this.group.add(this.footRightMesh);
		this.group.add(this.footTopMesh);
		this.group.add(this.footLeftMesh);
		this.group.add(this.footBottomMesh);

		this.group.add(this.pillar1Mesh);
		this.group.add(this.pillar2Mesh);
		this.group.add(this.pillar3Mesh);
		
		this.group.add(this.rightMesh);
		this.group.add(this.topMesh);
		this.group.add(this.leftMesh);
		this.group.add(this.bottomMesh);
	}
});