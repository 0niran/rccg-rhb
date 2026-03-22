import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../sanity/lib/client'

const builder = imageUrlBuilder(client)

interface SanityImageAsset {
  _id: string;
  url: string;
  _ref?: string;
}

interface SanityImage {
  asset?: SanityImageAsset;
  _ref?: string;
}

export function getImageUrl(image: SanityImage | string | null, imageFallback?: string): string {
  // If it's a Sanity image object with asset
  if (typeof image === 'object' && image !== null && (image.asset?._ref || image.asset?.url)) {
    return builder.image(image).url()
  }

  // If it's a string path (legacy images)
  if (typeof image === 'string') {
    return image
  }

  // Fallback to imageFallback field
  if (imageFallback) {
    return imageFallback
  }

  // Default fallback
  return '/Media/Image/placeholder.jpg'
}

export function getOptimizedImageUrl(image: SanityImage | string | null, imageFallback?: string, width: number = 800, height: number = 600): string {
  // If it's a Sanity image, optimize it
  if (typeof image === 'object' && image !== null && (image.asset?._ref || image.asset?.url)) {
    return builder.image(image).width(width).height(height).quality(85).url()
  }

  // For string paths, return as-is (no optimization available)
  return getImageUrl(image, imageFallback)
}

// Helper function to determine if image should use Next.js optimization
export function shouldOptimizeImage(image: SanityImage | string | null): boolean {
  // Only optimize Sanity images
  if (typeof image === 'object' && image !== null && (image.asset?._ref || image.asset?.url)) {
    return true
  }

  // Don't optimize local fallback images - Next.js has issues with them
  return false
}