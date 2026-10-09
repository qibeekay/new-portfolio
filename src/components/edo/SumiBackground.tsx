import React, { useEffect, useRef } from 'react';
import { usePointerRef, usePrefersReducedMotion } from '../../hooks/usePointer';

interface Petal {
  x: number;
  y: number;
  size: number;
  drift: number;
  fall: number;
  spin: number;
  angle: number;
  tone: string;
}

interface InkPoint {
  x: number;
  y: number;
  width: number;
  life: number;
}

interface Bloom {
  x: number;
  y: number;
  radius: number;
  life: number;
}

const PETAL_TONES = ['rgba(178, 58, 44, 0.55)', 'rgba(39, 65, 95, 0.45)', 'rgba(165, 129, 60, 0.5)'];

/**
 * Washi ground with two pointer behaviours, deliberately unlike the comic
 * halftone plate: the pointer paints a wet sumi stroke that dries away, and
 * drifting petals are pushed aside by the sleeve of your hand.
 */
export function SumiBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { pointer } = usePointerRef();
  const reducedMotion = usePrefersReducedMotion();
  const blooms = useRef<Bloom[]>([]);

  useEffect(() => {
    const onDown = (event: PointerEvent) => {
      blooms.current.push({ x: event.clientX, y: event.clientY, radius: 6, life: 1 });
      if (blooms.current.length > 4) blooms.current.shift();
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let lastX = -999;
    let lastY = -999;
    const trail: InkPoint[] = [];
    let petals: Petal[] = [];

    const seedPetals = () => {
      const count = Math.min(34, Math.round(width / 46));
      petals = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 4 + Math.random() * 7,
        drift: 0.18 + Math.random() * 0.42,
        fall: 0.16 + Math.random() * 0.4,
        spin: (Math.random() - 0.5) * 0.02,
        angle: Math.random() * Math.PI,
        tone: PETAL_TONES[Math.floor(Math.random() * PETAL_TONES.length)]
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedPetals();
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const target = pointer.current;
      ctx.clearRect(0, 0, width, height);

      if (target.active && !reducedMotion) {
        const speed = Math.hypot(target.x - lastX, target.y - lastY);
        if (lastX > -900 && speed > 0.8) {
          trail.push({
            x: target.x,
            y: target.y,
            width: Math.max(3, Math.min(26, 26 - speed * 0.55)),
            life: 1
          });
        }
        lastX = target.x;
        lastY = target.y;
      }
      if (trail.length > 90) trail.splice(0, trail.length - 90);

      // Wet sumi stroke, drying from the tail forward.
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 1; i < trail.length; i += 1) {
        const from = trail[i - 1];
        const to = trail[i];
        to.life -= 0.012;
        if (to.life <= 0) continue;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(28, 26, 23, ${0.3 * to.life})`;
        ctx.lineWidth = to.width * to.life;
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
      while (trail.length && trail[0].life <= 0) trail.shift();

      // Ink blooms where the brush was pressed down.
      blooms.current = blooms.current.filter((bloom) => bloom.life > 0);
      for (let i = 0; i < blooms.current.length; i += 1) {
        const bloom = blooms.current[i];
        bloom.radius += 3.4;
        bloom.life -= 0.016;
        ctx.beginPath();
        ctx.fillStyle = `rgba(39, 65, 95, ${0.14 * bloom.life})`;
        ctx.arc(bloom.x, bloom.y, bloom.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = `rgba(28, 26, 23, ${0.2 * bloom.life})`;
        ctx.lineWidth = 1.2;
        ctx.arc(bloom.x, bloom.y, bloom.radius * 0.72, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Petals drifting, nudged away from the pointer.
      for (let i = 0; i < petals.length; i += 1) {
        const petal = petals[i];
        if (!reducedMotion) {
          petal.x += petal.drift;
          petal.y += petal.fall;
          petal.angle += petal.spin;

          if (target.active) {
            const dx = petal.x - target.x;
            const dy = petal.y - target.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 150) {
              const push = (1 - distance / 150) * 2.6;
              petal.x += dx / (distance || 1) * push;
              petal.y += dy / (distance || 1) * push;
            }
          }

          if (petal.y > height + 20) {
            petal.y = -20;
            petal.x = Math.random() * width;
          }
          if (petal.x > width + 20) petal.x = -20;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.angle);
        ctx.fillStyle = petal.tone;
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size, petal.size * 0.52, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [pointer, reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="washi-grain absolute inset-0 bg-washi" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(39,65,95,0.10),transparent)]" />
    </div>);

}