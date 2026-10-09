import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function lockScroll(locked: boolean) {
  if (locked) {
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
  } else {
    lenis?.start();
    document.documentElement.style.overflow = '';
  }
}

export function scrollToTarget(target: number | string | HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.3 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: 'smooth' });
}