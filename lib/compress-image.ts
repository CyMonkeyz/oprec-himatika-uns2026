// lib/compress-image.ts
export type CompressOptions = {
  maxDim: number;
  outputMime: "image/jpeg" | "image/png";
  quality?: number;
};

function getCanvas(width: number, height: number) {
  if (typeof OffscreenCanvas !== "undefined") {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context tidak tersedia");
    return { canvas, ctx };
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context tidak tersedia");
  return { canvas, ctx };
}

function loadImageElement(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gagal membaca gambar"));
    };
    img.src = url;
  });
}

async function canvasToBlob(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  type: "image/jpeg" | "image/png",
  quality?: number
) {
  if ("convertToBlob" in canvas) {
    return (canvas as OffscreenCanvas).convertToBlob({ type, quality });
  }

  return new Promise<Blob>((resolve, reject) => {
    (canvas as HTMLCanvasElement).toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Gagal mengompres gambar"));
          return;
        }
        resolve(blob);
      },
      type,
      quality
    );
  });
}

export async function compressImage(file: File, options: CompressOptions) {
  const outputMime = options.outputMime;
  const quality = options.quality;

  const bitmapSupported = typeof createImageBitmap === "function";
  if (bitmapSupported) {
    const bitmap = await createImageBitmap(file);
    try {
      const scale = Math.min(1, options.maxDim / Math.max(bitmap.width, bitmap.height));
      const targetW = Math.max(1, Math.round(bitmap.width * scale));
      const targetH = Math.max(1, Math.round(bitmap.height * scale));
      const { canvas, ctx } = getCanvas(targetW, targetH);
      ctx.drawImage(bitmap, 0, 0, targetW, targetH);
      const blob = await canvasToBlob(canvas, outputMime, quality);
      return new File([blob], file.name, { type: outputMime, lastModified: Date.now() });
    } finally {
      bitmap.close?.();
    }
  }

  const img = await loadImageElement(file);
  const scale = Math.min(1, options.maxDim / Math.max(img.width, img.height));
  const targetW = Math.max(1, Math.round(img.width * scale));
  const targetH = Math.max(1, Math.round(img.height * scale));
  const { canvas, ctx } = getCanvas(targetW, targetH);
  ctx.drawImage(img, 0, 0, targetW, targetH);
  const blob = await canvasToBlob(canvas, outputMime, quality);
  return new File([blob], file.name, { type: outputMime, lastModified: Date.now() });
}
