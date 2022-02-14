var data = [];
var inputSubmitter = document.getElementById("input-submitter");

inputSubmitter.addEventListener("click", function () {
  var widthInput = document.getElementById("width-input");
  var heightInput = document.getElementById("height-input");
  var depthInput = document.getElementById("depth-input");
  data.push(widthInput.value, heightInput.value, depthInput.value);
  console.log(data);
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

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
main();
