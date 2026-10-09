import * as THREE from "three";

export function createScene(canvas) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    40
  );
  camera.position.z = 8;

  const mouse = { x: 0, y: 0 };
  window.addEventListener(
    "mousemove",
    (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    { passive: true }
  );

  const count = 420;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.04,
      color: 0xc8ff4d,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    })
  );
  scene.add(points);

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.35, 0.28, 80, 8),
    new THREE.MeshBasicMaterial({
      color: 0x6af0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    })
  );
  knot.position.set(3.2, 0.4, -1);
  scene.add(knot);

  const ico = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.7, 0),
    new THREE.MeshBasicMaterial({
      color: 0xff7a45,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    })
  );
  ico.position.set(-3.4, 1.2, -0.5);
  scene.add(ico);

  let running = !reduced;
  let raf = 0;
  const clock = new THREE.Clock();

  function frame() {
    if (!running) return;
    const t = clock.getElapsedTime();
    points.rotation.y = t * 0.02;
    knot.rotation.x = t * 0.12;
    knot.rotation.y = t * 0.08;
    ico.rotation.y = t * 0.2;
    ico.position.y = 1.2 + Math.sin(t * 0.8) * 0.18;
    camera.position.x += (mouse.x * 0.45 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 0.22 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (reduced || running) return;
    running = true;
    clock.start();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else {
      running = false;
      start();
    }
  });

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > window.innerHeight * 1.4) stop();
      else if (!running && !document.hidden && !reduced) {
        running = false;
        start();
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  if (!reduced) {
    running = true;
    raf = requestAnimationFrame(frame);
  } else {
    renderer.render(scene, camera);
  }
}
