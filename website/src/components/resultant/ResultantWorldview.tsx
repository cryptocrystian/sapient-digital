'use client';

import { useEffect, useRef } from 'react';

const NOISE_LIB = `
  float hash(vec2 p){
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }
  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0 - 2.0*f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++){
      v += a * noise(p);
      p  = p * 2.03 + 7.0;
      a *= 0.5;
    }
    return v;
  }
`;

// Dense "attention" noise + a bright "authority" signal line + orange pulses.
const WORLDVIEW_FRAG = `
  precision highp float;
  uniform float u_time;
  uniform vec2  u_res;
  ${NOISE_LIB}
  void main(){
    vec2 uv = gl_FragCoord.xy / u_res;
    float t = u_time * 0.08;

    float n1 = fbm(vec2(uv.x * 16.0 - t * 1.5,  uv.y * 10.0 + fbm(vec2(uv.x * 8.0 - t, uv.y * 5.0))));
    float n2 = fbm(vec2(uv.x * 11.0 - t * 0.9 + 7.0, uv.y * 7.5));
    float noiseField = n1 * 0.65 + n2 * 0.35;
    float noiseBright = smoothstep(0.42, 0.70, noiseField);

    float signalY = 0.44;
    float sd = uv.y - signalY;
    float signalCore = exp(-sd * sd * 7500.0);
    float signalHalo = exp(-sd * sd * 700.0) * 0.22;

    float pulsePos  = fract(t * 0.55 + 0.3);
    float pulseDist = abs(uv.x - pulsePos);
    float pulse  = exp(-pulseDist  * pulseDist  * 160.0) * exp(-sd * sd * 7500.0);
    float pulsePos2  = fract(t * 0.9 + 0.7);
    float pulseDist2 = abs(uv.x - pulsePos2);
    float pulse2 = exp(-pulseDist2 * pulseDist2 * 240.0) * exp(-sd * sd * 7500.0) * 0.6;

    vec3 col = vec3(0.038, 0.038, 0.044);
    col += vec3(0.44, 0.46, 0.52) * noiseBright * 0.45;
    col += vec3(0.98, 0.95, 0.90) * (signalCore + signalHalo);
    col += vec3(1.0, 0.46, 0.20) * (pulse * 1.8 + pulse2 * 1.4);

    float vScan = step(0.985, abs(sin(uv.x * 70.0))) * 0.03;
    col += vec3(0.3, 0.3, 0.34) * vScan;

    vec2 vp = uv - 0.5;
    float vig = smoothstep(1.0, 0.3, length(vp * vec2(0.6, 1.4)) * 1.4);
    col *= vig * 0.88 + 0.12;

    float grain = hash(gl_FragCoord.xy + mod(u_time, 100.0) * 0.1) - 0.5;
    col += grain * 0.018;

    col = col / (1.0 + col * 0.4);
    col = pow(col, vec3(0.95));

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ResultantWorldview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, alpha: false });
    if (!gl) return;

    const ext = gl.getExtension('OES_standard_derivatives');
    const derivPragma = ext ? '#extension GL_OES_standard_derivatives : enable\n' : '';
    const vertSrc = 'attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }';
    const fragSrc = derivPragma + WORLDVIEW_FRAG;

    const compile = (type: number, src: string): WebGLShader | null => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error('[ResultantWorldview] shader compile:', gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, vertSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_res');
    const dprCap = 1.5;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let running = true;
    let rafId = 0;

    const frame = () => {
      if (!running) return;
      resize();
      const t = reduceMotion ? 10.0 : (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduceMotion) rafId = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const was = running;
        running = entries[0].isIntersecting;
        if (running && !was && !reduceMotion) rafId = requestAnimationFrame(frame);
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    frame();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <section className="rs-worldview" id="worldview" aria-label="The Authority Economy">
      <div className="rs-worldview__strip">
        <canvas ref={canvasRef} className="rs-worldview__canvas" aria-hidden="true" />
        <div className="rs-worldview__strip-labels">
          <div className="rs-strip-label rs-strip-label--noise">
            <span className="rs-strip-label__dot" aria-hidden="true" />
            <span>Attention<span className="rs-strip-label__em">· Everywhere</span></span>
          </div>
          <div className="rs-strip-label rs-strip-label--signal">
            <span className="rs-strip-label__dot" aria-hidden="true" />
            <span>Authority<span className="rs-strip-label__em">· Scarce</span></span>
          </div>
        </div>
      </div>

      <div className="rs-worldview__content">
        <div>
          <p className="rs-worldview__eyebrow">01 — The Authority Economy</p>
          <h2 className="rs-worldview__h2">
            Attention is everywhere.<br />Authority is scarce.
          </h2>
        </div>
        <div>
          <p className="rs-worldview__body">
            Your buyers do not form opinions in one place. They encounter experts in publications,
            search for answers, compare perspectives, ask AI tools, and listen to the people they
            trust. Every encounter can strengthen — or weaken — the story they believe about your
            company.
          </p>
          <p className="rs-worldview__pull">
            You cannot control every conversation about your category. You can give the market
            better reasons to remember you.
          </p>
          <a
            className="rs-worldview__read-link"
            href="/insights/attention-authority"
            data-track="cta_click"
            data-cta-name="read_insight"
            data-cta-location="worldview_contextual"
            data-insight-slug="attention-authority"
          >
            <span className="rs-worldview__read-chip">— Full Report · 24 pages · Free</span>
            <span className="rs-worldview__read-label">
              Attention Is Everywhere. Authority Is Scarce.{' '}
              <span className="rs-worldview__read-arrow" aria-hidden="true">↗</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
