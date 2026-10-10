/**
 * Image helper for local portfolio assets.
 * Backend images from Cloudinary/API are returned completely untouched
 * to preserve 100% original crisp quality without compression or downscaling.
 */
export function optimizeImageUrl(url?: string | null): string {
  if (!url) return '';

  // Only map local public assets to their optimized WebP equivalents
  if (url.startsWith('/') && url.endsWith('.jpg')) {
    const knownWebpAssets = [
      '/hero.jpg',
      '/hero-comic.jpg',
      '/hero-cape.jpg',
      '/edo.jpg',
    ];
    if (knownWebpAssets.includes(url)) {
      return url.replace('.jpg', '.webp');
    }
  }

  // Backend / external images remain untouched
  return url;
}
