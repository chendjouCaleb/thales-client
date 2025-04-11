export class ImageSnapshot {
  boxHeight: number;
  boxWidth: number;

  imageWidth: number;
  imageHeight: number;

  maxScale: number = 2;

  private _x: number = 0;
  get x(): number {
    return this._x;
  }

  private _y: number = 0;
  get y(): number {
    return this._y;
  }

  private _scale: number = 1
  get scale(): number {
    return this._scale;
  }

  private _width: number
  get width(): number {
    return this.imageWidth * this._scale;
  }

  private _height: number
  get height(): number {
    return this.imageHeight * this._scale;
  }


  zoom(offset: number) {
    if (this._scale + offset < 1) {
      this._scale = 1;
    } else if (this._scale + offset > this.maxScale) {
      this._scale = this.maxScale;
    } else {
      this._scale += offset
    }
  }

  translate(deltaX: number, deltaY: number) {
    this.translateX(deltaX);
    this.translateY(deltaY);
  }

  translateX(deltaX: number) {
    const newX = this._x + deltaX;
   this.setTranslateX(newX)
  }

  translateY(deltaY: number) {
    const newY = this._y + deltaY;
    this.setTranslateY(newY)
  }

  setTranslateX(newX: number) {
    if (newX > this.maxXStart()) {
      this._x = this.maxXStart();
    } else if (newX < this.minX()) {
      this._x = this.minX()
    } else {
      this._x = newX;
    }
  }

  setTranslateY(newY: number) {
    if (newY > this.maxYStart()) {
      this._y = this.maxYStart();
    } else if (newY < this.minY()) {
      this._y = this.minY()
    } else {
      this._y  = newY;
    }
  }

  maxXStart(): number {
    return (this.width - this.imageWidth) / 2;
  }

  maxYStart(): number {
    return (this.height - this.imageHeight) / 2;
  }

  minX(): number {
    return (this.imageWidth - this.width) / 2
  }

  minY(): number {
    return (this.imageHeight - this.height) / 2 - (this.imageHeight - this.boxHeight);
  }

  _ajustX() : number {
    return (this.width - this.imageWidth) / 2
  }

  _ajustY() : number {
    return (this.height - this.imageHeight) / 2
  }
}
