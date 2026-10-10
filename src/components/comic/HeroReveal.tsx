import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ScanSearchIcon } from "lucide-react";
import { heroArt, revealZones } from "../data/hero";

const RADIUS = 155;

/**
 * Secret-identity lens. The civilian plate is printed on top; wherever the
 * pointer hovers, a circular hole is punched through it and the costumed plate
 * beneath shows through — hover the head for the mask, the torso for the suit.
 */
export function HeroReveal() {
  const frame = useRef<HTMLDivElement | null>(null);

  const rawX = useMotionValue(-999);
  const rawY = useMotionValue(-999);
  const rawRadius = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 420, damping: 34, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 420, damping: 34, mass: 0.4 });
  const radius = useSpring(rawRadius, { stiffness: 260, damping: 26 });

  const [zoneId, setZoneId] = useState<string | null>(null);
  const [lensPos, setLensPos] = useState({ x: -999, y: -999 });

  // Punch the lens out of the civilian layer, feathering the ink at the rim.
  const civilianMask = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 62%, rgba(0,0,0,0.55) 76%, #000 88%)`;

  const track = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = frame.current?.getBoundingClientRect();
    if (!bounds) return;
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    rawX.set(localX);
    rawY.set(localY);
    rawRadius.set(RADIUS);
    setLensPos({ x: localX, y: localY });
    const ratio = localY / bounds.height;
    const zone =
      revealZones.find((candidate) => ratio <= candidate.until) ??
      revealZones[revealZones.length - 1];
    setZoneId(zone.id);
  };

  const leave = () => {
    rawRadius.set(0);
    setZoneId(null);
    setLensPos({ x: -999, y: -999 });
  };

  const activeZone = revealZones.find((zone) => zone.id === zoneId) ?? null;

  return (
    <div className="relative">
      <div
        ref={frame}
        onPointerMove={track}
        onPointerDown={track}
        onPointerLeave={leave}
        className="relative aspect-[3/4] w-full select-none overflow-hidden border-[3px] border-ink bg-ink"
        style={{
          boxShadow: "8px 8px 0 0 #2f6690, 8px 8px 0 3px #141210",
          touchAction: "pan-y",
        }}
      >
        {/* Costumed plate underneath */}
        <img
          src={heroArt.hero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Civilian plate on top, with a hole punched at the pointer */}
        <motion.img
          src={heroArt.civilian}
          alt="Comic-book illustration of Anugo Mokwe on a rooftop above the city; hovering reveals the costumed identity beneath"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          style={{ WebkitMaskImage: civilianMask, maskImage: civilianMask }}
        />

        {/* Lens rim + halftone reticle */}
        <AnimatePresence>
          {zoneId ? (
            <motion.span
              key="lens"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="pointer-events-none absolute rounded-full border-[3px] border-pulp-yellow"
              style={{
                left: lensPos.x,
                top: lensPos.y,
                width: RADIUS * 1.42,
                height: RADIUS * 1.42,
                translate: "-50% -50%",
                boxShadow: "0 0 0 3px #141210, inset 0 0 0 3px #141210",
              }}
              aria-hidden="true"
            />
          ) : null}
        </AnimatePresence>

        {/* Zone tag */}
        <AnimatePresence mode="wait">
          {activeZone ? (
            <motion.div
              key={activeZone.id}
              initial={{ opacity: 0, y: 10, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="pointer-events-none absolute bottom-3 left-3 right-3 border-[3px] border-ink bg-pulp-yellow px-3 py-2 shadow-panel-sm"
            >
              <p className="font-display text-2xl uppercase leading-none tracking-wide">
                {activeZone.label}
              </p>
              <p className="font-caption text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                {activeZone.note}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {!zoneId ? (
        <p className="mt-3 flex items-center gap-2 font-caption text-[11px] uppercase tracking-[0.2em] text-ink-soft">
          <ScanSearchIcon
            className="h-4 w-4 animate-pulse"
            aria-hidden="true"
          />
          Move over the art to reveal the secret identity
        </p>
      ) : (
        <p className="mt-3 font-caption text-[11px] uppercase tracking-[0.2em] text-pulp-red">
          Secret identity exposed — keep it between us
        </p>
      )}
    </div>
  );
}
