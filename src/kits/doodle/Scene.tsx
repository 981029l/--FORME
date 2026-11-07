"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { content as c } from "./content";

export type SceneHandle = { plant: () => void; reset: () => void };
type Person = { x: number; y: number; angle: number; speed: number; phase: number; kind: number; scale: number; seed: number };
type Flower = { x: number; y: number; time: number; seed: number };
type Engine = SceneHandle & { pause: (value: boolean) => void; crowd: (count: number) => void };
const palette = c.scene.palette;
const random = (seed: number) => { const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n); };

function person(ctx: CanvasRenderingContext2D, p: Person, time: number, width: number, height: number) {
  const x = p.x * width, y = p.y * height, s = p.scale * (width < c.scene.mobileBreakpoint ? .73 : 1), facing = Math.cos(p.angle) < 0 ? -1 : 1;
  const stride = Math.sin(time * p.speed * 12 + p.phase), bob = Math.abs(stride) * 1.7;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = palette.shadow;
  ctx.beginPath(); ctx.ellipse(13, 2, 19, 4.4, -.3, 0, Math.PI * 2); ctx.fill();
  ctx.scale(facing, 1); ctx.translate(0, -bob); ctx.strokeStyle = palette.ink; ctx.lineWidth = 1.55; ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.fillStyle = palette.paper;
  ctx.beginPath(); ctx.moveTo(-5, -15); ctx.lineTo(-5 + stride * 5, -5); ctx.quadraticCurveTo(-10 + stride * 5, -3, -9 + stride * 5, 0); ctx.quadraticCurveTo(-4 + stride * 5, 3, -1 + stride * 5, 0); ctx.lineTo(2, -13); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(4, -15); ctx.lineTo(6 - stride * 5, -4); ctx.quadraticCurveTo(12 - stride * 5, -2, 11 - stride * 5, 1); ctx.quadraticCurveTo(6 - stride * 5, 3, 3 - stride * 5, 0); ctx.lineTo(-2, -14); ctx.fill(); ctx.stroke();
  ctx.fillStyle = p.kind === 2 ? palette.yellow : p.kind === 1 ? palette.ink : palette.paper;
  ctx.beginPath(); ctx.moveTo(-5, -31); ctx.quadraticCurveTo(-13, -29, -11, -20); ctx.lineTo(-8, -12); ctx.quadraticCurveTo(0, -9, 8, -13); ctx.lineTo(8, -25); ctx.quadraticCurveTo(7, -31, 3, -32); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = palette.paper;
  ctx.beginPath(); ctx.moveTo(-9, -27); ctx.quadraticCurveTo(-15, -19, -9 + stride * 2, -16); ctx.quadraticCurveTo(-5, -17, -8, -21); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(7, -27); ctx.quadraticCurveTo(11, -22, 10 - stride * 3, -17); ctx.quadraticCurveTo(7, -15, 6, -19); ctx.fill(); ctx.stroke();
  if (p.kind === 4) { ctx.beginPath(); ctx.moveTo(-8, -28); ctx.quadraticCurveTo(-18, -30, -16, -17); ctx.lineTo(-10, -16); ctx.closePath(); ctx.fillStyle = palette.yellow; ctx.fill(); ctx.stroke(); }
  if (p.kind === 3) { ctx.lineWidth = 1; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-9, -25 + i * 4); ctx.lineTo(7, -25 + i * 4); ctx.stroke(); } ctx.lineWidth = 1.55; }
  ctx.fillStyle = palette.paper;
  ctx.beginPath(); ctx.moveTo(-6, -33); ctx.bezierCurveTo(-12, -39, -6, -50, 2, -47); ctx.quadraticCurveTo(9, -46, 8, -39); ctx.lineTo(11, -36); ctx.lineTo(7, -34); ctx.quadraticCurveTo(4, -29, -2, -32); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = palette.ink;
  if (p.kind === 0 || p.kind === 1 || p.kind === 4) { ctx.beginPath(); ctx.moveTo(-7, -35); ctx.bezierCurveTo(-15, -47, -1, -53, 7, -46); ctx.quadraticCurveTo(12, -39, 1, -42); ctx.lineTo(-2, -37); ctx.lineTo(-7, -35); ctx.fill(); }
  if (p.kind === 2) { ctx.beginPath(); ctx.moveTo(-10, -43); ctx.quadraticCurveTo(-7, -51, 4, -47); ctx.lineTo(8, -42); ctx.quadraticCurveTo(17, -40, 11, -39); ctx.lineTo(-10, -41); ctx.closePath(); ctx.fillStyle = palette.yellow; ctx.fill(); ctx.stroke(); }
  if (p.kind === 5) { ctx.beginPath(); ctx.moveTo(-9, -44); ctx.quadraticCurveTo(-12, -51, -6, -50); ctx.quadraticCurveTo(-8, -56, -1, -52); ctx.quadraticCurveTo(4, -57, 8, -49); ctx.lineTo(6, -43); ctx.closePath(); ctx.fill(); }
  ctx.beginPath(); ctx.arc(5, -39, .8, 0, Math.PI * 2); ctx.fillStyle = palette.ink; ctx.fill();
  ctx.strokeStyle = palette.ink; ctx.globalAlpha = .3; ctx.lineWidth = .55; ctx.beginPath(); ctx.moveTo(-10, -27); ctx.quadraticCurveTo(-11, -18, -6, -12); ctx.moveTo(-5, -44); ctx.quadraticCurveTo(-9, -40, -5, -34); ctx.stroke();
  ctx.restore();
}

function flower(ctx: CanvasRenderingContext2D, f: Flower, width: number, height: number) {
  ctx.save(); ctx.translate(f.x * width, f.y * height); ctx.rotate((random(f.seed) - .5) * .2); ctx.lineWidth = 1.7; ctx.lineCap = "round"; ctx.strokeStyle = palette.ink;
  ctx.fillStyle = palette.shadow; ctx.beginPath(); ctx.ellipse(10, 4, 16, 4, -.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(4, -16, 1, -32); ctx.moveTo(2, -13); ctx.quadraticCurveTo(18, -25, 15, -14); ctx.quadraticCurveTo(9, -9, 2, -13); ctx.moveTo(2, -20); ctx.quadraticCurveTo(-12, -31, -10, -19); ctx.quadraticCurveTo(-5, -16, 2, -20); ctx.stroke();
  ctx.fillStyle = palette.yellow; ctx.beginPath(); ctx.moveTo(-1, -34); ctx.bezierCurveTo(-16, -48, -9, -55, 1, -46); ctx.bezierCurveTo(7, -61, 17, -52, 10, -42); ctx.bezierCurveTo(28, -44, 26, -31, 11, -33); ctx.bezierCurveTo(18, -16, 5, -15, 2, -30); ctx.bezierCurveTo(-11, -18, -18, -31, -1, -34); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(4, -37, 5.4, 0, Math.PI * 2); ctx.fillStyle = palette.paper; ctx.fill(); ctx.stroke(); ctx.restore();
}

function bubble(ctx: CanvasRenderingContext2D, p: Person, text: string, width: number, height: number) {
  const scale = width < c.scene.mobileBreakpoint ? .88 : 1, x = p.x * width, y = p.y * height - p.scale * (width < c.scene.mobileBreakpoint ? 43 : 57);
  ctx.save(); ctx.font = `${12 * scale}px "Microsoft YaHei", sans-serif`; const w = ctx.measureText(text).width + 23, h = 27 * scale;
  const left = Math.max(8, Math.min(width - w - 8, x - w / 2)); ctx.translate(left, y - h); ctx.lineWidth = 1.8; ctx.strokeStyle = palette.ink; ctx.fillStyle = palette.paper;
  ctx.beginPath(); ctx.moveTo(11, 0); ctx.lineTo(w - 9, -1); ctx.quadraticCurveTo(w + 2, 0, w, 10); ctx.lineTo(w - 1, h - 8); ctx.quadraticCurveTo(w - 2, h, w - 11, h); ctx.lineTo(w / 2 + 5, h); ctx.lineTo(w / 2, h + 7); ctx.lineTo(w / 2 - 5, h); ctx.lineTo(8, h); ctx.quadraticCurveTo(-2, h - 1, 0, h - 10); ctx.lineTo(0, 8); ctx.quadraticCurveTo(1, 0, 11, 0); ctx.fill(); ctx.stroke(); ctx.fillStyle = palette.ink; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(text, w / 2, h / 2); ctx.restore();
}

export const RambleScene = forwardRef<SceneHandle, { paused: boolean; density: number; onMark: (count: number) => void; onReduced: (value: boolean) => void; onToggle: () => void }>(function RambleScene({ paused, density, onMark, onReduced, onToggle }, ref) {
  const canvas = useRef<HTMLCanvasElement>(null), engine = useRef<Engine | null>(null), callbacks = useRef({ onMark, onReduced });
  const [failed, setFailed] = useState(false);
  callbacks.current = { onMark, onReduced };
  useImperativeHandle(ref, () => ({ plant: () => engine.current?.plant(), reset: () => engine.current?.reset() }), []);
  useEffect(() => {
    const element = canvas.current; if (!element) return;
    const ctx = element.getContext("2d", { alpha: true }); if (!ctx) { setFailed(true); return; }
    let width = 1, height = 1, frame = 0, time = 0, last = 0, frames = 0, manualPause = paused, inView = true, count = c.scene.densities[density], people: Person[] = [], flowers: Flower[] = [], sequence = 0;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = media.matches;
    const isPaused = () => manualPause || reducedMotion || document.hidden || !inView;
    function safe(x: number, y: number) {
      if (width < c.scene.mobileBreakpoint) return y > .68 || (y > .39 && (x < .13 || x > .88));
      return (y > .56 || x > .83) && !(x > .44 && x < .80 && y < .73);
    }
    function create(index: number): Person {
      let x = .055 + random(index + 2) * .89, y = .37 + random(index + 132) * .51;
      if (!safe(x, y)) y = .73 + random(index + 782) * .16;
      return { x, y, angle: random(index + 322) * Math.PI * 2, speed: .42 + random(index + 98) * .4, phase: index * 1.8, kind: index % 6, scale: .58 + random(index + 75) * .27 + y * .22, seed: index };
    }
    function draw() {
      if (!ctx || !element) return;
      ctx.clearRect(0, 0, width, height); flowers.forEach(f => flower(ctx, f, width, height));
      [...people].sort((a, b) => a.y - b.y).forEach(p => person(ctx, p, time, width, height));
      const candidates = people.filter(p => p.y > .57 && p.y < .87 && p.x > .07 && p.x < .92 && (width >= c.scene.mobileBreakpoint || p.y > .70 || p.x > .58));
      const bubbleCount = width < c.scene.mobileBreakpoint ? 2 : 4;
      for (let i = 0; i < Math.min(bubbleCount, candidates.length); i++) { const p = candidates[(i * 9 + Math.floor(time / 8)) % candidates.length]; bubble(ctx, p, c.home.bubbles[(i + Math.floor(time / 8)) % c.home.bubbles.length], width, height); }
      element.dataset.frames = String(++frames); element.dataset.paused = String(isPaused()); element.dataset.people = String(people.length); element.dataset.marks = String(flowers.length);
    }
    function update(dt: number) {
      time += dt;
      for (const p of people) {
        const f = flowers.length ? flowers[(p.seed + flowers.length - 1) % flowers.length] : undefined;
        let angle = p.angle + Math.sin(time * .6 + p.phase) * .009;
        if (f && time - f.time < c.scene.attractSeconds) { const dx = f.x - p.x, dy = f.y - p.y; angle = Math.atan2(dy * height, dx * width); if (Math.hypot(dx * width, dy * height) < 30 + p.seed % 4 * 10) angle += Math.PI / 2; }
        const nx = p.x + Math.cos(angle) * p.speed * dt * 12 / width, ny = p.y + Math.sin(angle) * p.speed * dt * 9 / height;
        if (nx < .04 || nx > .96 || ny < .34 || ny > .91 || !safe(nx, ny)) p.angle += Math.PI * .81;
        else { p.x = nx; p.y = ny; p.angle = angle; }
      }
    }
    function loop(now: number) {
      frame = 0; if (isPaused()) return;
      if (!last) last = now;
      if (now - last >= 1000 / c.scene.framesPerSecond) { const dt = Math.min((now - last) / 1000, .07); last = now; update(dt); draw(); }
      frame = window.requestAnimationFrame(loop);
    }
    function sync() { window.cancelAnimationFrame(frame); frame = 0; last = 0; draw(); if (!isPaused()) frame = window.requestAnimationFrame(loop); }
    function resize() { const rect = element!.getBoundingClientRect(); width = rect.width; height = rect.height; const ratio = Math.min(window.devicePixelRatio || 1, c.scene.maxPixelRatio); element!.width = Math.round(width * ratio); element!.height = Math.round(height * ratio); ctx!.setTransform(ratio, 0, 0, ratio, 0, 0); people = Array.from({ length: count }, (_, i) => create(i)); sync(); }
    function plantAt(x: number, y: number) { const groundX = Math.max(.07, Math.min(.92, x)), groundY = Math.max(.54, Math.min(.86, y)); flowers.push({ x: groundX, y: safe(groundX, groundY) ? groundY : .76 + random(sequence + 15) * .09, time, seed: ++sequence }); if (flowers.length > c.scene.markLimit) flowers.shift(); callbacks.current.onMark(flowers.length); draw(); }
    function click(event: MouseEvent) { const rect = element!.getBoundingClientRect(); plantAt((event.clientX - rect.left) / width, (event.clientY - rect.top) / height); }
    function reduce(event: MediaQueryListEvent) { reducedMotion = event.matches; callbacks.current.onReduced(reducedMotion); sync(); }
    engine.current = { plant: () => plantAt(.16 + random(sequence + 611) * .65, .72 + random(sequence + 873) * .13), reset: () => { flowers = []; sequence = 0; time = 0; people = Array.from({ length: count }, (_, i) => create(i)); callbacks.current.onMark(0); sync(); }, pause: value => { manualPause = value; sync(); }, crowd: value => { count = value; people = Array.from({ length: count }, (_, i) => people[i] || create(i)); sync(); } };
    const observer = new ResizeObserver(resize); observer.observe(element);
    const visibility = new IntersectionObserver(entries => { inView = entries[0]?.isIntersecting ?? true; sync(); }, { threshold: .01 }); visibility.observe(element);
    element.addEventListener("click", click); document.addEventListener("visibilitychange", sync); media.addEventListener("change", reduce); callbacks.current.onReduced(reducedMotion); resize();
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect(); media.removeEventListener("change", reduce); document.removeEventListener("visibilitychange", sync); element.removeEventListener("click", click); engine.current = null; };
  }, []);
  useEffect(() => engine.current?.pause(paused), [paused]);
  useEffect(() => engine.current?.crowd(c.scene.densities[density]), [density]);
  return <><canvas ref={canvas} className="do-scene" role="button" tabIndex={0} aria-label={c.home.canvasLabel} aria-describedby="do-scene-help" data-frames="0" data-paused="false" data-people={c.scene.densities[density]} data-marks="0" onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); engine.current?.plant(); } else if (event.key === " ") { event.preventDefault(); onToggle(); } }}>{c.home.canvasLabel}</canvas>{failed && <p className="do-canvas-error" role="status">{c.home.fallback}</p>}</>;
});
