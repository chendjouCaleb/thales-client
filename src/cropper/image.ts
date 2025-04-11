import {ImageSnapshot} from './image-snapshot';

export class Image {
  public readonly _snapshot: ImageSnapshot;

  get scaledWidth(): number { return this._snapshot.width; }
  get scaledHeight(): number { return this._snapshot.height; }

  get imageWidth(): number { return this._snapshot.imageWidth; }
  set imageWidth(value: number) {
    this._snapshot.imageWidth = value
  }

  get imageHeight(): number { return this._snapshot.imageHeight; }
  set imageHeight(value: number) {
    this._snapshot.imageHeight = value
  }

  set boxWidth(value: number) {
    this._snapshot.boxWidth = value
  }

  get boxHeight(): number { return this._snapshot.boxHeight; }
  set boxHeight(value: number) {
    this._snapshot.boxHeight = value
  }

  constructor(public readonly element: HTMLImageElement) {
    this._snapshot = new ImageSnapshot()
  }


  zoom(offset: number) {
    this._snapshot.zoom(offset);
    this._snapshot.setTranslateY(this._snapshot.y)
    this._snapshot.setTranslateX(this._snapshot.x)
    this.update()
  }

  translate(deltaX: number, deltaY: number) {
    this._snapshot.translate(deltaX, deltaY);
    this.update()
  }

  update() {
    const scale = this._snapshot.scale;
    const x = this._snapshot.x
    const y = this._snapshot.y;
    this.element.style.transform = `translate(${x}px, ${y}px) scale(${scale}) `;
     }
}
