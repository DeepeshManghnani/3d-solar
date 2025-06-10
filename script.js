const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(0, 0, 0);
scene.add(light);

const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planets = [];
const planetData = [
  { name: 'Mercury', distance: 10, size: 0.5, color: 0xaaaaaa },
  { name: 'Venus', distance: 15, size: 0.9, color: 0xff9900 },
  { name: 'Earth', distance: 20, size: 1, color: 0x3399ff },
  { name: 'Mars', distance: 25, size: 0.8, color: 0xff3300 },
  { name: 'Jupiter', distance: 32, size: 2.5, color: 0xffcc66 },
  { name: 'Saturn', distance: 40, size: 2, color: 0xffcc99 },
  { name: 'Uranus', distance: 48, size: 1.5, color: 0x66ccff },
  { name: 'Neptune', distance: 56, size: 1.5, color: 0x3366ff },
];

const speeds = {};
const controlsDiv = document.getElementById('controls');

planetData.forEach((planet, i) => {
  const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: planet.color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  mesh.position.x = planet.distance;
  planets.push({ mesh, angle: 0, distance: planet.distance, name: planet.name });
  speeds[planet.name] = 0.01 + i * 0.002;

  const label = document.createElement('label');
  label.innerText = planet.name + ': ';
  const input = document.createElement('input');
  input.type = 'range';
  input.min = 0;
  input.max = 0.1;
  input.step = 0.001;
  input.value = speeds[planet.name];
  input.oninput = () => {
    speeds[planet.name] = parseFloat(input.value);
  };
  controlsDiv.appendChild(label);
  controlsDiv.appendChild(input);
  controlsDiv.appendChild(document.createElement('br'));
});

camera.position.z = 100;

function animate() {
  requestAnimationFrame(animate);
  planets.forEach((planet) => {
    planet.angle += speeds[planet.name];
    planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
    planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
  });
  renderer.render(scene, camera);
}
animate();
