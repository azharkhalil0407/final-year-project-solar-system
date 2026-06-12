import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const PLANET_DATA = [
  {
    name: 'Mercury', type: 'Terrestrial Planet',
    color: '#b5956a', emissive: '#3a2510',
    size: 0.42, dist: 9.5, speed: 0.048, axialTilt: 0.03, rings: false,
    realDist: '57.9 M km', period: '88 days', diam: '4,879 km', temp: '-180 / 430°C', moons: '0',
  },
  {
    name: 'Venus', type: 'Terrestrial Planet',
    color: '#e8c96a', emissive: '#4a3000',
    size: 0.60, dist: 13.5, speed: 0.035, axialTilt: 177.4, rings: false,
    realDist: '108.2 M km', period: '225 days', diam: '12,104 km', temp: '462°C avg', moons: '0',
  },
  {
    name: 'Earth', type: 'Terrestrial Planet',
    color: '#3a7bd5', emissive: '#001244',
    size: 0.64, dist: 18.0, speed: 0.029, axialTilt: 23.4, rings: false, isEarth: true,
    realDist: '149.6 M km', period: '365 days', diam: '12,742 km', temp: '-88 / 58°C', moons: '1',
  },
  {
    name: 'Mars', type: 'Terrestrial Planet',
    color: '#c0522a', emissive: '#3a0d00',
    size: 0.52, dist: 23.5, speed: 0.024, axialTilt: 25.2, rings: false,
    realDist: '227.9 M km', period: '687 days', diam: '6,779 km', temp: '-125 / 20°C', moons: '2',
  },
  {
    name: 'Jupiter', type: 'Gas Giant',
    color: '#c4935e', emissive: '#2a1500',
    size: 1.55, dist: 33.0, speed: 0.013, axialTilt: 3.1, rings: false,
    realDist: '778.5 M km', period: '12 years', diam: '139,820 km', temp: '-108°C avg', moons: '95',
  },
  {
    name: 'Saturn', type: 'Gas Giant',
    color: '#dfc489', emissive: '#382800',
    size: 1.35, dist: 42.5, speed: 0.0096, axialTilt: 26.7, rings: true,
    realDist: '1.43 B km', period: '29 years', diam: '116,460 km', temp: '-138°C avg', moons: '146',
  },
  {
    name: 'Uranus', type: 'Ice Giant',
    color: '#7de8e8', emissive: '#003030',
    size: 1.10, dist: 51.0, speed: 0.0068, axialTilt: 97.8, rings: true, thinRings: true,
    realDist: '2.87 B km', period: '84 years', diam: '50,724 km', temp: '-195°C avg', moons: '28',
  },
  {
    name: 'Neptune', type: 'Ice Giant',
    color: '#3a6fdf', emissive: '#000e3a',
    size: 1.05, dist: 59.5, speed: 0.0054, axialTilt: 28.3, rings: false,
    realDist: '4.50 B km', period: '165 years', diam: '49,244 km', temp: '-200°C avg', moons: '16',
  },
];

const PLANET_ICONS = ['☿', '♀', '🌍', '♂', '♃', '♄', '⛢', '♆'];

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 3000);
camera.position.set(0, 38, 90);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 6;
controls.maxDistance = 400;
controls.enablePan = false;
controls.autoRotate = false;

const ambientLight = new THREE.AmbientLight(0x111122, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffd0a0, 3.5, 300);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.near = 0.1;
sunLight.shadow.camera.far = 300;
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0xff8844, 0.15);
fillLight.position.set(10, 20, 30);
scene.add(fillLight);

function makeStars(count, radiusMin, radiusMax, size, color) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radiusMin + Math.random() * (radiusMax - radiusMin);
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    pos[i * 3 + 2] = r * Math.cos(ph);
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({
    color, size, transparent: true, opacity: 0.85, sizeAttenuation: true,
  }));
}

scene.add(makeStars(5000, 200, 600,  0.35, 0xffffff));
scene.add(makeStars(3000, 600, 1500, 0.60, 0xbbccff));
scene.add(makeStars(1500, 200, 400,  0.15, 0xffeedd));

const SUN_R = 4.2;

const sunMat = new THREE.MeshStandardMaterial({
  color: 0xff9933,
  emissive: 0xff5500,
  emissiveIntensity: 2.2,
  roughness: 1,
  metalness: 0,
});
const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(SUN_R, 128, 128), sunMat);
scene.add(sunMesh);

const coronaMat = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    glowColor: { value: new THREE.Color(0xff6600) },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal   = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: `
    uniform float time;
    uniform vec3  glowColor;
    varying vec3  vNormal;
    varying vec3  vPosition;
    void main() {
      vec3  vn    = normalize(vNormal);
      float rim   = 1.0 - abs(dot(vn, vec3(0.0, 0.0, 1.0)));
      float pulse = 0.8 + 0.2 * sin(time * 1.4 + vPosition.y * 0.8);
      float alpha = pow(rim, 2.0) * 1.2 * pulse;
      gl_FragColor = vec4(glowColor, alpha * 0.9);
    }`,
  transparent: true,
  side: THREE.FrontSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
const coronaMesh = new THREE.Mesh(
  new THREE.SphereGeometry(SUN_R * 1.18, 64, 64),
  coronaMat
);
scene.add(coronaMesh);

scene.add(new THREE.Mesh(
  new THREE.SphereGeometry(SUN_R * 2.2, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.04, side: THREE.BackSide })
));

const sunSurface = new THREE.Mesh(
  new THREE.SphereGeometry(SUN_R * 0.99, 64, 64),
  new THREE.MeshBasicMaterial({ color: 0xffcc44, transparent: true, opacity: 0.15 })
);
scene.add(sunSurface);

function makeAtmosphere(radius, color, intensity = 1.0) {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      intensity: { value: intensity },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vView   = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3  glowColor;
      uniform float intensity;
      varying vec3  vNormal;
      varying vec3  vView;
      void main() {
        float rim = 1.0 - max(0.0, dot(vNormal, vView));
        rim = pow(rim, 3.5) * intensity;
        gl_FragColor = vec4(glowColor, rim * 0.7);
      }`,
    transparent: true,
    side: THREE.FrontSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64), mat);
}

function makeSaturnRings(innerR, outerR) {
  const segments = 256;
  const verts = [], uvs = [], indices = [];

  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const cos = Math.cos(a), sin = Math.sin(a);
    verts.push(innerR * cos, 0, innerR * sin);
    verts.push(outerR * cos, 0, outerR * sin);
    const u = i / segments;
    uvs.push(0, u, 1, u);
  }
  for (let i = 0; i < segments; i++) {
    const b = i * 2;
    indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
  geo.setAttribute('uv',       new THREE.BufferAttribute(new Float32Array(uvs), 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      ringColor: { value: new THREE.Color(0xd4b896) },
      time:      { value: 0 },
    },
    vertexShader: `
      varying float vDist;
      void main() {
        float len   = length(position.xz);
        float inner = ${innerR.toFixed(2)};
        float outer = ${outerR.toFixed(2)};
        vDist = (len - inner) / (outer - inner);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform vec3  ringColor;
      uniform float time;
      varying float vDist;
      void main() {
        float t       = vDist;
        float band    = step(0.04, fract(t * 18.0)) * 0.6 + 0.4;
        float density = 0.65 + 0.35 * sin(t * 80.0 + 0.3);
        float inner   = smoothstep(0.0,  0.05, t);
        float outer   = smoothstep(1.0,  0.82, t);
        float alpha   = band * density * inner * outer * 0.88;
        vec3  col     = mix(ringColor, vec3(1.0, 0.95, 0.8), t * 0.4);
        gl_FragColor  = vec4(col, alpha);
      }`,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  return new THREE.Mesh(geo, mat);
}

function makeUranusRings(r, halfWidth) {
  return new THREE.Mesh(
    new THREE.TorusGeometry(r, halfWidth, 2, 200),
    new THREE.MeshBasicMaterial({ color: 0x99cccc, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
}

const planetObjects = [];
const orbitLines = [];

function buildOrbitLine(radius) {
  const pts = [];
  for (let i = 0; i <= 256; i++) {
    const a = (i / 256) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const line = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color: 0x334466, transparent: true, opacity: 0.4 })
  );
  scene.add(line);
  return line;
}

PLANET_DATA.forEach((d, i) => {
  orbitLines.push(buildOrbitLine(d.dist));

  const mat = new THREE.MeshStandardMaterial({
    color:            d.color,
    emissive:         d.emissive,
    emissiveIntensity: 0.12,
    roughness:        d.isEarth ? 0.55 : 0.82,
    metalness:        d.isEarth ? 0.12 : 0.06,
  });

  const mesh = new THREE.Mesh(new THREE.SphereGeometry(d.size, 96, 96), mat);
  mesh.castShadow    = true;
  mesh.receiveShadow = true;
  mesh.rotation.z    = THREE.MathUtils.degToRad(d.axialTilt || 0);

  const pivot = new THREE.Object3D();
  pivot.rotation.y = Math.random() * Math.PI * 2;
  pivot.add(mesh);
  mesh.position.x = d.dist;
  scene.add(pivot);

  if (d.isEarth)         mesh.add(makeAtmosphere(d.size * 1.05, '#4488ff', 1.4));
  else if (d.name === 'Venus')   mesh.add(makeAtmosphere(d.size * 1.04, '#ddaa44', 0.9));
  else if (d.name === 'Neptune') mesh.add(makeAtmosphere(d.size * 1.03, '#2244cc', 0.8));

  let ringMesh = null;
  if (d.rings && !d.thinRings) {
    ringMesh = makeSaturnRings(d.size * 1.35, d.size * 2.45);
    ringMesh.rotation.x = THREE.MathUtils.degToRad(26);
    mesh.add(ringMesh);
  }
  if (d.thinRings) {
    ringMesh = makeUranusRings(d.size * 1.6, 0.09);
    ringMesh.rotation.z = THREE.MathUtils.degToRad(90);
    mesh.add(ringMesh);
  }

  let cloudMesh = null;
  if (d.isEarth) {
    cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(d.size * 1.012, 64, 64),
      new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, depthWrite: false })
    );
    mesh.add(cloudMesh);
  }

  planetObjects.push({ ...d, pivot, mesh, cloudMesh, ring: ringMesh, idx: i });
});

(function buildAsteroidBelt() {
  const count = 6000;
  const pos  = new Float32Array(count * 3);
  const cols = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = 26.5 + Math.random() * 5.5;
    const a = Math.random() * Math.PI * 2;
    pos[i * 3]     = Math.cos(a) * r;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 0.9;
    pos[i * 3 + 2] = Math.sin(a) * r;
    const c = 0.4 + Math.random() * 0.4;
    cols[i * 3]     = c;
    cols[i * 3 + 1] = c * 0.9;
    cols[i * 3 + 2] = c * 0.7;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(cols, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.065, vertexColors: true, transparent: true, opacity: 0.75,
  })));
})();

let speedMult      = 1.0;
let paused         = false;
let orbitsVisible  = true;
let selectedPlanet = null;
let cameraLerpActive = false;
const cameraTargetPos = new THREE.Vector3();

const raycaster   = new THREE.Raycaster();
const mouse       = new THREE.Vector2();
const tooltip     = document.getElementById('tooltip');
const infoCard    = document.getElementById('info-card');
const speedSlider = document.getElementById('speed-slider');
const speedDisplay = document.getElementById('speed-display');

const nav = document.getElementById('planet-nav');
PLANET_DATA.forEach((d, i) => {
  const btn = document.createElement('button');
  btn.className    = 'pnav';
  btn.textContent  = d.name;
  btn.dataset.idx  = i;
  btn.addEventListener('click', () => focusPlanet(i));
  nav.appendChild(btn);
});

speedSlider.addEventListener('input', () => {
  speedMult = parseFloat(speedSlider.value);
  speedDisplay.textContent = speedMult.toFixed(1) + '×';
});

document.getElementById('pause-btn').addEventListener('click', () => {
  paused = !paused;
  document.getElementById('pause-btn').textContent = paused ? '▶' : '⏸';
});

document.getElementById('orbits-btn').addEventListener('click', function () {
  orbitsVisible = !orbitsVisible;
  orbitLines.forEach(l => (l.visible = orbitsVisible));
  this.textContent  = orbitsVisible ? 'ON' : 'OFF';
  this.style.color  = orbitsVisible ? '' : '#4f7eff';
});

document.getElementById('reset-btn').addEventListener('click', () => {
  cameraTargetPos.set(0, 38, 90);
  controls.target.set(0, 0, 0);
  cameraLerpActive = true;
  clearSelection();
});

document.getElementById('close-btn').addEventListener('click', clearSelection);

renderer.domElement.addEventListener('click',     onCanvasClick);
renderer.domElement.addEventListener('mousemove', onMouseMove);

function getWorldPos(planetObj) {
  const wp = new THREE.Vector3();
  planetObj.mesh.getWorldPosition(wp);
  return wp;
}

function onMouseMove(e) {
  mouse.x = (e.clientX / innerWidth)  *  2 - 1;
  mouse.y = (e.clientY / innerHeight) * -2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObjects([sunMesh, ...planetObjects.map(p => p.mesh)]);
  if (hits.length) {
    const obj  = hits[0].object;
    const name = obj === sunMesh
      ? 'Sun'
      : (planetObjects.find(p => p.mesh === obj) || {}).name || '';
    if (name) {
      tooltip.textContent  = name;
      tooltip.style.display = 'block';
      tooltip.style.left    = e.clientX + 'px';
      tooltip.style.top     = e.clientY + 'px';
      renderer.domElement.style.cursor = 'pointer';
    }
  } else {
    tooltip.style.display = 'none';
    renderer.domElement.style.cursor = 'grab';
  }
}

function onCanvasClick(e) {
  mouse.x = (e.clientX / innerWidth)  *  2 - 1;
  mouse.y = (e.clientY / innerHeight) * -2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObjects(planetObjects.map(p => p.mesh));
  if (hits.length) {
    const pObj = planetObjects.find(p => p.mesh === hits[0].object);
    if (pObj) focusPlanet(pObj.idx);
  } else if (raycaster.intersectObject(sunMesh).length) {
    cameraTargetPos.set(0, 10, 20);
    controls.target.set(0, 0, 0);
    cameraLerpActive = true;
  }
}

function focusPlanet(idx) {
  selectedPlanet = idx;
  const p   = planetObjects[idx];
  const wp  = getWorldPos(p);
  const dir = new THREE.Vector3().subVectors(camera.position, wp).normalize();
  cameraTargetPos.copy(wp).addScaledVector(dir, p.size * 6 + 8);
  cameraLerpActive = true;
  controls.target.copy(wp);

  document.querySelectorAll('.pnav').forEach((b, i) => b.classList.toggle('active', i === idx));

  document.getElementById('ic-name').textContent   = p.name;
  document.getElementById('ic-type').textContent   = p.type;
  document.getElementById('ic-dist').textContent   = p.realDist;
  document.getElementById('ic-period').textContent = p.period;
  document.getElementById('ic-diam').textContent   = p.diam;
  document.getElementById('ic-temp').textContent   = p.temp;
  document.getElementById('ic-moons').textContent  = p.moons;

  const icon = document.getElementById('ic-icon');
  icon.style.background = p.color + '33';
  icon.style.border     = '1px solid ' + p.color + '55';
  icon.style.color      = p.color;
  icon.textContent      = PLANET_ICONS[idx];

  infoCard.classList.add('visible');
}

function clearSelection() {
  selectedPlanet = null;
  infoCard.classList.remove('visible');
  document.querySelectorAll('.pnav').forEach(b => b.classList.remove('active'));
}

let prevTime   = performance.now();
let frameCount = 0;
let fpsTime    = performance.now();

function tick() {
  requestAnimationFrame(tick);

  const now = performance.now();
  const dt  = Math.min((now - prevTime) / 1000, 0.05);
  prevTime  = now;

  const t   = now / 1000;
  const spd = paused ? 0 : speedMult;

  coronaMat.uniforms.time.value  = t;
  sunMesh.rotation.y            += dt * 0.12 * spd;
  sunSurface.material.opacity    = 0.1 + 0.06 * Math.sin(t * 2.1);
  sunLight.intensity             = 3.2 + 0.3  * Math.sin(t * 1.6);

  planetObjects.forEach(p => {
    p.pivot.rotation.y  += p.speed * dt * spd * 10;
    p.mesh.rotation.y   += dt * 0.5;
    if (p.cloudMesh) p.cloudMesh.rotation.y += dt * 0.08;
  });

  if (cameraLerpActive) {
    const lf = 1 - Math.pow(0.04, dt);
    camera.position.lerp(cameraTargetPos, lf);
    if (selectedPlanet !== null) {
      controls.target.lerp(getWorldPos(planetObjects[selectedPlanet]), lf);
    }
    if (camera.position.distanceTo(cameraTargetPos) < 0.1) cameraLerpActive = false;
  }

  controls.update();
  renderer.render(scene, camera);

  frameCount++;
  if (now - fpsTime >= 1000) {
    document.getElementById('status').textContent = frameCount + ' fps';
    frameCount = 0;
    fpsTime    = now;
  }
}

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

const loadSteps = [
  'Initializing scene',
  'Building star field',
  'Constructing planets',
  'Calibrating orbits',
  'Launch',
];

let step = 0;
const bar      = document.getElementById('load-bar');
const loadText = document.getElementById('load-text');
const loader   = document.getElementById('loader');

function advanceLoader() {
  if (step >= loadSteps.length) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 1000);
    const hint = document.getElementById('hint');
    hint.style.opacity = '1';
    setTimeout(() => (hint.style.opacity = '0'), 5000);
    tick();
    return;
  }
  bar.style.width    = (step / (loadSteps.length - 1)) * 100 + '%';
  loadText.textContent = loadSteps[step];
  step++;
  setTimeout(advanceLoader, step === loadSteps.length ? 600 : 280);
}

advanceLoader();