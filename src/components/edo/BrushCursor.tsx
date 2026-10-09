import React, { useEffect, useRef, useState } from 'react';
import { usePointerRef, usePrefersReducedMotion } from '../../hooks/usePointer';

/**
 * A loaded brush tip instead of the comic reticle: it leans into the direction
 * of travel and presses flat when you click.
 */
export function BrushCursor() {
  const tip = useRef<HTMLDivElement | null>(null);
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
      setHot(Boolean(target?.closest('a, button, [role="button"], input, textarea')));
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
    let currentX = -100;
    let currentY = -100;
    let lean = 0;

    const tick = () => {
      const { x, y } = pointer.current;
      const ease = reducedMotion ? 1 : 0.3;
      const dx = x - currentX;
      currentX += dx * ease;
      currentY += (y - currentY) * ease;
      lean += (Math.max(-26, Math.min(26, dx * 1.4)) - lean) * 0.16;
      if (tip.current) {
        tip.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -12%) rotate(${
        lean + 32}deg)`;

      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [pointer, finePointer, reducedMotion]);

  if (!finePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <div ref={tip} className="absolute left-0 top-0">
        <div
          className="transition-[height,width,background-color] duration-200 ease-pulp"
          style={{
            width: pressed ? 16 : 11,
            height: hot ? 40 : 30,
            backgroundColor: hot ? '#b23a2c' : '#1c1a17',
            borderRadius: '52% 52% 46% 46% / 24% 24% 76% 76%',
            clipPath: 'polygon(50% 100%, 100% 34%, 78% 0, 22% 0, 0 34%)'
          }} />
        
      </div>
    </div>);

}