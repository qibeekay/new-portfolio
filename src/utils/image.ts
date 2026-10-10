/**
 * Helper to produce high-performance, auto-optimized image URLs.
 * For Cloudinary URLs, injects automatic format (f_auto: WebP/AVIF),
 * automatic quality compression (q_auto), and responsive width constraints.
 */
export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | 'auto:good' | 'auto:eco' | 'auto:low' | number;
  crop?: 'limit' | 'fill' | 'fit' | 'scale';
  format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpg';
}

export function optimizeImageUrl(
  url?: string | null,
  options: ImageOptimizationOptions = {}
): string {
  if (!url) return '';

  const {
    width = 800,
    height,
    crop = 'limit',
    quality = 'auto',
    format = 'auto',
  } = options;

  // Cloudinary optimization
  if (url.includes('res.cloudinary.com') && url.includes('/image/upload/')) {
    // Check if already transformed
    if (url.includes('/image/upload/f_auto') || url.includes('/image/upload/q_auto')) {
      return url;
    }

    const transforms: string[] = [`f_${format}`, `q_${quality}`];
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    if (crop) transforms.push(`c_${crop}`);

    const transformString = transforms.join(',');
    return url.replace('/image/upload/', `/image/upload/${transformString}/`);
  }

  // Local images in /public: if .jpg, default to high-performance .webp
  if (url.startsWith('/') && url.endsWith('.jpg')) {
    // Only map known optimized webp assets
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

  return url;
}

/**
 * Generate a responsive srcSet for Cloudinary images.
 */
export function getOptimizedSrcSet(
  url?: string | null,
  widths: number[] = [400, 800, 1200]
): string | undefined {
  if (!url || !url.includes('res.cloudinary.com')) return undefined;

  return widths
    .map((w) => `${optimizeImageUrl(url, { width: w })} ${w}w`)
    .join(', ');
}
