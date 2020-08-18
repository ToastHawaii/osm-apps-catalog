export async function lazyLoadImages() {
  const elements = document.querySelectorAll("*[dynamic-src]");
  for (let i = 0; i < elements.length; i++) {
    const boundingClientRect = elements[i].getBoundingClientRect();
    if (
      elements[i].hasAttribute("dynamic-src") &&
      boundingClientRect.top < window.innerHeight * 2
    ) {
      const sources = (elements[i].getAttribute("dynamic-src") || "").split(
        " "
      );

      for (const src of sources) {
        if (document.body.contains(elements[i]) && (await isImage(src))) {
          elements[i].setAttribute("src", src);
          break;
        }
      }
      elements[i].removeAttribute("dynamic-src");
    }
  }
}
window.addEventListener("scroll", lazyLoadImages);
window.addEventListener("load", lazyLoadImages);
window.addEventListener("resize", lazyLoadImages);

async function isImage(src: string) {
  return new Promise<boolean>(resolve => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(true);
    });
    img.addEventListener("error", () => {
      resolve(false);
    });
    img.src = src;
    if (img.complete) resolve(true);
  });
}
