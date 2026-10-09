import type { ProjectCategory, SpotColor } from '../types/portfolio';

/** Each project category prints in one spot colour across the themed worlds. */
export const categorySpot: Record<ProjectCategory, SpotColor> = {
  creative: 'red',
  functional: 'blue',
  systems: 'teal'
};

const ROLE_SPOTS: SpotColor[] = ['red', 'blue', 'yellow', 'teal'];

/** Experience entries cycle through the spot inks in order. */
export function roleSpot(index: number): SpotColor {
  return ROLE_SPOTS[index % ROLE_SPOTS.length];
}