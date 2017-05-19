define('Wall', ['Window'], function(Window){
	function KickLine(long){
		var width = 0.06, height = 0.1;
		this.material = new THREE.MeshLambertMaterial({color: 0x5A2611});

		this.geometry = new THREE.BoxGeometry(width, height, long);
		this.mesh = new THREE.Mesh(this.geometry, this.material);
	}
	return function Wall(){
		this.group = new THREE.Group();
		this.material = new THREE.MeshLambertMaterial({color: 0xffffff});
		var slateMaterial = new THREE.MeshPhongMaterial({color: 0x333333});
		// this.material = new THREE.MeshBasicMaterial({color: 0xffffff});
		// this.texture = THREE.ImageUtils.loadTexture("../textures/brick-wall.jpg");

		// this.material.map = this.texture;
		this.height = 3; // 2
		this.width = 0.1;
		/********************* 墙 *******************/
		this.rightGeometry = new THREE.BoxGeometry(this.width, this.height, 18, 10, 10, 10);
		this.rightMesh = new THREE.Mesh(this.rightGeometry, this.material);
		this.rightMesh.position.set(5.3, 0.5, 0);

		// 挖出门框的位置
		var rightWallBSP = new ThreeBSP(this.rightMesh);
		var doorFrameGeometry = new THREE.BoxGeometry(0.14, 2.2, 1);
		var doorFrameMesh = new THREE.Mesh(doorFrameGeometry, this.material);
		doorFrameMesh.position.set(5.29, 0.1, 4);
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
		this.topMesh.position.set(0, 0.5, -5.25);

		this.leftGroup = new THREE.Group();
		this.leftGeometry = new THREE.BoxGeometry(this.width * 4, this.height, 18, 20, 20, 20);
		this.leftMesh = new THREE.Mesh(this.leftGeometry, this.material);
		this.leftMesh.position.set(-5.24 - this.width * 2, 0.5, 0);
		// 挖出窗户的位置
		function digWindowFrame(distance){
			var leftWallBSP = new ThreeBSP(this.leftMesh);
			var windowFrameGeometry = new THREE.BoxGeometry(this.width * 4, 2.3, 1.6);
			var windowFrameMesh = new THREE.Mesh(windowFrameGeometry, this.material);
			windowFrameMesh.position.set(-5.24 - this.width * 2, 0.5, 4.2 + distance);
			var windowFrameBSP = new ThreeBSP(windowFrameMesh);

			// 添加窗户下方的石板
			var slateGeometry = new THREE.BoxGeometry(this.width * 4 + 0.2, 0.08, 1.7);
			var slateMesh = new THREE.Mesh(slateGeometry, slateMaterial);
			slateMesh.position.set(-5.24 - this.width * 2, -0.64, 4.2 + distance);
			this.leftGroup.add(slateMesh);

			tmp = leftWallBSP.subtract(windowFrameBSP);
			this.leftMesh = tmp.toMesh();
			this.leftMesh.material = this.material;
			this.leftMesh.geometry.computeVertexNormals();
			this.leftMesh.geometry.computeFaceNormals();
			this.leftMesh.castShadow = true;
			this.leftMesh.recieveShadow = true;

		}

		// function createWindow(distance){
		// 	var windows = new Window();
		// 	windows.group.position.set(-5.3 - this.width * 2, 1.37, 4.2 + distance);
		// 	windows.group.scale.set(0.8, 0.6, 0.8);
		// 	windows.group.rotation.y = 0.5 * Math.PI;
		// 	this.group.add(windows.group);
		// }
		// 创建三个窗户
		digWindowFrame.call(this, 0);
		// createWindow.call(this, 0);
		digWindowFrame.call(this, -4.2);
		// createWindow.call(this, -4.2);
		digWindowFrame.call(this, -8.4);
		// createWindow.call(this, -8.4);


		this.bottomGeometry = new THREE.BoxGeometry(this.width, this.height, 10.5);
		this.bottomMesh = new THREE.Mesh(this.bottomGeometry, this.material);
		this.bottomMesh.rotation.y = 0.5 * Math.PI;
		// this.bottomMesh.rotation.x = -0.1 * Math.PI;
		this.bottomMesh.position.set(0, 0.5, 7.45);

		// 合并墙体
		var leftMeshBSP = new ThreeBSP(this.leftMesh);
		var rightMeshBSP = new ThreeBSP(this.rightMesh);
		var topMeshBSP = new ThreeBSP(this.topMesh);
		var bottomMeshBSP = new ThreeBSP(this.bottomMesh);
		var wallBSP = leftMeshBSP.union(rightMeshBSP).union(topMeshBSP).union(bottomMeshBSP);
		
		// 合并左边墙上的石板
		var slateBSP = new ThreeBSP(this.leftGroup.children[0]);
		this.leftGroup.children.forEach(function(o, i){
			if(i > 0){
				slateBSP = slateBSP.union(new ThreeBSP(o));
			}
		});
		var slateMesh = slateBSP.toMesh();
		slateMesh.material = slateMaterial;
		slateMesh.geometry.computeVertexNormals();
		slateMesh.geometry.computeFaceNormals();

		/***************** 柱子 ********************/

		this.pillar1 = new THREE.BoxGeometry(1, this.height, 0.5);
		this.pillar2 = new THREE.BoxGeometry(1, this.height, 0.5);
		this.pillar3 = new THREE.BoxGeometry(0.5, this.height, 2);
		this.pillar1Mesh = new THREE.Mesh(this.pillar1, this.material);
		this.pillar2Mesh = new THREE.Mesh(this.pillar2, this.material);
		this.pillar3Mesh = new THREE.Mesh(this.pillar3, this.material);

		this.pillar1Mesh.position.set(-3.75, 0.5, -5.05);
		this.pillar2Mesh.position.set(-3.75, 0.5, 7.25);
		this.pillar3Mesh.position.set(5, 0.5, 6.5);

		// 合并墙柱
		var pillar1BSP = new ThreeBSP(this.pillar1Mesh);
		var pillar2BSP = new ThreeBSP(this.pillar2Mesh);
		var pillar3BSP = new ThreeBSP(this.pillar3Mesh);
		var pillarBSP = pillar1BSP.union(pillar2BSP).union(pillar3BSP);

		/***************** 脚踢线 ******************/
		
		this.footMaterial = new THREE.MeshLambertMaterial({color: 0x5A2611});
		this.footRightMesh = new KickLine(18).mesh;
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

		this.footTopMesh = new KickLine(10.5).mesh;
		this.footTopMesh.position.set(0, -0.9, -5.19);
		this.footTopMesh.rotation.y = 0.5 * Math.PI;

		this.footLeftMesh = new KickLine(18).mesh;
		this.footLeftMesh.position.set(-5.22, -0.9, 0);

		this.footBottomMesh = new KickLine(10.5).mesh;
		this.footBottomMesh.position.set(0, -0.9, 7.39);
		this.footBottomMesh.rotation.y = 0.5 * Math.PI;

		// 合并脚踢线
		var footLeftBSP = new ThreeBSP(this.footLeftMesh);
		footRightBSP = new ThreeBSP(this.footRightMesh);
		var footBottomBSP = new ThreeBSP(this.footBottomMesh);
		var footTopBSP = new ThreeBSP(this.footTopMesh);
		var footBSP = footLeftBSP.union(footBottomBSP).union(footRightBSP).union(footTopBSP);

		// 靠窗、后面的柱子脚踢线
		this.footPillar1LeftMesh = new KickLine(0.4).mesh;
		this.footPillar1LeftMesh.position.set(-4.28, -0.9, -5);

		this.footPillar1RightMesh = new KickLine(0.4).mesh;
		this.footPillar1RightMesh.position.set(-3.22, -0.9, -5);

		this.footPillar1BottomMesh = new KickLine(1.12).mesh;
		this.footPillar1BottomMesh.position.set(-3.75, -0.9, -4.77);
		this.footPillar1BottomMesh.rotation.y = 0.5 * Math.PI;

		// 合并脚踢线
		var footPillar1LeftBSP = new ThreeBSP(this.footPillar1LeftMesh);
		var footPillar1RightBSP = new ThreeBSP(this.footPillar1RightMesh);
		var footPillar1BottomBSP = new ThreeBSP(this.footPillar1BottomMesh);
		var footPillar1BSP = footPillar1LeftBSP.union(footPillar1BottomBSP).union(footPillar1RightBSP);

		// 靠窗、前面的柱子脚踢线
		this.footPillar2LeftMesh = new KickLine(0.4).mesh;
		this.footPillar2LeftMesh.position.set(-4.28, -0.9, 7.2);

		this.footPillar2RightMesh = new KickLine(0.4).mesh;
		this.footPillar2RightMesh.position.set(-3.22, -0.9, 7.2);

		this.footPillar2BottomMesh = new KickLine(1.12).mesh;
		this.footPillar2BottomMesh.position.set(-3.75, -0.9, 6.97);
		this.footPillar2BottomMesh.rotation.y = 0.5 * Math.PI;

		// 合并脚踢线
		var footPillar2LeftBSP = new ThreeBSP(this.footPillar2LeftMesh);
		var footPillar2RightBSP = new ThreeBSP(this.footPillar2RightMesh);
		var footPillar2BottomBSP = new ThreeBSP(this.footPillar2BottomMesh);
		var footPillar2BSP = footPillar2LeftBSP.union(footPillar2BottomBSP).union(footPillar2RightBSP);

		// 靠门、前面的柱子脚踢线
		this.footPillar3LeftMesh = new KickLine(1.9).mesh;
		this.footPillar3LeftMesh.position.set(4.72, -0.9, 6.45);

		this.footPillar3BottomMesh = new KickLine(0.56).mesh;
		this.footPillar3BottomMesh.position.set(4.97, -0.9, 5.47);
		this.footPillar3BottomMesh.rotation.y = 0.5 * Math.PI;

		// 合并脚踢线
		var footPillar3LeftBSP = new ThreeBSP(this.footPillar3LeftMesh);
		var footPillar3BottomBSP = new ThreeBSP(this.footPillar3BottomMesh);
		var footPillar3BSP = footPillar3LeftBSP.union(footPillar3BottomBSP);

		// 合并全部脚踢线
		var footPillarBSP = footPillar1BSP.union(footPillar3BSP).union(footPillar2BSP).union(footBSP);
		var footPillarMesh = footPillarBSP.toMesh();
		footPillarMesh.material = this.footMaterial;
		footPillarMesh.geometry.computeVertexNormals();
		footPillarMesh.geometry.computeFaceNormals();

		this.group.add(footPillarMesh);

		// 合并墙体和墙柱
		var wallMesh = wallBSP.union(pillarBSP).toMesh();
		wallMesh.material = this.material;
		wallMesh.geometry.computeVertexNormals();
		wallMesh.geometry.computeFaceNormals();
		
		this.group.add(wallMesh);
		this.group.add(slateMesh);
	};
});