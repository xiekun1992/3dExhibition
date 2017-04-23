var width = window.innerWidth,
	height = window.innerHeight;


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1 ,1000);
camera.position.set(0, 10, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.shadowMapEnabled = true;

var clock = new THREE.Clock();
// var camControls = new THREE.FirstPersonControls(camera);
// camControls.lookSpeed = 0.4;
// camControls.movementSpeed = 20;
// camControls.noFly = true;
// camControls.lookVertical = true;
// camControls.constrainVertical = true;
// camControls.verticalMin = 1.0;
// camControls.verticalMax = 2.0;
// camControls.lon = 10;
// camControls.lat = 10;
var camControls = new THREE.TrackballControls(camera);
camControls.rotateSpeed = 1;
camControls.zoomSpeed = 1;
camControls.panSpeed = 1;
camControls.staticMoing = true;

var amLight = new THREE.AmbientLight(0x404040);
scene.add(amLight);

var spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(0, 200, 0);
spotLight.castShadow = true;
scene.add(spotLight);

document.body.appendChild(renderer.domElement);
// 地板
var ground = new Ground();
ground.mesh.position.set(0, -1, 0);
ground.mesh.rotation.z = -0.5 * Math.PI;
ground.mesh.receieveShadow = true;
scene.add(ground.mesh);
// 墙
var wall = new Wall();
scene.add(wall.group);
// 门
var door = new Door();
scene.add(door.mesh);

function render(){
	camControls.update(clock.getDelta());
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();