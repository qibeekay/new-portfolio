import React, { useEffect, useRef } from 'react';
import { usePointerRef, usePrefersReducedMotion } from '../hooks/usePointer';

const SPACING = 20;
const INFLUENCE = 190;
const SPOT_COLORS = ['#e63946', '#f4a300', '#2f6690'] as const;

interface Ripple {
  x: number;
  y: number;
  radius: number;
  life: number;
}

interface HalftoneBackgroundProps {
  /** Index into the spot palette, so each issue prints in its own ink. */
  inkIndex?: number;
}

/**
 * Ben-Day dot field printed on newsprint. Dots swell, drift away from the
 * pointer and switch to spot ink inside the pointer's influence radius;
 * clicks stamp an expanding press ring across the plate.
 */
export function HalftoneBackground({ inkIndex = 0 }: HalftoneBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { pointer } = usePointerRef();
  const reducedMotion = usePrefersReducedMotion();
  const ripples = useRef<Ripple[]>([]);
  const inkIndexRef = useRef(inkIndex);
  inkIndexRef.current = inkIndex;

  useEffect(() => {
    const onDown = (event: PointerEvent) => {
      ripples.current.push({ x: event.clientX, y: event.clientY, radius: 0, life: 1 });
      if (ripples.current.length > 5) ripples.current.shift();
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let smoothX = -9999;
    let smoothY = -9999;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const spot = SPOT_COLORS[inkIndexRef.current % SPOT_COLORS.length];
      const target = pointer.current;
      if (target.active) {
        smoothX += (target.x - smoothX) * 0.18;
        smoothY += (target.y - smoothY) * 0.18;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < ripples.current.length; i += 1) {
        const ripple = ripples.current[i];
        ripple.radius += 14;
        ripple.life -= 0.02;
      }
      ripples.current = ripples.current.filter((ripple) => ripple.life > 0);

      for (let y = SPACING / 2; y < height + SPACING; y += SPACING) {
        for (let x = SPACING / 2; x < width + SPACING; x += SPACING) {
          let radius = 1.5;
          let offsetX = 0;
          let offsetY = 0;
          let color = 'rgba(20, 18, 16, 0.20)';

          if (target.active && !reducedMotion) {
            const dx = x - smoothX;
            const dy = y - smoothY;
            const distance = Math.hypot(dx, dy);
            if (distance < INFLUENCE) {
              const strength = 1 - distance / INFLUENCE;
              radius = 1.5 + strength * strength * 5.4;
              const push = strength * 9;
              const inverse = distance || 1;
              offsetX = dx / inverse * push;
              offsetY = dy / inverse * push;
              color = strength > 0.45 ? spot : 'rgba(20, 18, 16, 0.55)';
            }
          }

          if (!reducedMotion) {
            for (let i = 0; i < ripples.current.length; i += 1) {
              const ripple = ripples.current[i];
              const band = Math.abs(Math.hypot(x - ripple.x, y - ripple.y) - ripple.radius);
              if (band < 26) {
                const strength = (1 - band / 26) * ripple.life;
                radius = Math.max(radius, 1.5 + strength * 6);
                color = strength > 0.35 ? spot : color;
              }
            }
          }

          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
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
      <div className="paper-grain absolute inset-0 bg-paper" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_45%,rgba(20,18,16,0.13)_100%)]" />
    </div>);

}