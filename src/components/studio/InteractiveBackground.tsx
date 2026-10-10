import React, { useEffect, useRef } from 'react';

const PAPER = '237 234 227';
const SPACING = 30;
const RADIUS = 170;
const IDLE_AFTER = 4000;

interface Ripple {
  x: number;
  y: number;
  start: number;
}

export function InteractiveBackground({ accent }: {accent: string;}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef(accent);
  accentRef.current = accent;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let frame = 0;
    let lastScroll = window.scrollY;
    let velocity = 0;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, lastMove: -Infinity };
    const ripples: Ripple[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 2;
      if (reduce) draw(0);
    };

    const draw = (time: number) => {
      const scroll = window.scrollY;
      velocity += (scroll - lastScroll - velocity) * 0.12;
      lastScroll = scroll;

      const idle = time - pointer.lastMove > IDLE_AFTER;
      if (idle && !reduce) {
        pointer.tx = width * (0.5 + 0.34 * Math.sin(time * 0.00031));
        pointer.ty = height * (0.5 + 0.3 * Math.sin(time * 0.00047 + 1.3));
      }
      const follow = idle ? 0.025 : 0.16;
      pointer.x += (pointer.tx - pointer.x) * follow;
      pointer.y += (pointer.ty - pointer.y) * follow;

      for (let r = ripples.length - 1; r >= 0; r--) {
        if (time - ripples[r].start > 1600) ripples.splice(r, 1);
      }

      const offset = scroll * 0.2 % SPACING;
      const swell = reduce ? 0 : 1.4 + Math.min(Math.abs(velocity), 60) * 0.1;
      const accentRgb = accentRef.current;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const bx = i * SPACING + SPACING / 2;
          const by = j * SPACING - offset;
          let x = bx;
          let y = by + Math.sin(time * 0.0009 + i * 0.32 + j * 0.21) * swell;
          let glow = 0;

          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < RADIUS) {
            const f = 1 - dist / RADIUS;
            const push = f * f * 22;
            x += dx / (dist || 1) * push;
            y += dy / (dist || 1) * push;
            glow = f * (idle ? 0.5 : 1);
          }

          for (const ripple of ripples) {
            const age = (time - ripple.start) / 1000;
            const front = age * 560;
            const rx = bx - ripple.x;
            const ry = by - ripple.y;
            const d = Math.sqrt(rx * rx + ry * ry);
            const band = Math.abs(d - front);
            if (band < 46) {
              const f = (1 - band / 46) * (1 - age / 1.6);
              if (f > 0) {
                x += rx / (d || 1) * f * 12;
                y += ry / (d || 1) * f * 12;
                glow = Math.max(glow, f);
              }
            }
          }

          const size = 1.2 + glow * 2.4;
          ctx.fillStyle =
          glow > 0.04 ? `rgb(${accentRgb} / ${(0.12 + glow * 0.7).toFixed(3)})` : `rgb(${PAPER} / 0.08)`;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }

      if (!reduce) frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      if (pointer.lastMove === -Infinity) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      }
      pointer.lastMove = performance.now();
    };

    const onDown = (e: PointerEvent) => {
      if (reduce) return;
      ripples.push({ x: e.clientX, y: e.clientY, start: performance.now() });
      if (ripples.length > 6) ripples.shift();
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    if (!reduce) frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}