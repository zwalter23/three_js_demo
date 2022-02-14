var data = [];
var inputSubmitter = document.getElementById("input-submitter");

inputSubmitter.addEventListener("click", function () {
  var widthInput = document.getElementById("width-input");
  var heightInput = document.getElementById("height-input");
  var depthInput = document.getElementById("depth-input");
  data.push(
    parseInt(widthInput.value),
    parseInt(heightInput.value),
    parseInt(depthInput.value)
  );
  main();
});

function main() {
  // initialize scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  const renderer = new THREE.WebGLRenderer();

  // set renderer size & add to document
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // set wall width, height, thickness
  var wallWidth = data[0];
  var wallHeight = data[1];
  var wallThickness = data[2];

  // adjust camera position
  camera.position.z = wallWidth * 2;
  camera.position.y = wallHeight;

  // initialize geometry
  const geometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallThickness);

  // initialize material
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

  // number of walls
  var wallNum = 4;

  // wall creator
  var walls = [];
  for (let w = 0; w < wallNum; w++) {
    walls.push(new THREE.Mesh(geometry, material));
  }

  // wall setter
  for (let i = 0; i < walls.length; i++) {
    walls[i].rotation.x -= Math.PI / 2;
    if (i % 2 > 0) {
      walls[i].rotation.y -= Math.PI / 2;
    }
    walls[i].receiveShadow = true;
    scene.add(walls[i]);
  }

  var wallPos = (wallWidth - wallThickness) / 2;

  walls[0].position.set(0, 0, 0);
  walls[1].position.set(wallPos, wallPos, 0);
  walls[2].position.set(0, 2 * wallPos, 0);
  walls[3].position.set(wallPos * -1, wallPos, 0);

  // floor & texture
  var textureLoader = new THREE.TextureLoader();
  floorTexture = textureLoader.load("texture/brick_03.png");
  floorNormalMap = textureLoader.load("texture/brick_03_nrm.png");

  meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(wallWidth, wallWidth, 10, 10),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: floorTexture,
      normalMap: floorNormalMap,
    })
  );
  meshFloor.position.z -= wallHeight / 2;
  meshFloor.position.y += wallPos;
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);

  // setup light
  ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  light = new THREE.PointLight(0xffffff, 0.8, 18);
  light.position.set(0, wallHeight, wallWidth);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = wallWidth * wallWidth;
  scene.add(light);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
