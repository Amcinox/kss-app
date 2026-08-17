"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type SceneMode = "full" | "subtle" | "off";

/**
 * three.js r155 removed the legacy lighting mode, under which hemisphere,
 * directional and point light intensities were scaled by PI internally. This
 * scene was authored against r128, so its intensities are scaled back up here
 * to keep the floodlit look the design intends.
 */
const LEGACY_INTENSITY = Math.PI;

const BALL_RADIUS = 0.62;
const PITCH_W = 90;
const PITCH_H = 60;
const GRAVITY = 0.0075;

/** Camera keyframes driven by scroll: kickoff → sweep → overhead → goal. */
const CAMERA_PATH: { p: [number, number, number]; l: [number, number, number] }[] =
  [
    { p: [-30, 1.5, 14], l: [-14, 1.2, 0] },
    { p: [-6, 4.5, 22], l: [0, 1.0, 0] },
    { p: [16, 3.0, 20], l: [8, 1.0, -2] },
    { p: [4, 34, 10], l: [2, 0, 0] },
    { p: [34, 6, 14], l: [42, 2.0, 0] },
    { p: [50, 2.2, 2], l: [40, 2.2, 0] },
  ];

/** Paints a top-down pitch — stripes, markings, boxes, corner arcs. */
function createPitchTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 1024;
  const g = canvas.getContext("2d")!;

  g.fillStyle = "#0b2c18";
  g.fillRect(0, 0, 1536, 1024);
  for (let i = 0; i < 12; i++) {
    g.fillStyle = i % 2 ? "rgba(255,255,255,0.030)" : "rgba(0,0,0,0.10)";
    g.fillRect(i * 128, 0, 128, 1024);
  }

  g.strokeStyle = "rgba(236,239,234,0.85)";
  g.lineWidth = 6;
  const m = 60;
  g.strokeRect(m, m, 1536 - m * 2, 1024 - m * 2);
  g.beginPath();
  g.moveTo(768, m);
  g.lineTo(768, 1024 - m);
  g.stroke();
  g.beginPath();
  g.arc(768, 512, 130, 0, Math.PI * 2);
  g.stroke();
  g.beginPath();
  g.arc(768, 512, 9, 0, Math.PI * 2);
  g.fillStyle = "rgba(236,239,234,0.85)";
  g.fill();

  for (const side of [0, 1]) {
    const x0 = side ? 1536 - m : m;
    const dir = side ? -1 : 1;
    g.strokeRect(Math.min(x0, x0 + dir * 260), 512 - 300, 260, 600);
    g.strokeRect(Math.min(x0, x0 + dir * 110), 512 - 150, 110, 300);
    g.beginPath();
    g.arc(x0 + dir * 190, 512, 9, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.arc(
      x0 + dir * 190,
      512,
      130,
      dir > 0 ? -Math.PI / 2.6 : Math.PI - Math.PI / 2.6 + 0.02,
      dir > 0 ? Math.PI / 2.6 : Math.PI + Math.PI / 2.6,
    );
    g.stroke();
  }

  for (const [cx, cy] of [
    [m, m],
    [1536 - m, m],
    [m, 1024 - m],
    [1536 - m, 1024 - m],
  ]) {
    g.beginPath();
    g.arc(cx, cy, 26, 0, Math.PI * 2);
    g.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** Flat-shaded icosahedron with black/white panels flecked with brand colours. */
function createBallGeometry(): THREE.IcosahedronGeometry {
  const geometry = new THREE.IcosahedronGeometry(BALL_RADIUS, 1);
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const palette = [
    [0.95, 0.96, 0.94],
    [0.95, 0.96, 0.94],
    [0.05, 0.06, 0.05],
    [0.88, 0.07, 0.11],
    [0.05, 0.54, 0.24],
  ];

  for (let face = 0; face < position.count / 3; face++) {
    const c =
      palette[
        face % 5 === 3
          ? face % 17 === 3
            ? 3
            : 2
          : face % 23 === 5
            ? 4
            : face % 2
      ];
    for (let k = 0; k < 3; k++) {
      const i = (face * 3 + k) * 3;
      colors[i] = c[0];
      colors[i + 1] = c[1];
      colors[i + 2] = c[2];
    }
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

/**
 * Fixed, non-interactive WebGL backdrop: a floodlit night pitch that the page
 * scroll flies a camera across, with a ball the visitor can kick by clicking.
 */
export function PitchScene({ mode = "full" }: { mode?: SceneMode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || mode === "off") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const subtle = mode === "subtle";

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060907, 0.022);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      400,
    );
    camera.position.set(0, 3, 26);

    // ---- pitch ----
    const pitchTexture = createPitchTexture();
    const pitch = new THREE.Mesh(
      new THREE.PlaneGeometry(PITCH_W, PITCH_H),
      new THREE.MeshStandardMaterial({
        map: pitchTexture,
        roughness: 0.95,
        metalness: 0,
      }),
    );
    pitch.rotation.x = -Math.PI / 2;
    scene.add(pitch);

    const surround = new THREE.Mesh(
      new THREE.PlaneGeometry(320, 320),
      new THREE.MeshStandardMaterial({ color: 0x06170e, roughness: 1 }),
    );
    surround.rotation.x = -Math.PI / 2;
    surround.position.y = -0.05;
    scene.add(surround);

    // ---- goals ----
    const postMaterial = new THREE.MeshStandardMaterial({
      color: 0xf2f5f0,
      roughness: 0.4,
      metalness: 0.15,
    });
    const netMaterial = new THREE.MeshBasicMaterial({
      color: 0xbfd8c6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    const addGoal = (x: number, dir: number) => {
      const group = new THREE.Group();
      const W = 12;
      const H = 4.2;
      const D = 3.4;
      const r = 0.14;

      for (const z of [-W / 2, W / 2]) {
        const post = new THREE.Mesh(
          new THREE.CylinderGeometry(r, r, H, 12),
          postMaterial,
        );
        post.position.set(0, H / 2, z);
        group.add(post);
      }
      const bar = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r, W, 12),
        postMaterial,
      );
      bar.rotation.x = Math.PI / 2;
      bar.position.set(0, H, 0);
      group.add(bar);

      const back = new THREE.Mesh(
        new THREE.PlaneGeometry(W, H, 14, 6),
        netMaterial,
      );
      back.position.set(dir * D, H / 2, 0);
      back.rotation.y = Math.PI / 2;
      group.add(back);

      for (const z of [-W / 2, W / 2]) {
        const side = new THREE.Mesh(
          new THREE.PlaneGeometry(D, H, 5, 6),
          netMaterial,
        );
        side.position.set((dir * D) / 2, H / 2, z);
        group.add(side);
      }

      const top = new THREE.Mesh(
        new THREE.PlaneGeometry(D, W, 5, 14),
        netMaterial,
      );
      top.rotation.x = Math.PI / 2;
      top.rotation.z = Math.PI / 2;
      top.position.set((dir * D) / 2, H, 0);
      group.add(top);

      group.position.x = x;
      scene.add(group);
    };
    addGoal(-PITCH_W / 2 + 1.5, -1);
    addGoal(PITCH_W / 2 - 1.5, 1);

    // ---- floodlights ----
    const lampMaterial = new THREE.MeshBasicMaterial({ color: 0xfff2cf });
    const poleMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1f1b,
      roughness: 0.8,
    });
    for (const [x, z] of [
      [-PITCH_W / 2 - 6, -PITCH_H / 2 - 5],
      [PITCH_W / 2 + 6, -PITCH_H / 2 - 5],
      [-PITCH_W / 2 - 6, PITCH_H / 2 + 5],
      [PITCH_W / 2 + 6, PITCH_H / 2 + 5],
    ]) {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.32, 22, 8),
        poleMaterial,
      );
      pole.position.set(x, 11, z);
      scene.add(pole);

      const head = new THREE.Mesh(
        new THREE.BoxGeometry(3.4, 1.4, 0.5),
        lampMaterial,
      );
      head.position.set(x, 22, z);
      head.lookAt(0, 0, 0);
      scene.add(head);

      const glow = new THREE.PointLight(
        0xfff0d0,
        0.9 * LEGACY_INTENSITY,
        90,
        1,
      );
      glow.position.set(x * 0.8, 20, z * 0.8);
      scene.add(glow);
    }

    // ---- ball ----
    const ballGeometry = createBallGeometry();
    const ball = new THREE.Mesh(
      ballGeometry,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        flatShading: true,
        roughness: 0.5,
        metalness: 0.08,
      }),
    );
    ball.position.set(-26, BALL_RADIUS, 0);
    scene.add(ball);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(BALL_RADIUS * 1.5, 32),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.35,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.02;
    scene.add(shadow);

    // ---- night air ----
    const dustCount = subtle ? 200 : 600;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 140;
      dustPositions[i * 3 + 1] = Math.random() * 26;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 110;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3),
    );
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: 0xecefea,
        size: 0.09,
        transparent: true,
        opacity: 0.35,
      }),
    );
    scene.add(dust);

    // ---- lights ----
    scene.add(
      new THREE.HemisphereLight(0xcfe6ff, 0x0a2416, 0.55 * LEGACY_INTENSITY),
    );
    const key = new THREE.DirectionalLight(0xffffff, 0.9 * LEGACY_INTENSITY);
    key.position.set(20, 30, 18);
    scene.add(key);
    const red = new THREE.PointLight(0xe1121c, 1.1 * LEGACY_INTENSITY, 60, 1);
    red.position.set(-24, 8, 14);
    scene.add(red);
    const green = new THREE.PointLight(0x0e8a3e, 1.0 * LEGACY_INTENSITY, 60, 1);
    green.position.set(26, 8, -14);
    scene.add(green);

    // ---- state ----
    const velocity = { x: 0, y: 0, z: 0 };
    const spin = { x: 0, y: 0.004 };
    let curve = 0;
    let squash = 0;
    let scroll = 0;
    let pointerX = 0;
    let pointerY = 0;
    let narrow = window.innerWidth < 820;
    let ballX = ball.position.x;
    let ballY = ball.position.y;
    let ballZ = 0;

    const camPos = new THREE.Vector3(...CAMERA_PATH[0].p);
    const camLook = new THREE.Vector3(...CAMERA_PATH[0].l);

    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const aim = new THREE.Vector3();

    /** Ballistic solve: pick a flight time, derive the speed that lands there. */
    const kick = (event: PointerEvent) => {
      ndc.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      );
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(groundPlane, aim)) return;

      let dx = aim.x - ballX;
      let dz = aim.z - ballZ;
      const distance = Math.max(1.5, Math.hypot(dx, dz));
      dx /= distance;
      dz /= distance;

      const flight = Math.min(190, 60 + distance * 2.6); // frames in the air
      const speed = distance / flight;
      velocity.x = dx * speed;
      velocity.z = dz * speed;
      velocity.y = (GRAVITY * flight) / 2; // apex halfway
      curve = 0;
      spin.x = speed * 0.6;
    };

    const onScroll = () => {
      scroll =
        window.scrollY /
        Math.max(1, document.body.scrollHeight - window.innerHeight);
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      narrow = window.innerWidth < 820;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", kick);
    window.addEventListener("resize", onResize);
    onScroll();

    const lerp3 = (
      a: [number, number, number],
      b: [number, number, number],
      k: number,
    ): [number, number, number] => [
      a[0] + (b[0] - a[0]) * k,
      a[1] + (b[1] - a[1]) * k,
      a[2] + (b[2] - a[2]) * k,
    ];
    const smoothstep = (k: number) => k * k * (3 - 2 * k);
    const target = new THREE.Vector3();

    let frame = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      const s = Math.max(0, Math.min(1, scroll));
      const time = performance.now() * 0.001;

      // ---- camera along the path ----
      const segments = CAMERA_PATH.length - 1;
      const position = s * segments;
      const index = Math.min(segments - 1, Math.floor(position));
      const k = smoothstep(position - index);
      const tp = lerp3(CAMERA_PATH[index].p, CAMERA_PATH[index + 1].p, k);
      const tl = lerp3(CAMERA_PATH[index].l, CAMERA_PATH[index + 1].l, k);
      const zoom = narrow ? 1.35 : 1;

      camPos.lerp(
        target.set(
          tp[0] * zoom + pointerX * 1.4,
          tp[1] * (narrow ? 1.2 : 1) + 0.6,
          tp[2] * zoom - pointerY * 0.8,
        ),
        0.055,
      );
      camLook.lerp(target.set(tl[0], tl[1], tl[2]), 0.055);
      camera.position.copy(camPos);
      camera.lookAt(camLook);

      // ---- ball: gravity, bounce, roll ----
      const DRAG = 0.9975;
      const ROLL_FRICTION = 0.988;
      const airborne = ballY > BALL_RADIUS + 0.001;

      velocity.y -= GRAVITY;
      if (airborne) {
        velocity.x *= DRAG;
        velocity.z *= DRAG;
        velocity.z += curve; // Magnus curve while in flight
        curve *= 0.985;
      } else {
        velocity.x *= ROLL_FRICTION;
        velocity.z *= ROLL_FRICTION;
        curve *= 0.9;
      }
      ballY += velocity.y;

      let impact = 0;
      if (ballY <= BALL_RADIUS) {
        const incoming = -velocity.y;
        const penetration = BALL_RADIUS - ballY;
        ballY = BALL_RADIUS;
        if (incoming > 0.018) {
          impact = Math.min(1, incoming * 3.2);
          // Harder hits lose more energy.
          const restitution = 0.7 - Math.min(0.2, incoming * 0.3);
          velocity.y = incoming * restitution - penetration * 0.2;
          velocity.x *= 0.94; // grip on the turf
          velocity.z *= 0.94;
          spin.x += incoming * 0.35;
        } else {
          velocity.y = 0;
        }
      }

      ballX += velocity.x;
      ballZ += velocity.z;
      if (Math.abs(ballX) > 42) {
        ballX = Math.sign(ballX) * 42;
        velocity.x *= -0.5;
      }
      if (Math.abs(ballZ) > 26) {
        ballZ = Math.sign(ballZ) * 26;
        velocity.z *= -0.5;
      }

      // Squash & stretch: spring back from the compression set at impact.
      squash = Math.max(squash * 0.86, impact * 0.26);
      const air = Math.max(0, ballY - BALL_RADIUS);
      const fallSpeed = Math.min(0.5, Math.abs(velocity.y));
      const stretch = Math.min(0.16, air > 0.02 ? fallSpeed * 0.32 : 0);
      ball.scale.set(
        1 + squash * 1.35 - stretch * 0.45,
        1 - squash * 1.7 + stretch,
        1 + squash * 1.35 - stretch * 0.45,
      );
      ball.position.set(ballX, ballY, ballZ);

      spin.x *= 0.99;
      ball.rotation.z -= velocity.x / BALL_RADIUS;
      ball.rotation.x += spin.x * 0.06 + (velocity.z / BALL_RADIUS) * 0.6;
      ball.rotation.y += 0.0015 + curve * 4;

      shadow.position.set(ballX, 0.02, ballZ);
      const shrink = Math.max(0.3, 1 - air * 0.22);
      shadow.scale.setScalar(shrink);
      shadow.material.opacity = 0.35 * shrink;

      dust.rotation.y = time * 0.008;
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("resize", onResize);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
      pitchTexture.dispose();
      renderer.dispose();
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  );
}
