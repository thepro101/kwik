export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', () => reject(new Error(`Failed to load image: ${src}`)));
  });
}
