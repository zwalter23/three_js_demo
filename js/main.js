var data = [];
var inputSubmitter = document.getElementById("input-submitter");

inputSubmitter.addEventListener("click", function () {
  var widthInput = document.getElementById("width-input");
  var heightInput = document.getElementById("height-input");
  var depthInput = document.getElementById("depth-input");
  data.push(widthInput.value, heightInput.value, depthInput.value);
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
  var wallWidth = parseInt(data[0]);
  var wallHeight = parseInt(data[1]);
  var wallThickness = parseInt(data[2]);

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

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
main();
