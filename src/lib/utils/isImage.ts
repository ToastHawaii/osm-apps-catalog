export async function isImage(src: string) {
  return new Promise<HTMLImageElement | undefined>((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.addEventListener("error", () => {
      resolve(undefined);
    });
    img.src = src;
    if (img.complete) resolve(img);
  });
}
