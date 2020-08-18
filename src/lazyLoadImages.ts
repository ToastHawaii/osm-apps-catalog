function lazyLoadImages() {
  const elements = document.querySelectorAll("*[dynamic-src]");
  for (let i = 0; i < elements.length; i++) {
    const boundingClientRect = elements[i].getBoundingClientRect();
    if (
      elements[i].hasAttribute("dynamic-src") &&
      boundingClientRect.top < window.innerHeight * 2
    ) {
      elements[i].setAttribute(
        "src",
        elements[i].getAttribute("dynamic-src") || ""
      );
      elements[i].removeAttribute("dynamic-src");
    }
  }
}
window.addEventListener("scroll", lazyLoadImages);
window.addEventListener("load", lazyLoadImages);
window.addEventListener("resize", lazyLoadImages);
