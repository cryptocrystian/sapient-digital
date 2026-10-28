'use client';

import { useEffect, useRef } from 'react';
import ResultantNav from './ResultantNav';

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

// Wind-tunnel schlieren hero: three turbulent streams funnel into a venturi throat
// and emerge as a laminar beam of authority.
const HERO_FRAG = `
  precision highp float;
  uniform float u_time;
  uniform vec2  u_res;
  ${NOISE_LIB}
  void main(){
    vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
    float aspect = u_res.x / u_res.y;
    float t = u_time * 0.085;

    vec2 cvg = vec2(0.12, 0.0);
    float cvgDist = length(p - cvg);

    float bend = 1.0 - smoothstep(-0.06, cvg.x - 0.005, p.x);
    bend = pow(bend, 0.70);

    float sep0 = 0.28;
    float sepMin = 0.011;
    float dynSep = mix(sepMin, sep0, bend);

    float y1 = p.y - dynSep;
    float y2 = p.y;
    float y3 = p.y + dynSep;

    float band1 = exp(-y1*y1 * 130.0);
    float band2 = exp(-y2*y2 * 130.0);
    float band3 = exp(-y3*y3 * 130.0);
    float streams = band1 + band2 + band3;
    streams *= 1.0 - smoothstep(cvg.x, cvg.x + 0.14, p.x);
    streams *= smoothstep(-0.52, -0.36, p.x);

    float beamCore = exp(-p.y*p.y * 220.0);
    float beamHalo = exp(-p.y*p.y * 30.0) * 0.38;
    float beam = beamCore + beamHalo;
    beam *= smoothstep(cvg.x - 0.02, cvg.x + 0.14, p.x);
    beam *= 1.0 - smoothstep(0.62, 0.95, p.x);

    float envelope = streams + beam;

    float turb1 = fbm(vec2(p.x*6.0 - t*1.2,         y1*9.5 + fbm(vec2(p.x*3.5 - t,       y1*4.5))));
    float turb2 = fbm(vec2(p.x*6.0 - t*1.5 + 11.0,  y2*9.5 + fbm(vec2(p.x*3.5 - t*1.1,   y2*4.5))));
    float turb3 = fbm(vec2(p.x*6.0 - t*1.7 + 23.0,  y3*9.5 + fbm(vec2(p.x*3.5 - t*0.9,   y3*4.5))));
    float turbMix = turb1*band1 + turb2*band2 + turb3*band3;

    float lamin = fbm(vec2(p.x*2.3 - t*2.6, p.y*16.0 + fbm(vec2(p.x*1.0 - t*1.6, p.y*6.5))));
    float laminField = lamin * beam;

    float xMix = smoothstep(cvg.x - 0.01, cvg.x + 0.08, p.x);
    float flow = mix(turbMix, laminField, xMix);

    float field = envelope * flow;
    float bright = smoothstep(0.08, 0.80, field);
    float schlieren = exp(-30.0 * pow(flow - 0.5, 2.0)) * envelope * 0.50;

    vec3 tint1 = vec3(0.86, 0.92, 1.02);
    vec3 tint2 = vec3(0.96, 0.96, 0.96);
    vec3 tint3 = vec3(1.02, 0.94, 0.84);
    float totalBand = band1 + band2 + band3 + 1e-5;
    vec3 streamTint = (tint1*band1 + tint2*band2 + tint3*band3) / totalBand;
    vec3 beamTint   = vec3(0.99, 0.96, 0.92);
    vec3 flowTint   = mix(streamTint, beamTint, xMix);

    vec3 col = vec3(0.038, 0.038, 0.044);
    col += flowTint * bright * 1.00;
    col += vec3(1.00, 0.98, 0.95) * schlieren;

    float railY = mix(0.013, sep0 + 0.055, bend);
    float railFadeIn  = smoothstep(-0.30, -0.08, p.x);
    float railFadeOut = 1.0 - smoothstep(cvg.x - 0.015, cvg.x + 0.08, p.x);
    float railVisible = railFadeIn * railFadeOut;
    float dTop = p.y - railY;
    float dBot = p.y + railY;
    float railLine = (exp(-dTop*dTop * 90000.0) + exp(-dBot*dBot * 90000.0)) * railVisible;
    col += vec3(1.00, 0.97, 0.93) * railLine * 0.95;
    float railHalo = (exp(-dTop*dTop * 2200.0) + exp(-dBot*dBot * 2200.0)) * railVisible;
    col += vec3(1.00, 0.42, 0.18) * railHalo * 0.08;

    float ringR = 0.040;
    float ringDist = abs(cvgDist - ringR);
    float ring = exp(-ringDist*ringDist * 56000.0);
    ring *= 1.0 - smoothstep(0.015, 0.055, p.x - cvg.x) * 0.55;
    col += vec3(1.00, 0.46, 0.20) * ring * 0.78;

    vec2 tickTop = cvg + vec2(0.0,  ringR);
    vec2 tickBot = cvg + vec2(0.0, -ringR);
    float tTop = length(p - tickTop);
    float tBot = length(p - tickBot);
    col += vec3(1.00, 0.98, 0.95) * (exp(-tTop*tTop * 90000.0) + exp(-tBot*tBot * 90000.0)) * 0.55;

    float hotMod = 1.0 + 0.08 * sin(u_time * 0.65);
    float hot = exp(-cvgDist * 12.0) * 0.58 * hotMod;
    col += vec3(1.00, 0.34, 0.13) * hot;
    col += vec3(1.00, 0.34, 0.13) * exp(-cvgDist * 2.9) * 0.085;
    col += vec3(0.90, 1.00, 0.00) * exp(-cvgDist * 56.0) * 0.42;

    vec2 vp = (gl_FragCoord.xy / u_res) - 0.5;
    float vig = smoothstep(1.1, 0.3, length(vp * vec2(aspect*0.75, 1.0)) * 1.32);
    col *= vig * 0.88 + 0.12;

    float grain = hash(gl_FragCoord.xy + mod(u_time, 100.0) * 0.1) - 0.5;
    col += grain * 0.020;

    col = col / (1.0 + col * 0.45);
    col = pow(col, vec3(0.92));

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ResultantHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      premultipliedAlpha: false,
      alpha: false,
    });
    if (!gl) return;

    const ext = gl.getExtension('OES_standard_derivatives');
    const derivPragma = ext ? '#extension GL_OES_standard_derivatives : enable\n' : '';

    const vertSrc = 'attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }';
    const fragSrc = derivPragma + HERO_FRAG;

    const compile = (type: number, src: string): WebGLShader | null => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error('[ResultantHero] shader compile:', gl.getShaderInfoLog(sh));
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
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.error('[ResultantHero] program link:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
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
    <section className="rs-hero" aria-label="Hero">
      <canvas ref={canvasRef} className="rs-hero__canvas" aria-hidden="true" />
      <div className="rs-hero__scrim" aria-hidden="true" />

      <div className="rs-hero__frame">
        <ResultantNav />

        <div className="rs-hero__body">
          <div>
            <p className="rs-copy__eyebrow">B2B Authority &amp; Visibility Agency</p>
            <h1 className="rs-copy__h1">
              Impossible<br />to ignore.
            </h1>
            <p className="rs-copy__sub">Connected marketing. Amplified impact.</p>
            <p className="rs-copy__body">
              Sapient Digital brings digital PR, strategic content, and search visibility
              together in one accountable marketing engagement — so your market encounters a
              credible, consistent picture of who you are.
            </p>
            <div className="rs-copy__ctas">
              <a
                className="rs-btn rs-btn--primary"
                href="/contact"
                data-track="cta_click"
                data-cta-name="talk_strategy"
                data-cta-location="hero"
              >
                Talk Strategy →
              </a>
              <a
                className="rs-btn rs-btn--ghost"
                href="/approach"
                data-track="cta_click"
                data-cta-name="open_framework"
                data-cta-location="hero"
              >
                The Resultant Framework<sup className="rs-tm">™</sup>&nbsp;↗
              </a>
            </div>
          </div>

          <aside className="rs-ann" aria-hidden="true">
            <div className="rs-ann__tag">
              <span>Scene 01 · Wind Tunnel</span>
              <span>Resultant</span>
            </div>
            <div className="rs-ann__list">
              <div className="rs-ann__item rs-ann__item--s1">
                <span className="rs-ann__dot" />
                <span className="rs-ann__label">Stream 01</span>
                <span className="rs-ann__value">Digital PR</span>
              </div>
              <div className="rs-ann__item rs-ann__item--s2">
                <span className="rs-ann__dot" />
                <span className="rs-ann__label">Stream 02</span>
                <span className="rs-ann__value">Strategic Content</span>
              </div>
              <div className="rs-ann__item rs-ann__item--s3">
                <span className="rs-ann__dot" />
                <span className="rs-ann__label">Stream 03</span>
                <span className="rs-ann__value">Search &amp; AI Visibility</span>
              </div>
              <div className="rs-ann__item rs-ann__item--signal">
                <span className="rs-ann__dot" />
                <span className="rs-ann__label">Aperture</span>
                <span className="rs-ann__value">The Resultant</span>
              </div>
              <div className="rs-ann__item">
                <span className="rs-ann__dot" />
                <span className="rs-ann__label">Output</span>
                <span className="rs-ann__value">Authority</span>
              </div>
            </div>
          </aside>
        </div>

        <div className="rs-footstrip">
          <div className="rs-foot__item">
            <div className="rs-foot__num">01 — Earn</div>
            <div className="rs-foot__title">Digital PR</div>
            <div className="rs-foot__sub">
              Make expertise newsworthy. Pursue credible, independent recognition in publications
              buyers already trust.
            </div>
          </div>
          <div className="rs-foot__item">
            <div className="rs-foot__num">02 — Build</div>
            <div className="rs-foot__title">Strategic Content</div>
            <div className="rs-foot__sub">
              Turn expertise into a defensible point of view — thought leadership journalists and
              buyers cite.
            </div>
          </div>
          <div className="rs-foot__item">
            <div className="rs-foot__num">03 — Find</div>
            <div className="rs-foot__title">Search &amp; AI Visibility</div>
            <div className="rs-foot__sub">
              Be discoverable when buyers investigate — in traditional search and in AI-assisted
              research.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
