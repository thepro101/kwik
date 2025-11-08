import { BackgroundLayer } from './BackgroundLayer.js';

export class AnimatedCityBackground {
  constructor({ context, canvas, image }) {
    this.context = context;
    this.canvas = canvas;
    this.layers = [
      new BackgroundLayer({
        context,
        image,
        speed: 0.08,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
      }),
      new BackgroundLayer({
        context,
        image,
        speed: 0.12,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
      }),
    ];

    this.lastTimestamp = 0;
    this.isPaused = false;
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.layers.forEach((layer) => {
      layer.canvasWidth = width;
      layer.canvasHeight = height;
      layer.positionX = 0;
      layer.positionX2 = width;
    });
  }

  drawFrame(timestamp) {
    if (this.isPaused) {
      this.lastTimestamp = timestamp;
      requestAnimationFrame((t) => this.drawFrame(t));
      return;
    }

    const deltaTime = this.lastTimestamp ? timestamp - this.lastTimestamp : 16;
    this.lastTimestamp = timestamp;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.layers.forEach((layer, index) => {
      layer.update(deltaTime);
      this.context.globalAlpha = index === 0 ? 0.7 : 1;
      layer.draw();
    });

    this.context.globalAlpha = 1;
    requestAnimationFrame((t) => this.drawFrame(t));
  }

  setPaused(paused) {
    this.isPaused = paused;
  }
}
