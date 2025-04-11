import {Cropper} from './cropper';

/**
 *
 */
export class CropperShade {
  private readonly _element: HTMLCanvasElement;

  get element(): HTMLCanvasElement {
    return this._element;
  }
  private _width: number;
  get width(): number {
    return this._width;
  }

  private _height: number;
  get height(): number {
    return this._height;
  }

  private _clearRectX: number = 0;
  get clearRectX(): number { return this._clearRectX; }

  private _clearRectY: number = 0;
  get clearRectY(): number { return this._clearRectY; }

  private _clearRectWidth: number = 0;
  get clearRectWidth(): number { return this._clearRectWidth; }

  private _clearRectHeight: number = 0;
  get clearRectHeight(): number { return this._clearRectHeight; }



  get canvasContext() {
    return this._element.getContext('2d')
  }

  constructor(public readonly cropper: Cropper) {
    const element = document.createElement('canvas');
    element.width = cropper.boxWidth;
    element.height = cropper.boxHeight;
    element.classList.add('cropper-shade');

    this._element = element;
    this.cropper.container.append(this._element);
    //this.draw();
  }

  setWidth(width: number) {
    this._width = width;
    this._element.width = width;
  }

  setHeight(height: number) {
    this._height = height;
    this._element.height = height;

  }

  setClearRect(x: number, y: number, width: number, height: number) {
    this._clearRectX = x;
    this._clearRectY = y;
    this._clearRectWidth = width;
    this._clearRectHeight = height;
    this.draw()
  }


  public draw() {
    const ctx = this.canvasContext!;

    ctx.clearRect(0, 0, this.width, this.height)
    ctx.beginPath();
    ctx.fillStyle = this.cropper.options.shadeColor
    ctx.rect(0, 0, this.width, this.height)
    ctx.fill();

    ctx.clearRect(this._clearRectX, this._clearRectY, this._clearRectWidth, this._clearRectHeight)
  }


}
