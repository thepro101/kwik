import { loadImage } from '../utils/imageLoader.js';
import { AnimatedCityBackground } from '../background/AnimatedCityBackground.js';

const SPRINGFIELD_IMAGE = './assets/level1-background-springfield.png';

export class SideScrollerGame {
  constructor({ canvas, statusLabel, pauseButton }) {
    this.canvas = canvas;
    this.statusLabel = statusLabel;
    this.pauseButton = pauseButton;
    this.context = canvas.getContext('2d');

    this.background = null;
    this.isPaused = false;
  }

  async init() {
    const image = await loadImage(SPRINGFIELD_IMAGE);
    this.background = new AnimatedCityBackground({
      context: this.context,
      canvas: this.canvas,
      image,
    });

    this.#bindControls();
    this.#resizeToWindow();
    window.addEventListener('resize', () => this.#resizeToWindow());

    requestAnimationFrame((timestamp) => this.background.drawFrame(timestamp));
  }

  #bindControls() {
    this.pauseButton.addEventListener('click', () => {
      this.isPaused = !this.isPaused;
      this.background.setPaused(this.isPaused);
      this.pauseButton.textContent = this.isPaused ? 'Resume' : 'Pause';
      this.statusLabel.textContent = this.isPaused ? 'Paused' : 'Running';
    });
  }

  #resizeToWindow() {
    const maxWidth = Math.min(window.innerWidth - 48, 1280);
    const maxHeight = Math.min(window.innerHeight - 160, 720);
    const aspectRatio = 16 / 9;

    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    this.background.resize(Math.floor(width), Math.floor(height));
  }
}
