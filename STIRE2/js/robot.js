/* ============================================================
   STIRE — robot.js
   Robotic AI figure: appears per section, rotates on scroll
   ============================================================ */

(function () {
  if (typeof THREE === 'undefined') return;

  /* ----------------------------------------------------------
     SHARED MATERIALS
  ---------------------------------------------------------- */
  const MAT = {
    gold:     new THREE.MeshStandardMaterial({ color: 0xc9a84c, metalness: 0.9, roughness: 0.15 }),
    goldDark: new THREE.MeshStandardMaterial({ color: 0x8b6914, metalness: 0.95, roughness: 0.2 }),
    silver:   new THREE.MeshStandardMaterial({ color: 0xe8e8e0, metalness: 0.85, roughness: 0.12 }),
    dark:     new THREE.MeshStandardMaterial({ color: 0x111108, metalness: 0.7,  roughness: 0.3 }),
    glow:     new THREE.MeshStandardMaterial({ color: 0xffe580, emissive: 0xd4a020, emissiveIntensity: 1.2, metalness: 0.4, roughness: 0.3 }),
    eye:      new THREE.MeshStandardMaterial({ color: 0xfff0a0, emissive: 0xffcc00, emissiveIntensity: 2.0, metalness: 0.2, roughness: 0.1 }),
    panel:    new THREE.MeshStandardMaterial({ color: 0x1a1a10, metalness: 0.6, roughness: 0.4 }),
    trim:     new THREE.MeshStandardMaterial({ color: 0xe8c96a, metalness: 0.95, roughness: 0.1 }),
  };

  /* ----------------------------------------------------------
     BUILD ROBOT GEOMETRY (shared Group)
  ---------------------------------------------------------- */
  function buildRobot() {
    const root = new THREE.Group();

    // ---- HEAD ----
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.05, 0);

    // Main head box
    const headGeo = new THREE.BoxGeometry(0.88, 0.76, 0.72);
    const head = new THREE.Mesh(headGeo, MAT.silver);
    headGroup.add(head);

    // Head top ridge
    const ridgeGeo = new THREE.BoxGeometry(0.6, 0.1, 0.5);
    const ridge = new THREE.Mesh(ridgeGeo, MAT.gold);
    ridge.position.set(0, 0.42, 0);
    headGroup.add(ridge);

    // Antenna
    const antBase = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.14, 8), MAT.goldDark);
    antBase.position.set(0, 0.5, 0);
    headGroup.add(antBase);
    const antRod = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.38, 8), MAT.gold);
    antRod.position.set(0, 0.76, 0);
    headGroup.add(antRod);
    const antTip = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), MAT.eye);
    antTip.position.set(0, 0.97, 0);
    headGroup.add(antTip);

    // Eyes
    [-0.22, 0.22].forEach((x, i) => {
      const eyeSocket = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.04), MAT.panel);
      eyeSocket.position.set(x, 0.04, 0.37);
      headGroup.add(eyeSocket);
      const eyeLens = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.04), MAT.eye);
      eyeLens.position.set(x, 0.04, 0.4);
      headGroup.add(eyeLens);
    });

    // Mouth grill
    for (let t = 0; t < 5; t++) {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.04, 0.03), MAT.gold);
      tooth.position.set(-0.14 + t * 0.07, -0.19, 0.37);
      headGroup.add(tooth);
    }

    // Ear panels
    [-0.5, 0.5].forEach(x => {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.18), MAT.goldDark);
      ear.position.set(x, 0.04, 0);
      headGroup.add(ear);
      const earTrim = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.12), MAT.glow);
      earTrim.position.set(x * 1.04, 0.12, 0);
      headGroup.add(earTrim);
    });

    // Chin trim
    const chin = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.07, 0.55), MAT.trim);
    chin.position.set(0, -0.4, 0);
    headGroup.add(chin);

    root.add(headGroup);

    // ---- NECK ----
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.2, 12), MAT.goldDark);
    neck.position.set(0, 1.62, 0);
    root.add(neck);

    // ---- TORSO ----
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, 0.6, 0);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.12, 1.1, 0.64), MAT.silver);
    torsoGroup.add(torso);

    // Chest plate
    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.62, 0.08), MAT.panel);
    chest.position.set(0, 0.1, 0.34);
    torsoGroup.add(chest);

    // Chest core (glowing orb)
    const coreRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 8, 32), MAT.gold);
    coreRing.position.set(0, 0.12, 0.38);
    torsoGroup.add(coreRing);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), MAT.eye);
    core.position.set(0, 0.12, 0.4);
    torsoGroup.add(core);

    // Chest panel lines
    [-0.28, 0.28].forEach(x => {
      const line = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.44, 0.06), MAT.goldDark);
      line.position.set(x, 0.1, 0.36);
      torsoGroup.add(line);
    });

    // Shoulder connectors
    [-0.62, 0.62].forEach(x => {
      const sc = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.5), MAT.goldDark);
      sc.position.set(x, 0.44, 0);
      torsoGroup.add(sc);
    });

    // Belt trim
    const belt = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 0.68), MAT.gold);
    belt.position.set(0, -0.54, 0);
    torsoGroup.add(belt);

    // Side vents
    [-0.6, 0.6].forEach(x => {
      for (let v = 0; v < 3; v++) {
        const vent = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.14, 0.06), MAT.trim);
        vent.position.set(x * 0.96, -0.1 + v * 0.2 - 0.1, 0.28);
        torsoGroup.add(vent);
      }
    });

    root.add(torsoGroup);

    // ---- ARMS ----
    [[-0.78, 0.52], [0.78, 0.52]].forEach(([x, y]) => {
      const armG = new THREE.Group();
      armG.position.set(x, y, 0);

      // Upper arm
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.13, 0.52, 10), MAT.silver);
      upper.rotation.z = x < 0 ? 0.18 : -0.18;
      upper.position.set(x < 0 ? -0.08 : 0.08, -0.12, 0);
      armG.add(upper);

      // Elbow joint
      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), MAT.gold);
      elbow.position.set(x < 0 ? -0.14 : 0.14, -0.38, 0);
      armG.add(elbow);

      // Forearm
      const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.48, 10), MAT.silver);
      fore.rotation.z = x < 0 ? 0.3 : -0.3;
      fore.position.set(x < 0 ? -0.24 : 0.24, -0.62, 0);
      armG.add(fore);

      // Forearm band
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.018, 6, 24), MAT.gold);
      band.rotation.x = Math.PI / 2;
      band.position.set(x < 0 ? -0.24 : 0.24, -0.6, 0);
      armG.add(band);

      // Hand
      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.14), MAT.goldDark);
      hand.position.set(x < 0 ? -0.32 : 0.32, -0.86, 0);
      armG.add(hand);

      // Fingers (3)
      for (let f = 0; f < 3; f++) {
        const finger = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.04), MAT.gold);
        finger.position.set(
          (x < 0 ? -0.32 : 0.32) + (f - 1) * 0.055,
          -1.02, 0
        );
        armG.add(finger);
      }

      // Shoulder ball
      const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 14), MAT.gold);
      shoulder.position.set(0, 0, 0);
      armG.add(shoulder);

      root.add(armG);
    });

    // ---- HIPS / WAIST ----
    const hips = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.2, 0.56), MAT.goldDark);
    hips.position.set(0, -0.04, 0);
    root.add(hips);

    // ---- LEGS ----
    [[-0.32, 0], [0.32, 0]].forEach(([x]) => {
      const legG = new THREE.Group();
      legG.position.set(x, -0.28, 0);

      // Upper leg
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.175, 0.155, 0.62, 10), MAT.silver);
      legG.add(upper);

      // Knee
      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.155, 12, 12), MAT.gold);
      knee.position.set(0, -0.38, 0);
      legG.add(knee);

      // Shin
      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.52, 10), MAT.silver);
      shin.position.set(0, -0.66, 0);
      legG.add(shin);

      // Shin panel
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.3, 0.08), MAT.panel);
      panel.position.set(0, -0.64, 0.12);
      legG.add(panel);

      // Shin trim
      const st = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.1), MAT.gold);
      st.position.set(0, -0.52, 0.12);
      legG.add(st);

      // Ankle
      const ankle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.28), MAT.goldDark);
      ankle.position.set(0, -0.98, 0);
      legG.add(ankle);

      // Foot
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.42), MAT.dark);
      foot.position.set(0, -1.1, 0.07);
      legG.add(foot);

      // Foot sole trim
      const sole = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.4), MAT.gold);
      sole.position.set(0, -1.16, 0.07);
      legG.add(sole);

      root.add(legG);
    });

    return root;
  }

  /* ----------------------------------------------------------
     CREATE ONE SCENE + ROBOT PER CANVAS
  ---------------------------------------------------------- */
  function createRobotScene(canvas) {
    if (!canvas) return null;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 0.6, 5.5);
    camera.lookAt(0, 0.4, 0);

    // Lights
    const ambLight = new THREE.AmbientLight(0xfff8e8, 0.55);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xffeebb, 2.0);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc9a84c, 0.9);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    const ptLight = new THREE.PointLight(0xffe066, 1.8, 8);
    ptLight.position.set(0, 0.6, 2.5);
    scene.add(ptLight);

    // Ground bounce
    const bounce = new THREE.PointLight(0xc9a84c, 0.5, 6);
    bounce.position.set(0, -2, 1);
    scene.add(bounce);

    const robot = buildRobot();
    scene.add(robot);

    // Shadow plane
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.ShadowMaterial({ opacity: 0.18 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.42;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    return { renderer, scene, camera, robot };
  }

  /* ----------------------------------------------------------
     LOADER SCENE (big, centred, speaking animation)
  ---------------------------------------------------------- */
  const loaderCanvas = document.getElementById('loader-canvas');
  if (loaderCanvas) {
    const { renderer, scene, camera, robot } = createRobotScene(loaderCanvas) || {};
    if (renderer) {
      camera.position.set(0, 0.8, 5);
      camera.lookAt(0, 0.6, 0);

      let lt = 0;
      (function loopLoader() {
        if (!loaderCanvas.isConnected) return;
        requestAnimationFrame(loopLoader);
        lt += 0.008;
        robot.rotation.y = Math.sin(lt * 0.6) * 0.4;
        // Idle hover
        robot.position.y = Math.sin(lt * 1.4) * 0.05;
        // Head slight tilt
        if (robot.children[0]) {
          robot.children[0].rotation.z = Math.sin(lt * 0.9) * 0.04;
          robot.children[0].rotation.x = Math.sin(lt * 0.7) * 0.03;
        }
        renderer.render(scene, camera);
      })();
    }
  }

  /* ----------------------------------------------------------
     PER-SECTION ROBOTS
  ---------------------------------------------------------- */
  const sectionCanvases = document.querySelectorAll('.robot-canvas');
  const scenes = [];

  sectionCanvases.forEach((canvas) => {
    const obj = createRobotScene(canvas);
    if (obj) {
      scenes.push({ canvas, ...obj, scrollRot: 0, baseScrollY: 0, active: false });
    }
  });

  /* ----------------------------------------------------------
     INTERSECTION OBSERVER — show/hide per section
  ---------------------------------------------------------- */
  const stageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const stage = entry.target.closest('.robot-stage');
      if (stage) stage.classList.toggle('visible', entry.isIntersecting);
      const sc = scenes.find(s => s.canvas === entry.target);
      if (sc) {
        sc.active = entry.isIntersecting;
        if (entry.isIntersecting) sc.baseScrollY = window.scrollY;
      }
    });
  }, { threshold: 0.3 });

  sectionCanvases.forEach(c => stageObserver.observe(c));

  /* ----------------------------------------------------------
     SCROLL → ROTATION
  ---------------------------------------------------------- */
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const delta = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    scenes.forEach(sc => {
      if (sc.active) sc.scrollRot += delta * 0.006;
    });
  });

  /* ----------------------------------------------------------
     ANIMATION LOOP
  ---------------------------------------------------------- */
  let t = 0;
  (function animLoop() {
    requestAnimationFrame(animLoop);
    t += 0.007;

    scenes.forEach(sc => {
      if (!sc.active) return;

      // Smooth scroll rotation
      sc.robot.rotation.y += (sc.scrollRot - sc.robot.rotation.y) * 0.07;
      sc.scrollRot *= 0.94; // dampen

      // Idle bob
      sc.robot.position.y = Math.sin(t * 1.3) * 0.06;

      // Subtle idle sway
      sc.robot.rotation.z = Math.sin(t * 0.7) * 0.015;

      // Eye pulse (point light)
      sc.scene.children.forEach(c => {
        if (c.isPointLight && c.position.z > 2) {
          c.intensity = 1.4 + Math.sin(t * 3) * 0.4;
        }
      });

      sc.renderer.render(sc.scene, sc.camera);
    });
  })();

})();
