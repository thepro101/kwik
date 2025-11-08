export class BackgroundLayer {
  constructor({ context, image, speed, canvasWidth, canvasHeight }) {
    this.context = context;
    this.image = image;
    this.speed = speed;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.positionX = 0;
    this.positionX2 = canvasWidth;
  }

  update(deltaTime) {
    const distance = this.speed * deltaTime;
    this.positionX -= distance;
    this.positionX2 -= distance;

    if (this.positionX <= -this.canvasWidth) {
      this.positionX = this.positionX2 + this.canvasWidth;
    }

    if (this.positionX2 <= -this.canvasWidth) {
      this.positionX2 = this.positionX + this.canvasWidth;
    }
  }

  draw() {
    this.#drawImage(this.positionX);
    this.#drawImage(this.positionX2);
  }

  #drawImage(positionX) {
    this.context.drawImage(this.image, positionX, 0, this.canvasWidth, this.canvasHeight);
  }
}
