"use client";
import type { ImageLoaderProps } from "next/image";
import { responsiveImages } from "./data/responsive-images";

interface ResponsiveImage {
  variants: readonly { width: number; height: number; src: string }[];
}
const images: Readonly<Record<string, ResponsiveImage>> = responsiveImages;
export default function staticImageLoader({ src, width }: ImageLoaderProps) {
  const image = images[src];
  if (!image)
    throw new Error(
      `Unknown responsive image: ${src}. Run pnpm images:generate after registering the source.`,
    );
  const variant =
    image.variants.find((item) => item.width >= width) ?? image.variants.at(-1);
  if (!variant) throw new Error(`Missing image variants: ${src}`);
  return variant.src;
}
