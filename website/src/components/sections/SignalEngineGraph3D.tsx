'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// ── Brand colors ──────────────────────────────────────────────────────
const GOLD = '#C8934A';
const VIOLET = '#7C5CBF';
const CYAN = '#4A9CC8';
const ROSE = '#C84A7C';

type NodeGroup = 'hub' | 'pr' | 'content' | 'ai' | 'compound';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  r: number;
  color: string;
  group: NodeGroup;
}

const NODES: GraphNode[] = [
  { id: 'hub',         label: 'Signal Engine™',       x:    0, y:    0, z:    0, r: 11,  color: GOLD,   group: 'hub' },
  { id: 'pr',          label: 'PR & Media',           x:  100, y:   18, z:  -25, r:  6.5, color: GOLD,   group: 'pr' },
  { id: 'content',     label: 'Content',              x:  -88, y:  -18, z:   68, r:  6.5, color: VIOLET, group: 'content' },
  { id: 'ai',          label: 'AI Presence',          x:   12, y:  -78, z:  -88, r:  6.5, color: CYAN,   group: 'ai' },
  { id: 'authority',   label: 'Authority Score',      x:   55, y:   55, z:   45, r:  4.5, color: ROSE,   group: 'compound' },
  { id: 'pipeline',    label: 'Pipeline',             x:  -40, y:   38, z:  -55, r:  4.5, color: ROSE,   group: 'compound' },
  { id: 'wsj',         label: 'Wall Street Journal',  x:  148, y:   42, z:   10, r:  3,   color: GOLD,   group: 'pr' },
  { id: 'tc',          label: 'TechCrunch',           x:  158, y:   -8, z:  -58, r:  3,   color: GOLD,   group: 'pr' },
  { id: 'forbes',      label: 'Forbes',               x:  118, y:   72, z:  -62, r:  3,   color: GOLD,   group: 'pr' },
  { id: 'pitch',       label: 'Pitch Strategy',       x:   88, y:   -2, z:  -78, r:  2.5, color: GOLD,   group: 'pr' },
  { id: 'analyst',     label: 'Analyst Relations',    x:  128, y:  -38, z:  -12, r:  2.5, color: GOLD,   group: 'pr' },
  { id: 'article',     label: 'Thought Leadership',   x: -128, y:    4, z:   88, r:  3,   color: VIOLET, group: 'content' },
  { id: 'linkedin',    label: 'LinkedIn Program',     x: -145, y:  -48, z:   28, r:  3,   color: VIOLET, group: 'content' },
  { id: 'video',       label: 'Video Stack',          x:  -78, y:  -68, z:  108, r:  3,   color: VIOLET, group: 'content' },
  { id: 'whitepaper',  label: 'Research Reports',     x: -118, y:   12, z:   18, r:  2.5, color: VIOLET, group: 'content' },
  { id: 'chatgpt',     label: 'ChatGPT',              x:  -18, y: -108, z: -118, r:  3,   color: CYAN,   group: 'ai' },
  { id: 'perplexity',  label: 'Perplexity',           x:   48, y:  -98, z: -128, r:  3,   color: CYAN,   group: 'ai' },
  { id: 'gemini',      label: 'Gemini',               x:   78, y: -128, z:  -58, r:  3,   color: CYAN,   group: 'ai' },
  { id: 'claudeai',    label: 'Claude',               x:  -48, y:  -58, z: -128, r:  2.5, color: CYAN,   group: 'ai' },
  { id: 'citation',    label: 'AI Citations',         x:   18, y: -138, z:  -38, r:  2.5, color: CYAN,   group: 'ai' },
];

const LINKS: [string, string][] = [
  ['hub', 'pr'], ['hub', 'content'], ['hub', 'ai'],
  ['pr', 'wsj'], ['pr', 'tc'], ['pr', 'forbes'], ['pr', 'pitch'], ['pr', 'analyst'],
  ['content', 'article'], ['content', 'linkedin'], ['content', 'video'], ['content', 'whitepaper'],
  ['ai', 'chatgpt'], ['ai', 'perplexity'], ['ai', 'gemini'], ['ai', 'claudeai'], ['ai', 'citation'],
  ['wsj', 'authority'], ['authority', 'citation'], ['citation', 'pipeline'], ['article', 'authority'], ['pipeline', 'pr'],
  ['hub', 'authority'], ['hub', 'pipeline'],
];

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

interface Particle {
  a: string;
  b: string;
  t: number;
  speed: number;
  idx: number;
  r: number;
  g: number;
  bl: number;
}

/**
 * Custom Three.js Signal Engine knowledge graph.
 *
 * Every node renders as a solid colored sphere PLUS a large glowing sprite halo
 * (canvas-generated radial gradient texture, additive blending) — this is what
 * creates the actual glow effect. Edges carry traveling particles using
 * THREE.Points with additive blending. Hub pulses slowly. Custom orbit
 * controls with auto-rotation that resumes 3s after the user stops dragging.
 *
 * Zero external graph libraries — only `three`, which is already a dep.
 *
 * Lives inside `next/dynamic` with ssr:false from Hero.tsx, so the static
 * `import * as THREE from 'three'` is safe (module never loaded on the server).
 */
export default function SignalEngineGraph3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Local state owned by the closure — refs aren't needed because we tear
    // everything down in the cleanup
    let animId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    const meshes: THREE.Mesh[] = [];
    const particles: Particle[] = [];
    let pPos: Float32Array;
    let pCol: Float32Array;
    let pGeo: THREE.BufferGeometry;
    let spherical: THREE.Spherical;
    let isDragging = false;
    let lastMX = 0;
    let lastMY = 0;
    let autoRot = true;
    let autoResumeTimer: ReturnType<typeof setTimeout> | null = null;
    let lastTime = 0;
    let hubSprite: THREE.Sprite | null = null;
    let tick = 0;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;

    // Snapshot the canvas ref in a non-null local. The outer `if (!canvas)
    // return` narrowing isn't preserved across the setTimeout closure
    // boundary, so we re-narrow with this assignment and use `cvs` inside.
    const cvs: HTMLCanvasElement = canvas;

    // Defer init to next frame so the parent's layout has settled and
    // `cvs.clientWidth/Height` reads the actual rendered size.
    const initTimer = setTimeout(() => {
      const W = cvs.clientWidth;
      const H = cvs.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      cvs.width = W * dpr;
      cvs.height = H * dpr;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(dpr);
      renderer.setSize(W, H, false);
      renderer.setClearColor(0x0a0912, 1);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 2000);
      camera.position.set(0, 0, 340);

      spherical = new THREE.Spherical().setFromVector3(camera.position);

      // Canvas-generated radial-gradient texture for sprite halos.
      // This is what makes the "glow" look real instead of a flat colored
      // shape — alpha falls off smoothly across 5 stops.
      function glowTex(hex: string, alpha = 1): THREE.CanvasTexture {
        const cv = document.createElement('canvas');
        cv.width = cv.height = 256;
        const ctx = cv.getContext('2d')!;
        const [r, g, b] = hexToRgb(hex);
        const R = (r * 255) | 0;
        const G = (g * 255) | 0;
        const B = (b * 255) | 0;
        const gr = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gr.addColorStop(0,    `rgba(${R},${G},${B},${alpha})`);
        gr.addColorStop(0.15, `rgba(${R},${G},${B},${alpha * 0.85})`);
        gr.addColorStop(0.40, `rgba(${R},${G},${B},${alpha * 0.35})`);
        gr.addColorStop(0.75, `rgba(${R},${G},${B},${alpha * 0.08})`);
        gr.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(cv);
      }

      const nodeMap: Record<string, GraphNode> = {};
      NODES.forEach((n) => {
        nodeMap[n.id] = n;
      });

      // Build nodes: solid sphere + glow sprite per node
      NODES.forEach((n) => {
        const geo = new THREE.SphereGeometry(n.r, 28, 28);
        const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(n.color) });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(n.x, n.y, n.z);
        mesh.userData = { node: n };
        scene!.add(mesh);
        meshes.push(mesh);

        const glowScale =
          n.group === 'hub' ? 9.5 :
          n.group === 'compound' ? 7 :
          n.r > 5 ? 7 : 6;
        const glowAlpha =
          n.group === 'hub' ? 0.92 :
          n.group === 'compound' ? 0.72 :
          n.r > 5 ? 0.68 : 0.55;

        const sp = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTex(n.color, glowAlpha),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        sp.scale.setScalar(n.r * glowScale * 2);
        sp.position.set(n.x, n.y, n.z);
        scene!.add(sp);

        if (n.id === 'hub') hubSprite = sp;
      });

      // Build edges as additive-blended line segments
      const linePos: number[] = [];
      const lineCol: number[] = [];
      LINKS.forEach(([a, b]) => {
        const na = nodeMap[a];
        const nb = nodeMap[b];
        if (!na || !nb) return;
        linePos.push(na.x, na.y, na.z, nb.x, nb.y, nb.z);
        const [r, g, bl] = hexToRgb(na.color);
        lineCol.push(r, g, bl, r, g, bl);
      });
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      lGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineCol, 3));
      scene.add(
        new THREE.LineSegments(
          lGeo,
          new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.2,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        ),
      );

      // Build flowing particles along edges
      const MAX_P = LINKS.length * 3;
      pPos = new Float32Array(MAX_P * 3);
      pCol = new Float32Array(MAX_P * 3);
      pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      const pointsMesh = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({
          size: 3.8,
          vertexColors: true,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
        }),
      );
      scene.add(pointsMesh);

      let pi = 0;
      LINKS.forEach(([a, b]) => {
        const na = nodeMap[a];
        if (!na || pi >= MAX_P) return;
        const [r, g, bl] = hexToRgb(na.color);
        particles.push({
          a, b,
          t: Math.random(),
          speed: 0.0022 + Math.random() * 0.0018,
          idx: pi, r, g, bl,
        });
        pi++;
        if (pi < MAX_P) {
          particles.push({
            a, b,
            t: (Math.random() + 0.5) % 1,
            speed: 0.0015 + Math.random() * 0.0015,
            idx: pi, r, g, bl,
          });
          pi++;
        }
      });

      function updateParticles(dt: number) {
        particles.forEach((p) => {
          p.t = (p.t + p.speed * dt) % 1;
          const na = nodeMap[p.a];
          const nb = nodeMap[p.b];
          if (!na || !nb) return;
          const i = p.idx * 3;
          pPos[i]     = na.x + (nb.x - na.x) * p.t;
          pPos[i + 1] = na.y + (nb.y - na.y) * p.t;
          pPos[i + 2] = na.z + (nb.z - na.z) * p.t;
          pCol[i]     = p.r;
          pCol[i + 1] = p.g;
          pCol[i + 2] = p.bl;
        });
        pGeo.attributes.position.needsUpdate = true;
        pGeo.attributes.color.needsUpdate = true;
      }

      // ── Custom orbit controls ──────────────────────────────────────
      function onMouseDown(e: MouseEvent) {
        isDragging = true;
        lastMX = e.clientX;
        lastMY = e.clientY;
        autoRot = false;
        if (autoResumeTimer) clearTimeout(autoResumeTimer);
        cvs.style.cursor = 'grabbing';
      }
      function onMouseUp() {
        isDragging = false;
        cvs.style.cursor = 'grab';
        autoResumeTimer = setTimeout(() => {
          autoRot = true;
        }, 3000);
      }
      function onMouseMove(e: MouseEvent) {
        if (!isDragging || !camera) return;
        const dx = e.clientX - lastMX;
        const dy = e.clientY - lastMY;
        lastMX = e.clientX;
        lastMY = e.clientY;
        spherical.theta -= dx * 0.007;
        spherical.phi = Math.max(0.3, Math.min(Math.PI - 0.3, spherical.phi - dy * 0.007));
        camera.position.setFromSpherical(spherical);
        camera.lookAt(0, 0, 0);
      }
      function onWheel(e: WheelEvent) {
        if (!camera) return;
        e.preventDefault();
        spherical.radius = Math.max(180, Math.min(520, spherical.radius + e.deltaY * 0.45));
        camera.position.setFromSpherical(spherical);
        camera.lookAt(0, 0, 0);
      }

      cvs.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);
      cvs.addEventListener('wheel', onWheel, { passive: false });

      // Hover raycasting → tooltip
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      function onHover(e: MouseEvent) {
        if (isDragging || !camera) return;
        const rect = cvs.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(meshes);
        if (hits.length) {
          const node = hits[0].object.userData.node as GraphNode;
          setHovered(node.label);
          setMousePos({ x: e.clientX - rect.left + 14, y: e.clientY - rect.top - 8 });
        } else {
          setHovered(null);
        }
      }
      function onLeave() {
        setHovered(null);
      }
      cvs.addEventListener('mousemove', onHover);
      cvs.addEventListener('mouseleave', onLeave);

      // Window resize
      function onResize() {
        if (!renderer || !camera) return;
        const w = cvs.clientWidth;
        const h = cvs.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      window.addEventListener('resize', onResize);

      // Animation loop
      function animate(t: number) {
        animId = requestAnimationFrame(animate);
        const dt = Math.min(t - lastTime, 50);
        lastTime = t;
        tick += dt;

        if (autoRot && camera) {
          spherical.theta += 0.00055 * dt;
          camera.position.setFromSpherical(spherical);
          camera.lookAt(0, 0, 0);
        }

        // Slow hub pulse
        if (hubSprite) {
          const pulse = 1 + 0.06 * Math.sin(tick * 0.0018);
          hubSprite.scale.setScalar(11 * 9.5 * 2 * pulse);
        }

        updateParticles(dt);
        if (scene && camera && renderer) {
          renderer.render(scene, camera);
        }
      }
      animId = requestAnimationFrame(animate);

      // Stash listener handles for cleanup
      cleanupFns.push(() => {
        cvs.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('mousemove', onMouseMove);
        cvs.removeEventListener('wheel', onWheel);
        cvs.removeEventListener('mousemove', onHover);
        cvs.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('resize', onResize);
      });
    }, 50);

    const cleanupFns: Array<() => void> = [];

    return () => {
      clearTimeout(initTimer);
      if (autoResumeTimer) clearTimeout(autoResumeTimer);
      cancelAnimationFrame(animId);
      cleanupFns.forEach((fn) => fn());
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 580,
        background: '#0a0912',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
      />
      {hovered && (
        <div
          style={{
            position: 'absolute',
            left: mousePos.x,
            top: mousePos.y,
            background: 'rgba(14,13,18,.88)',
            border: '1px solid rgba(200,147,74,.4)',
            color: '#f0ede8',
            fontFamily: 'Arial, sans-serif',
            fontSize: 12,
            padding: '5px 10px',
            borderRadius: 6,
            pointerEvents: 'none',
            letterSpacing: '.04em',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(4px)',
          }}
        >
          {hovered}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        {[
          { label: 'PR', color: GOLD },
          { label: 'Content', color: VIOLET },
          { label: 'AI Presence', color: CYAN },
        ].map(({ label, color }) => (
          <span
            key={label}
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color,
              background: `${color}18`,
              border: `1px solid ${color}44`,
              padding: '3px 8px',
              borderRadius: 4,
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          fontSize: 10,
          color: 'rgba(255,255,255,.2)',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '.08em',
          pointerEvents: 'none',
        }}
      >
        drag to explore
      </div>
    </div>
  );
}
