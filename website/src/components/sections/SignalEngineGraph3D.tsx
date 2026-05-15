'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';
import ForceGraph3DLib from 'react-force-graph-3d';
import * as THREE from 'three';

// The package's public TS types describe the JSX wrapper component, but we use
// the function/vanilla form (factory → instance → chainable methods). Cast to
// any so the chainable API typechecks.
const ForceGraph3D = ForceGraph3DLib as any;

// ── Graph data: Signal Engine knowledge graph ─────────────────────────
const GRAPH_DATA = {
  nodes: [
    // Core hub
    { id: 'hub', label: 'Signal Engine™', group: 'hub', val: 20 },

    // Pillar nodes
    { id: 'pr',      label: 'PR & Media',  group: 'pr',      val: 10 },
    { id: 'content', label: 'Content',     group: 'content', val: 10 },
    { id: 'ai',      label: 'AI Presence', group: 'ai',      val: 10 },

    // PR satellites
    { id: 'wsj',     label: 'Wall Street Journal', group: 'pr', val: 4 },
    { id: 'tc',      label: 'TechCrunch',          group: 'pr', val: 4 },
    { id: 'forbes',  label: 'Forbes',              group: 'pr', val: 4 },
    { id: 'pitch',   label: 'Pitch Strategy',      group: 'pr', val: 3 },
    { id: 'analyst', label: 'Analyst Relations',   group: 'pr', val: 3 },

    // Content satellites
    { id: 'article',    label: 'Thought Leadership', group: 'content', val: 4 },
    { id: 'linkedin',   label: 'LinkedIn Program',   group: 'content', val: 4 },
    { id: 'video',      label: 'Video Stack',        group: 'content', val: 4 },
    { id: 'whitepaper', label: 'Research Reports',   group: 'content', val: 3 },

    // AI satellites
    { id: 'chatgpt',    label: 'ChatGPT',     group: 'ai', val: 4 },
    { id: 'perplexity', label: 'Perplexity',  group: 'ai', val: 4 },
    { id: 'gemini',     label: 'Gemini',      group: 'ai', val: 4 },
    { id: 'claude',     label: 'Claude',      group: 'ai', val: 3 },
    { id: 'citation',   label: 'AI Citations',group: 'ai', val: 3 },

    // Cross-pillar compound nodes (the compounding loop)
    { id: 'pipeline',  label: 'Pipeline',         group: 'compound', val: 5 },
    { id: 'authority', label: 'Authority Score',  group: 'compound', val: 5 },
  ],
  links: [
    // Hub → pillars
    { source: 'hub', target: 'pr' },
    { source: 'hub', target: 'content' },
    { source: 'hub', target: 'ai' },

    // PR → satellites
    { source: 'pr', target: 'wsj' },
    { source: 'pr', target: 'tc' },
    { source: 'pr', target: 'forbes' },
    { source: 'pr', target: 'pitch' },
    { source: 'pr', target: 'analyst' },

    // Content → satellites
    { source: 'content', target: 'article' },
    { source: 'content', target: 'linkedin' },
    { source: 'content', target: 'video' },
    { source: 'content', target: 'whitepaper' },

    // AI → satellites
    { source: 'ai', target: 'chatgpt' },
    { source: 'ai', target: 'perplexity' },
    { source: 'ai', target: 'gemini' },
    { source: 'ai', target: 'claude' },
    { source: 'ai', target: 'citation' },

    // Cross-pillar compounding loop:
    // PR placement → Authority Score → AI Citation → Pipeline → next PR
    { source: 'wsj',       target: 'authority' },
    { source: 'authority', target: 'citation' },
    { source: 'citation',  target: 'pipeline' },
    { source: 'article',   target: 'authority' },
    { source: 'pipeline',  target: 'pr' },
  ],
};

const GROUP_COLORS: Record<string, string> = {
  hub:      '#C8934A', // gold
  pr:       '#C8934A', // gold
  content:  '#7C5CBF', // violet
  ai:       '#4A9CC8', // cyan
  compound: '#C84A7C', // rose
};

const GROUP_EMISSIVE: Record<string, string> = {
  hub:      '#C8934A',
  pr:       '#8B6030',
  content:  '#4A3880',
  ai:       '#2A6080',
  compound: '#802A50',
};

export default function SignalEngineGraph3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);

  const initGraph = useCallback(() => {
    if (!containerRef.current || graphRef.current) return;

    // Three.js + react-force-graph-3d are statically imported at the top of
    // this file. Safe because the whole component is only ever mounted on the
    // client (Hero loads it via next/dynamic with ssr:false).

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const Graph = ForceGraph3D({
      rendererConfig: {
        antialias: true,
        alpha: true, // transparent background
      },
    });

    Graph(container)
      .width(width)
      .height(height)
      .backgroundColor('rgba(0,0,0,0)')
      .graphData(GRAPH_DATA)
      .enableNavigationControls(true)
      .enableNodeDrag(false)
      // Custom 3D node objects: spheres with emissive material + ring
      .nodeThreeObject((node: any) => {
        const group = node.group as string;
        const isHub = node.id === 'hub';
        const isPillar = ['pr', 'content', 'ai'].includes(node.id);
        const color = GROUP_COLORS[group] ?? '#888888';
        const emissive = GROUP_EMISSIVE[group] ?? '#333333';

        const radius = isHub ? 8 : isPillar ? 5 : 3;
        const segments = isHub ? 32 : 16;

        const geometry = new THREE.SphereGeometry(radius, segments, segments);
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          emissive: new THREE.Color(emissive),
          emissiveIntensity: isHub ? 1.2 : isPillar ? 0.8 : 0.5,
          metalness: 0.3,
          roughness: 0.4,
        });
        const mesh = new THREE.Mesh(geometry, material);

        // Hub + pillar nodes get a halo ring
        if (isPillar || isHub) {
          const ringGeo = new THREE.RingGeometry(radius * 1.4, radius * 1.6, 32);
          const ringMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            opacity: 0.25,
            transparent: true,
            side: THREE.DoubleSide,
          });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          mesh.add(ring);
        }

        return mesh;
      })
      .nodeLabel((node: any) => node.label)
      .nodeColor((node: any) => GROUP_COLORS[node.group] ?? '#888888')
      .linkColor((link: any) => {
        const sourceId = link.source?.id ?? link.source;
        const sourceNode = GRAPH_DATA.nodes.find((n) => n.id === sourceId);
        return GROUP_COLORS[sourceNode?.group ?? 'hub'] ?? '#444444';
      })
      .linkWidth(0.6)
      .linkOpacity(0.3)
      .linkDirectionalParticles(2)
      .linkDirectionalParticleWidth(1.2)
      .linkDirectionalParticleSpeed(0.005)
      .linkDirectionalParticleColor((link: any) => {
        const sourceId = link.source?.id ?? link.source;
        const sourceNode = GRAPH_DATA.nodes.find((n) => n.id === sourceId);
        return GROUP_COLORS[sourceNode?.group ?? 'hub'] ?? '#888888';
      })
      .cameraPosition({ x: 0, y: 0, z: 280 });

    // Lighting — gold key + cyan fill for brand-correct sheen
    const scene = Graph.scene();
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xc8934a, 0.8);
    key.position.set(100, 100, 100);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x4a9cc8, 0.4);
    fill.position.set(-100, -100, 100);
    scene.add(fill);

    // Auto-rotate: hand-rolled because the built-in OrbitControls.autoRotate
    // is jittery with the lib's render loop. We orbit the camera ourselves.
    let angle = 0;
    let stopped = false;
    const distance = 280;
    const rotateInterval = setInterval(() => {
      if (stopped) return;
      angle += 0.003;
      Graph.cameraPosition({
        x: distance * Math.sin(angle),
        y: distance * Math.sin(angle * 0.4) * 0.3,
        z: distance * Math.cos(angle),
      });
    }, 16);

    const stopRotation = () => {
      stopped = true;
    };
    container.addEventListener('mousedown', stopRotation, { once: true });
    container.addEventListener('touchstart', stopRotation, { once: true });

    // Handle container resize (responsive hero column)
    const onResize = () => {
      if (!container) return;
      Graph.width(container.clientWidth).height(container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    graphRef.current = Graph;

    return () => {
      clearInterval(rotateInterval);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', stopRotation);
      container.removeEventListener('touchstart', stopRotation);
      if (graphRef.current?._destructor) {
        graphRef.current._destructor();
      }
      graphRef.current = null;
    };
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    // Tiny delay so the parent's layout has settled before we read clientWidth/Height
    const t = setTimeout(() => {
      cleanup = initGraph() ?? undefined;
    }, 100);
    return () => {
      clearTimeout(t);
      cleanup?.();
    };
  }, [initGraph]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        cursor: 'grab',
      }}
      aria-hidden="true"
    />
  );
}
