export const heroArt = {
  civilian: "/hero-comic.webp",
  hero: "/hero-cape.webp",
  edoPortrait: "/edo.webp",
};

export interface RevealZone {
  id: string;
  /** Upper bound of the zone as a fraction of image height. */
  until: number;
  label: string;
  note: string;
}

export const revealZones: RevealZone[] = [
  {
    id: "mask",
    until: 0.3,
    label: "The Mask",
    note: "Identity classified · reads flame graphs for fun",
  },
  {
    id: "suit",
    until: 0.62,
    label: "The Suit",
    note: "Crest earned in the great outage of 2024",
  },
  {
    id: "boots",
    until: 1,
    label: "The Boots",
    note: "On-call ready in under four minutes",
  },
];
