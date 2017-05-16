define('Wall', ['Door', 'Window'], function(Door, Window){
	return function Wall(){
		this.group = new THREE.Group();
		this.material = new THREE.MeshLambertMaterial({color: 0xffffff});
		// this.material = new THREE.MeshBasicMaterial({color: 0xffffff});
		// this.texture = THREE.ImageUtils.loadTexture("../textures/brick-wall.jpg");

		// this.material.map = this.texture;
		this.height = 3; // 2
		this.width = 0.1;

		this.rightGeometry = new THREE.BoxGeometry(this.width, this.height, 18, 10, 10, 10);
		this.rightMesh = new THREE.Mesh(this.rightGeometry, this.material);
		this.rightMesh.position.set(5.3, 0, 0);

		// 挖出门框的位置
		var rightWallBSP = new ThreeBSP(this.rightMesh);
		var doorFrameGeometry = new THREE.BoxGeometry(0.14, 2.2, 1);
		var doorFrameMesh = new THREE.Mesh(doorFrameGeometry, this.material);
		doorFrameMesh.position.set(5.29, -0.4, 4);
		var doorFrameBSP = new ThreeBSP(doorFrameMesh);

		var tmp = rightWallBSP.subtract(doorFrameBSP);
		this.rightMesh = tmp.toMesh();
		this.rightMesh.material = this.material;
		this.rightMesh.geometry.computeVertexNormals();
		this.rightMesh.geometry.computeFaceNormals();
		this.rightMesh.castShadow = true;
		this.rightMesh.recieveShadow = true;


		this.topGeometry = new THREE.BoxGeometry(this.width, this.height, 10.5);
		this.topMesh = new THREE.Mesh(this.topGeometry, this.material);
		this.topMesh.rotation.y = 0.5 * Math.PI;
		this.topMesh.position.set(0, 0, -5.25);

		this.leftGroup = new THREE.Group();
		this.leftGeometry = new THREE.BoxGeometry(this.width * 4, this.height, 18, 20, 20, 20);
		this.leftMesh = new THREE.Mesh(this.leftGeometry, this.material);
		this.leftMesh.position.set(-5.24 - this.width * 2, 0, 0);
		// 挖出窗户的位置
		function digWindowFrame(distance){
			var leftWallBSP = new ThreeBSP(this.leftMesh);
			var windowFrameGeometry = new THREE.BoxGeometry(this.width * 4, 2.3, 1.6);
			var windowFrameMesh = new THREE.Mesh(windowFrameGeometry, this.material);
			windowFrameMesh.position.set(-5.24 - this.width * 2, 0, 4.2 + distance);
			var windowFrameBSP = new ThreeBSP(windowFrameMesh);

			// 添加窗户下方的石板
			var slateGeometry = new THREE.BoxGeometry(this.width * 4 + 0.2, 0.08, 1.7);
			var texture = THREE.ImageUtils.loadTexture('../textures/brick-1.jpg');
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			var slateMaterial = new THREE.MeshPhongMaterial({color: 0x333333, map: texture});
			slateMaterial.map.repeat.set(4, 4);
			var slateMesh = new THREE.Mesh(slateGeometry, slateMaterial);
			slateMesh.position.set(-5.24 - this.width * 2, -1.14, 4.2 + distance);
			this.leftGroup.add(slateMesh);

			tmp = leftWallBSP.subtract(windowFrameBSP);
			this.leftMesh = tmp.toMesh();
			this.leftMesh.material = this.material;
			this.leftMesh.geometry.computeVertexNormals();
			this.leftMesh.geometry.computeFaceNormals();
			this.leftMesh.castShadow = true;
			this.leftMesh.recieveShadow = true;

		}

		function createWindow(distance){
			var windows = new Window();
			windows.group.position.set(-5.3 - this.width * 2, 1.37, 4.2 + distance);
			windows.group.scale.set(0.8, 0.6, 0.8);
			windows.group.rotation.y = 0.5 * Math.PI;
			this.group.add(windows.group);
		}
		// 创建三个窗户
		digWindowFrame.call(this, 0);
		createWindow.call(this, 0);
		digWindowFrame.call(this, -4.2);
		createWindow.call(this, -4.2);
		digWindowFrame.call(this, -8.4);
		createWindow.call(this, -8.4);


		this.bottomGeometry = new THREE.BoxGeometry(this.width, this.height, 10.5);
		this.bottomMesh = new THREE.Mesh(this.bottomGeometry, this.material);
		this.bottomMesh.rotation.y = 0.5 * Math.PI;
		// this.bottomMesh.rotation.x = -0.1 * Math.PI;
		this.bottomMesh.position.set(0, 0, 7.45);

		// 柱子
		this.pillar1 = new THREE.BoxGeometry(1, this.height, 0.5);
		this.pillar2 = new THREE.BoxGeometry(1, this.height, 0.5);
		this.pillar3 = new THREE.BoxGeometry(0.5, this.height, 2);
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

		// 挖出门框的位置
		var footRightBSP = new ThreeBSP(this.footRightMesh);
		doorFrameMesh.position.set(5.24, -0.1, 4);
		doorFrameBSP = new ThreeBSP(doorFrameMesh);
		tmp = footRightBSP.subtract(doorFrameBSP);
		this.footRightMesh = tmp.toMesh();
		this.footRightMesh.material = this.footMaterial;
		this.footRightMesh.geometry.computeVertexNormals();
		this.footRightMesh.geometry.computeFaceNormals();
		this.footRightMesh.castShadow = true;


		this.footTop = new THREE.BoxGeometry(footWidth, footHeight, 10.5);
		this.footTopMesh = new THREE.Mesh(this.footTop, this.footMaterial);
		this.footTopMesh.position.set(0, -0.9, -5.19);
		this.footTopMesh.rotation.y = 0.5 * Math.PI;

		this.footLeft = new THREE.BoxGeometry(footWidth, footHeight, 18);
		this.footLeftMesh = new THREE.Mesh(this.footLeft, this.footMaterial);
		this.footLeftMesh.position.set(-5.22, -0.9, 0);

		this.footBottom = new THREE.BoxGeometry(footWidth, footHeight, 10.5);
		this.footBottomMesh = new THREE.Mesh(this.footBottom, this.footMaterial);
		this.footBottomMesh.position.set(0, -0.9, 7.39);
		this.footBottomMesh.rotation.y = 0.5 * Math.PI;

		// 靠窗、后面的柱子脚踢线
		var footPillar1Group = new THREE.Group();
		this.footPillar1Left = new THREE.BoxGeometry(footWidth, footHeight, 0.4);
		this.footPillar1LeftMesh = new THREE.Mesh(this.footPillar1Left, this.footMaterial);
		this.footPillar1LeftMesh.position.set(-4.28, -0.9, -5);

		this.footPillar1Right = new THREE.BoxGeometry(footWidth, footHeight, 0.4);
		this.footPillar1RightMesh = new THREE.Mesh(this.footPillar1Right, this.footMaterial);
		this.footPillar1RightMesh.position.set(-3.22, -0.9, -5);

		this.footPillar1Bottom = new THREE.BoxGeometry(footWidth, footHeight, 1.12);
		this.footPillar1BottomMesh = new THREE.Mesh(this.footPillar1Bottom, this.footMaterial);
		this.footPillar1BottomMesh.position.set(-3.75, -0.9, -4.77);
		this.footPillar1BottomMesh.rotation.y = 0.5 * Math.PI;

		footPillar1Group.add(this.footPillar1LeftMesh);
		footPillar1Group.add(this.footPillar1RightMesh);
		footPillar1Group.add(this.footPillar1BottomMesh);

		// 靠窗、前面的柱子脚踢线
		var footPillar2Group = new THREE.Group();
		this.footPillar2Left = new THREE.BoxGeometry(footWidth, footHeight, 0.4);
		this.footPillar2LeftMesh = new THREE.Mesh(this.footPillar2Left, this.footMaterial);
		this.footPillar2LeftMesh.position.set(-4.28, -0.9, 7.2);

		this.footPillar2Right = new THREE.BoxGeometry(footWidth, footHeight, 0.4);
		this.footPillar2RightMesh = new THREE.Mesh(this.footPillar2Right, this.footMaterial);
		this.footPillar2RightMesh.position.set(-3.22, -0.9, 7.2);

		this.footPillar2Bottom = new THREE.BoxGeometry(footWidth, footHeight, 1.12);
		this.footPillar2BottomMesh = new THREE.Mesh(this.footPillar2Bottom, this.footMaterial);
		this.footPillar2BottomMesh.position.set(-3.75, -0.9, 6.97);
		this.footPillar2BottomMesh.rotation.y = 0.5 * Math.PI;

		footPillar2Group.add(this.footPillar2LeftMesh);
		footPillar2Group.add(this.footPillar2RightMesh);
		footPillar2Group.add(this.footPillar2BottomMesh);

		// 靠门、前面的柱子脚踢线
		var footPillar3Group = new THREE.Group();
		this.footPillar3Left = new THREE.BoxGeometry(footWidth, footHeight, 1.9);
		this.footPillar3LeftMesh = new THREE.Mesh(this.footPillar3Left, this.footMaterial);
		this.footPillar3LeftMesh.position.set(4.72, -0.9, 6.45);

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

		var pillarGroup = new THREE.Group();
		pillarGroup.add(this.pillar1Mesh);
		pillarGroup.add(this.pillar2Mesh);
		pillarGroup.add(this.pillar3Mesh);
		pillarGroup.position.set(0, 0.5, 0);
		this.group.add(pillarGroup);
		
		var wallGroup = new THREE.Group();
		this.leftGroup.add(this.leftMesh);
		wallGroup.add(this.rightMesh);
		wallGroup.add(this.topMesh);
		wallGroup.add(this.leftGroup);
		wallGroup.add(this.bottomMesh);
		wallGroup.position.set(0, 0.5, 0);
		this.group.add(wallGroup);
	}
});