import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

export type MdxImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function MdxImage({ src, alt, width, height, className }: MdxImageProps) {
  if (!src || typeof src !== "string") return null;

  const w =
    typeof width === "number"
      ? width
      : typeof width === "string"
        ? Number.parseInt(width, 10) || 960
        : 960;
  const h =
    typeof height === "number"
      ? height
      : typeof height === "string"
        ? Number.parseInt(height, 10) || 540
        : 540;

  const unoptimized = src.endsWith(".svg");

  return (
    <span className="my-8 block w-full max-w-3xl">
      <Image
        src={src}
        alt={alt ?? ""}
        width={w}
        height={h}
        className={
          className ??
          "h-auto w-full rounded-lg object-cover ring-1 ring-white/10"
        }
        sizes="(max-width: 768px) 100vw, 672px"
        unoptimized={unoptimized}
      />
    </span>
  );
}
