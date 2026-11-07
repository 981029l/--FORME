"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type * as Three from "three";
import { content as c, type Film } from "./content";

export type SceneHandle = { step: (direction: number) => void; goTo: (index: number) => void; flip: () => void };
type Props = { initialIndex: number; paused: boolean; enabled: boolean; onChange: (index: number) => void; onFlip: (flipped: boolean) => void; onReady: (webgl: boolean) => void; onOpen: (index: number) => void };
const wrap = (value: number, size: number) => ((value % size) + size) % size;

function drawCover(film: Film, photo: HTMLImageElement) {
  const size = c.scene.textureSize;
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = film.color; ctx.fillRect(0, 0, size, size);
  const ratio = Math.max(size / photo.naturalWidth, size / photo.naturalHeight);
  ctx.drawImage(photo, (size - photo.naturalWidth * ratio) / 2, (size - photo.naturalHeight * ratio) / 2, photo.naturalWidth * ratio, photo.naturalHeight * ratio);
  const shade = ctx.createLinearGradient(0, 0, size * .8, size);
  shade.addColorStop(0, "rgba(0,0,0,.06)"); shade.addColorStop(.48, "rgba(0,0,0,.08)"); shade.addColorStop(1, film.color);
  ctx.fillStyle = shade; ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = film.ink; ctx.textAlign = "left";
  ctx.font = "500 28px 'Microsoft YaHei', sans-serif"; ctx.fillText(film.title, size * .18, size * .65);
  ctx.font = "bold 86px Georgia, serif";
  film.english.split("\n").forEach((line, index) => ctx.fillText(line, size * .16, size * (.755 + index * .084), size * .75));
  ctx.textAlign = "center"; ctx.font = "bold 29px Georgia, serif"; ctx.fillText(c.wordmark, size * .5, size * .925);
  const arc = `${c.wordmark}   /   ${film.year}   /   ${film.label}   /   ORIGINAL CONCEPT COLLECTION`;
  ctx.font = "11px Arial, sans-serif";
  [...arc].forEach((letter, index) => { const angle = -.99 + index / (arc.length - 1) * 1.98; ctx.save(); ctx.translate(size / 2, size / 2); ctx.rotate(angle); ctx.translate(0, -size * .461); ctx.fillText(letter, 0, 0); ctx.restore(); });
  return canvas;
}

const backVertex = `varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
void main(){vUv=uv;vec4 p=modelViewMatrix*vec4(position,1.);vNormal=normalize(normalMatrix*normal);vView=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`;
const backFragment = `varying vec2 vUv; varying vec3 vNormal; varying vec3 vView; uniform vec2 uPointer;
void main(){vec2 p=vUv*2.-1.;float r=length(p);float a=atan(p.y,p.x);float facing=abs(dot(normalize(vNormal),normalize(vView)));float angle=a+uPointer.x*.42+uPointer.y*.23+(1.-facing)*3.;float light=.42+.38*pow(abs(cos(angle-.35)),5.);float grooves=sin(r*1900.)*.018;vec3 spectrum=.5+.5*cos(vec3(0.,2.1,4.2)+angle*2.+r*5.);vec3 silver=vec3(light)+spectrum*.19;float beam=pow(max(0.,cos(angle*2.-.8)),32.);silver+=vec3(.38,.40,.43)*beam;silver-=smoothstep(.2,.96,r)*.09;gl_FragColor=vec4(silver+grooves,1.);}`;

export const DiscScene = forwardRef<SceneHandle, Props>(function DiscScene(props, ref) {
  const hostRef = useRef<HTMLDivElement>(null);
  const live = useRef(props); live.current = props;
  const api = useRef<SceneHandle | null>(null);
  const wakeRef = useRef<() => void>(() => {});
  useImperativeHandle(ref, () => ({ step: direction => api.current?.step(direction), goTo: index => api.current?.goTo(index), flip: () => api.current?.flip() }), []);
  useEffect(() => { wakeRef.current(); }, [props.paused, props.enabled]);
  useEffect(() => {
    const host = hostRef.current!;
    const size = c.films.length;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = { current: live.current.initialIndex, target: live.current.initialIndex, active: live.current.initialIndex, flip: c.films.map(() => 0), flipTarget: c.films.map(() => 0), width: 1, height: 1, pointerX: 0, pointerY: 0, tiltX: 0, tiltY: 0, hover: -1, dragging: false, dragStart: 0, dragTarget: 0, dragLast: 0, dragTime: 0, speed: 0, moved: false, lastTime: 0, frames: 0, visible: true, loadedAt: 0 };
    let disposed = false, lost = false, ready = false, frame = 0, snapTimer = 0;
    let render: ((time: number) => void) | null = null;
    let renderer: Three.WebGLRenderer | null = null;
    let resizeScene: (() => void) | null = null;
    let pick: ((x: number, y: number) => number) | null = null;
    const resources = new Set<{ dispose: () => void }>();
    const remember = <T extends { dispose: () => void }>(resource: T) => { resources.add(resource); return resource; };
    function wake() { if (!disposed && !lost && state.visible && !document.hidden && !frame && render) frame = requestAnimationFrame(render); }
    wakeRef.current = wake;
    function announce() {
      const index = wrap(Math.round(state.current), size);
      host.dataset.position = state.current.toFixed(3); host.dataset.index = String(index);
      if (state.active !== index) { state.active = index; live.current.onChange(index); live.current.onFlip(state.flipTarget[index] > 1); }
    }
    function moveTo(target: number) {
      state.target = target;
      if (!ready || motion.matches || live.current.paused) { state.current = target; announce(); }
      wake();
    }
    api.current = {
      step(direction) { moveTo(Math.round(state.target) + direction); },
      goTo(index) { let distance = wrap(index - wrap(Math.round(state.target), size) + size / 2, size) - size / 2; moveTo(Math.round(state.target) + distance); },
      flip() { const index = wrap(Math.round(state.current), size); state.flipTarget[index] = state.flipTarget[index] > 1 ? 0 : Math.PI; live.current.onFlip(state.flipTarget[index] > 1); host.dataset.flipped = String(state.flipTarget[index] > 1); wake(); }
    };
    function wheel(event: WheelEvent) {
      if (!live.current.enabled || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const pixels = delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? state.height : 1);
      moveTo(state.target + Math.max(-150, Math.min(150, pixels)) * c.scene.wheelScale);
      window.clearTimeout(snapTimer); snapTimer = window.setTimeout(() => moveTo(Math.round(state.target)), c.scene.snapDelay);
    }
    function pointerDown(event: PointerEvent) {
      if (!live.current.enabled || event.button !== 0) return;
      window.clearTimeout(snapTimer); state.dragging = true; state.dragStart = event.clientX; state.dragTarget = state.target; state.dragLast = state.target; state.dragTime = performance.now(); state.speed = 0; state.moved = false;
      host.setPointerCapture(event.pointerId); host.dataset.dragging = "true";
    }
    function pointerMove(event: PointerEvent) {
      const rect = host.getBoundingClientRect(); state.pointerX = (event.clientX - rect.left) / rect.width * 2 - 1; state.pointerY = (event.clientY - rect.top) / rect.height * 2 - 1;
      if (state.dragging) {
        const difference = event.clientX - state.dragStart; state.moved ||= Math.abs(difference) > 6;
        const target = state.dragTarget - difference / state.width * (state.width < 768 ? 1.6 : 2.5);
        const now = performance.now(); state.speed = (target - state.dragLast) / Math.max(.012, (now - state.dragTime) / 1000); state.dragLast = target; state.dragTime = now; moveTo(target);
      } else if (live.current.enabled) { state.hover = pick?.(event.clientX, event.clientY) ?? -1; }
      wake();
    }
    function pointerUp(event: PointerEvent) {
      if (!state.dragging) return;
      state.dragging = false; host.dataset.dragging = "false";
      if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
      if (state.moved) moveTo(Math.round(state.target + Math.max(-1, Math.min(1, state.speed * .12))));
      else { const index = pick?.(event.clientX, event.clientY) ?? state.active; if (index >= 0) { if (index === state.active) api.current?.flip(); else api.current?.goTo(index); } }
    }
    function pointerCancel() { state.dragging = false; host.dataset.dragging = "false"; moveTo(Math.round(state.target)); }
    function leave() { if (!state.dragging) { state.hover = -1; state.pointerX = state.pointerY = 0; wake(); } }
    function doubleClick(event: MouseEvent) { if (live.current.enabled && (pick?.(event.clientX, event.clientY) ?? state.active) === state.active) live.current.onOpen(state.active); }
    function visibility() { if (document.hidden || !state.visible) { cancelAnimationFrame(frame); frame = 0; } else { state.lastTime = 0; wake(); } }
    function contextLost(event: Event) { event.preventDefault(); lost = true; ready = false; cancelAnimationFrame(frame); frame = 0; host.dataset.renderer = "fallback"; live.current.onReady(false); }
    host.addEventListener("wheel", wheel, { passive: false }); host.addEventListener("pointerdown", pointerDown); host.addEventListener("pointermove", pointerMove); host.addEventListener("pointerup", pointerUp); host.addEventListener("pointercancel", pointerCancel); host.addEventListener("pointerleave", leave); host.addEventListener("dblclick", doubleClick);
    document.addEventListener("visibilitychange", visibility); motion.addEventListener("change", wake);
    const observer = new IntersectionObserver(entries => { state.visible = entries[0].isIntersecting; visibility(); }); observer.observe(host);
    const resize = new ResizeObserver(() => { resizeScene?.(); wake(); }); resize.observe(host);
    async function initialize() {
      try {
        const THREE = await import("three"); if (disposed) return;
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, c.scene.maxDpr)); renderer.setClearColor(c.scene.background, 0); renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true"); renderer.domElement.addEventListener("webglcontextlost", contextLost); host.appendChild(renderer.domElement);
        const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(32, 1, .1, 60); camera.position.z = 8;
        scene.add(new THREE.AmbientLight(0xffffff, 1.0)); const key = new THREE.DirectionalLight(0xffffff, 1.2); key.position.set(-3, 4, 6); scene.add(key);
        const fill = new THREE.DirectionalLight(0xc2d8ff, .6); fill.position.set(4, -2, 3); scene.add(fill);
        const faceGeometry = remember(new THREE.RingGeometry(.211, .992, c.scene.segments));
        const rimGeometry = remember(new THREE.RingGeometry(.991, 1, c.scene.segments));
        const hubGeometry = remember(new THREE.RingGeometry(.126, .213, c.scene.segments));
        const innerGeometry = remember(new THREE.RingGeometry(.126, .145, c.scene.segments));
        const outerHubGeometry = remember(new THREE.RingGeometry(.191, .213, c.scene.segments));
        const rimMaterial = remember(new THREE.MeshPhongMaterial({ color: 0xadb0b2, specular: 0xffffff, shininess: 110, side: THREE.DoubleSide }));
        const hubMaterial = remember(new THREE.MeshPhongMaterial({ color: 0x969da6, specular: 0xffffff, shininess: 130, side: THREE.DoubleSide }));
        const innerMaterial = remember(new THREE.MeshBasicMaterial({ color: 0xa2a5ab, side: THREE.DoubleSide }));
        const edgeGeometry = remember(new THREE.TorusGeometry(.997, .005, 5, c.scene.segments));
        const backMaterial = remember(new THREE.ShaderMaterial({ vertexShader: backVertex, fragmentShader: backFragment, uniforms: { uPointer: { value: new THREE.Vector2() } } }));
        const lineMaterial = remember(new THREE.LineBasicMaterial({ color: 0x242424, transparent: true, opacity: .75 }));
        const lineGeometries = [0, 1].map(line => remember(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 100 }, (_, i) => { const a = i / 100 * Math.PI * 2; const radius = 1.04 + line * .022 + Math.sin(a * 3 + line) * .007 + Math.cos(a * 7) * .003; return new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, .019); }))));
        const items: { group: Three.Group; disc: Three.Group; rings: Three.Group; hit: Three.Mesh }[] = [];
        const images = await Promise.all(c.films.map(film => new Promise<HTMLImageElement>((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = film.image; })));
        await document.fonts.ready; if (disposed) return;
        c.films.forEach((film, index) => {
          const group = new THREE.Group(), disc = new THREE.Group(), rings = new THREE.Group();
          const texture = remember(new THREE.CanvasTexture(drawCover(film, images[index]))); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(4, renderer!.capabilities.getMaxAnisotropy());
          const front = new THREE.Mesh(faceGeometry, remember(new THREE.MeshBasicMaterial({ map: texture }))); front.position.z = .007; front.userData.index = index; disc.add(front);
          const back = new THREE.Mesh(faceGeometry, backMaterial); back.rotation.y = Math.PI; back.position.z = -.007; back.userData.index = index; disc.add(back);
          const rim = new THREE.Mesh(rimGeometry, rimMaterial); rim.position.z = .009; disc.add(rim);
          const hub = new THREE.Mesh(hubGeometry, hubMaterial); hub.position.z = .012; disc.add(hub);
          const inner = new THREE.Mesh(innerGeometry, innerMaterial); inner.position.z = .014; disc.add(inner);
          const outerHub = new THREE.Mesh(outerHubGeometry, innerMaterial); outerHub.position.z = .013; disc.add(outerHub);
          const backHub = hub.clone(); backHub.position.z = -.012; disc.add(backHub);
          disc.add(new THREE.Mesh(edgeGeometry, rimMaterial));
          lineGeometries.forEach(geometry => rings.add(new THREE.LineLoop(geometry, lineMaterial))); rings.visible = false;
          group.add(disc, rings); scene.add(group); items.push({ group, disc, rings, hit: front });
        });
        const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
        pick = (x, y) => { const bounds = host.getBoundingClientRect(); pointer.set((x - bounds.left) / bounds.width * 2 - 1, -(y - bounds.top) / bounds.height * 2 + 1); raycaster.setFromCamera(pointer, camera); const hit = raycaster.intersectObjects(items.filter(item => item.group.visible).map(item => item.disc), true).find(hit => typeof hit.object.userData.index === "number"); return hit ? hit.object.userData.index as number : -1; };
        resizeScene = () => { if (!renderer || lost) return; state.width = host.clientWidth; state.height = host.clientHeight; camera.aspect = state.width / state.height; camera.updateProjectionMatrix(); renderer.setSize(state.width, state.height); };
        resizeScene(); state.loadedAt = performance.now();
        render = time => {
          frame = 0; if (disposed || lost || !renderer || document.hidden || !state.visible) return;
          const dt = Math.min(.05, state.lastTime ? (time - state.lastTime) / 1000 : .016); state.lastTime = time;
          const still = motion.matches || live.current.paused;
          const alpha = still ? 1 : 1 - Math.exp(-c.scene.damping * dt);
          state.current += (state.target - state.current) * alpha;
          state.tiltX += (state.pointerX - state.tiltX) * alpha; state.tiltY += (state.pointerY - state.tiltY) * alpha;
          if (Math.abs(state.target - state.current) < .0001) state.current = state.target;
          const mobile = state.width < 768, unit = 2 * camera.position.z * Math.tan(16 * Math.PI / 180) / state.height;
          const diameter = mobile ? state.width * c.scene.mobileDiameter : Math.min(state.width * c.scene.desktopWidth, state.height * c.scene.desktopDiameter);
          const intro = still ? 1 : 1 - Math.pow(1 - Math.min(1, (time - state.loadedAt) / c.scene.introDuration), 3);
          const idle = still ? 0 : Math.sin(time * .00055) * c.scene.idleAmplitude;
          items.forEach((item, index) => {
            state.flip[index] += (state.flipTarget[index] - state.flip[index]) * (still ? 1 : 1 - Math.exp(-c.scene.flipDamping * dt));
            if (Math.abs(state.flip[index] - state.flipTarget[index]) < .0001) state.flip[index] = state.flipTarget[index];
            const distance = wrap(index - state.current + size / 2, size) - size / 2;
            item.group.visible = Math.abs(distance) < 2.3;
            if (!item.group.visible) return;
            const neighborScale = mobile ? 1 - Math.min(1, Math.abs(distance)) * .58 : Math.max(.55, 1 + distance * .13);
            const scale = diameter * unit / 2 * neighborScale; item.group.scale.setScalar(scale);
            item.group.position.set((distance * state.width * (mobile ? .61 : c.scene.track.x + distance * c.scene.track.xCurve) + (mobile ? 0 : state.width * c.scene.track.centerX)) * unit + (1 - intro) * state.width * unit * .8, (mobile ? -Math.abs(distance) * state.height * .10 : distance * state.height * (c.scene.track.y + distance * c.scene.track.yCurve)) * unit + idle, mobile ? 0 : distance * .16);
            item.group.rotation.set(c.scene.pose.x + (still ? 0 : state.tiltY * .055), c.scene.pose.y + distance * .035 + (still ? 0 : state.tiltX * .055), c.scene.pose.z + idle * .35);
            item.disc.rotation.y = state.flip[index];
            item.rings.visible = live.current.enabled && Math.abs(distance) < .16 && (mobile || state.hover === index);
          });
          backMaterial.uniforms.uPointer.value.set(still ? 0 : state.tiltX, still ? 0 : state.tiltY);
          renderer.render(scene, camera); state.frames++; host.dataset.frames = String(state.frames); host.dataset.paused = String(still); announce();
          const moving = Math.abs(state.current - state.target) > .0001 || state.flip.some((value, index) => Math.abs(value - state.flipTarget[index]) > .0001);
          if (!still || moving || intro < 1) wake();
        };
        ready = true; host.dataset.renderer = "webgl"; host.dataset.index = String(state.active); live.current.onReady(true); wake();
      } catch { if (!disposed) { ready = false; host.dataset.renderer = "fallback"; live.current.onReady(false); } }
    }
    initialize();
    return () => {
      disposed = true; api.current = null; wakeRef.current = () => {}; cancelAnimationFrame(frame); window.clearTimeout(snapTimer); observer.disconnect(); resize.disconnect();
      host.removeEventListener("wheel", wheel); host.removeEventListener("pointerdown", pointerDown); host.removeEventListener("pointermove", pointerMove); host.removeEventListener("pointerup", pointerUp); host.removeEventListener("pointercancel", pointerCancel); host.removeEventListener("pointerleave", leave); host.removeEventListener("dblclick", doubleClick); document.removeEventListener("visibilitychange", visibility); motion.removeEventListener("change", wake);
      renderer?.domElement.removeEventListener("webglcontextlost", contextLost); resources.forEach(resource => resource.dispose()); renderer?.dispose(); renderer?.domElement.remove();
    };
  }, []);
  return <div className="re-scene" ref={hostRef} aria-hidden="true" />;
});
