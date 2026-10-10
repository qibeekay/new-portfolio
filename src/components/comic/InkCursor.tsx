import React, { useEffect, useRef, useState } from 'react';
import { usePointerRef, usePrefersReducedMotion } from '../hooks/usePointer';

/**
 * Hand-inked cursor: a hard crosshair reticle that snaps to the pointer, with
 * a lagging ink ring that thickens over interactive targets.
 */
export function InkCursor() {
  const reticle = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const { pointer, finePointer } = usePointerRef();
  const reducedMotion = usePrefersReducedMotion();
  const [hot, setHot] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!finePointer) return;
    document.body.classList.add('hide-native-cursor');
    return () => document.body.classList.remove('hide-native-cursor');
  }, [finePointer]);

  useEffect(() => {
    if (!finePointer) return;
    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setHot(Boolean(target?.closest('a, button, [role="button"], input, textarea, summary')));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [finePointer]);

  useEffect(() => {
    if (!finePointer) return;
    let frame = 0;
    let ringX = -100;
    let ringY = -100;

    const tick = () => {
      const { x, y } = pointer.current;
      const ease = reducedMotion ? 1 : 0.22;
      ringX += (x - ringX) * ease;
      ringY += (y - ringY) * ease;
      if (reticle.current) {
        reticle.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [pointer, finePointer, reducedMotion]);

  if (!finePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <div
        ref={ring}
        className="absolute left-0 top-0 rounded-full border-[3px] border-ink transition-[width,height,background-color] duration-150 ease-pulp"
        style={{
          width: hot ? 44 : 28,
          height: hot ? 44 : 28,
          backgroundColor: hot ? 'rgba(230, 57, 70, 0.22)' : 'transparent'
        }} />
      
      <div
        ref={reticle}
        className="absolute left-0 top-0 transition-transform duration-100 ease-pulp"
        style={{ scale: pressed ? '0.7' : '1' } as React.CSSProperties}>
        
        <div className="relative h-5 w-5">
          <span className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-ink" />
          <span className="absolute top-1/2 left-0 h-[3px] w-full -translate-y-1/2 bg-ink" />
          <span
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: hot ? '#e63946' : '#f4a300' }} />
          
        </div>
      </div>
    </div>);

}