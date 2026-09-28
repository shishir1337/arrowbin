"use client";

import { useRef } from "react";
import { useIdleEffect } from "@/lib/useIdleEffect";

/**
 * Liquid-chrome WebGL field for the hero: domain-warped noise poured into an
 * organic blob of ultraviolet / plasma / sun with specular "chrome" banding. The
 * blob leans toward the pointer. Renders at reduced resolution, pauses offscreen,
 * draws a single still frame for reduced motion, and falls back to CSS if WebGL
 * is unavailable (the parent keeps a gradient behind the canvas).
 */

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uMobile;
vec3 perm(vec3 x){return mod(((x*34.)+1.)*x,289.);}
float noise(vec2 v){const vec4 C=vec4(.211324865,.366025404,-.577350269,.024390244);
vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);
vec3 pp=perm(perm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;
vec3 x=2.*fract(pp*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;
m*=1.79284291-.85373472*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
return 130.*dot(m,g);}
float fbm(vec2 p){float f=0.,a=.5;for(int i=0;i<3;i++){f+=a*noise(p);p*=2.;a*=.5;}return f;}
vec3 pal(float x){
  vec3 ultra=vec3(.231,.169,1.);vec3 plasma=vec3(1.,.302,.651);
  vec3 sun=vec3(1.,.824,.247);vec3 lilac=vec3(.78,.74,1.);
  x=fract(x)*4.;
  if(x<1.)return mix(ultra,plasma,smoothstep(0.,1.,x));
  if(x<2.)return mix(plasma,sun,smoothstep(1.,2.,x));
  if(x<3.)return mix(sun,lilac,smoothstep(2.,3.,x));
  return mix(lilac,ultra,smoothstep(3.,4.,x));
}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;float asp=uRes.x/uRes.y;
  vec2 p=vec2(uv.x*asp,uv.y);
  float t=uTime*.12;
  vec2 m=vec2(uMouse.x*asp,uMouse.y);
  // gentle domain warp for a liquid silhouette
  vec2 w=vec2(noise(p*1.1+vec2(t,-t*.7)),noise(p*1.1+vec2(3.1-t*.8,1.7+t)));
  vec2 p2=p+w*.12;
  vec2 c=mix(vec2(.7*asp,.54),vec2(.55*asp,.44),uMobile);
  c+=(m-c)*.12;
  vec2 dv=(p2-c)*vec2(1.,1.08);
  float d=length(dv);
  float rad=mix(.4,.2,uMobile)+.035*sin(uTime*.5);
  float mask=smoothstep(rad+.006,rad-.006,d);
  // dome height -> fake normal for iridescent shading
  float h=clamp(1.-d/rad,0.,1.);
  float n=fbm(p2*1.6+t*.8);
  float param=h*.9+n*.9+dot(normalize(dv+1e-4),vec2(.35,.25))*.35+t*.25+(m.x-c.x)*.3;
  vec3 col=pal(param);
  // chrome banding + specular
  float band=pow(max(0.,sin(param*12.566)),10.);
  col=mix(col,vec3(1.),band*.45);
  vec2 lp=c+vec2(-.12,.14)*rad*2.2;
  float spec=pow(smoothstep(rad*.7,0.,length(p2-lp)),3.);
  col=mix(col,vec3(1.),spec*.55);
  // rim darkening for depth
  col*=mix(.82,1.,smoothstep(0.,.35,h));
  vec3 bg=vec3(.945,.949,.969);
  vec3 outc=mix(bg,col,mask);
  // soft coloured shadow/halo
  float halo=smoothstep(rad+.28,rad,d)*(1.-mask);
  outc=mix(outc,pal(param+.25),halo*.18);
  gl_FragColor=vec4(outc,1.);
}`;

export function LiquidCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  // Shader compile + first frame run in idle time, so they never block the
  // page from becoming interactive; the CSS gradient behind covers the gap and
  // the canvas fades in once it has drawn.
  useIdleEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      canvas.style.display = "none";
      return;
    }
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      canvas.style.display = "none";
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    // biome-ignore lint/correctness/useHookAtTopLevel: WebGL API, not a React hook.
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uMobile = gl.getUniformLocation(prog, "uMobile");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mouse = { x: 0.7, y: 0.55, tx: 0.7, ty: 0.55 };
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const scale =
        Math.min(window.devicePixelRatio, 1.5) *
        (canvas.clientWidth < 768 ? 0.55 : 0.85);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uMobile, w < 1024 ? 1 : 0);
    };
    // Phones render the (slow-moving) liquid at 30fps to spare GPU and battery.
    const lowPower = window.matchMedia("(pointer: coarse)").matches;
    let odd = false;
    const frame = (now: number) => {
      odd = !odd;
      if (lowPower && odd && !reduced) {
        if (visible) raf = requestAnimationFrame(frame);
        return;
      }
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uTime, (now - start) / 1000 + 12);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(frame);
    });

    resize();
    frame(start);
    canvas.style.opacity = "1";
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  });

  return (
    <canvas
      ref={ref}
      className={`opacity-0 transition-opacity duration-700 ${className}`}
    />
  );
}
