import {Cropper} from './cropper';
import {SelectionSnapshot} from './selection-snapshot';

export interface SelectionRect {
  x: number,
  y: number,
  width: number,
  height: number
}

export type DragZone = 'top' | 'bottom' | 'start' | 'end' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'center'

export class CropperSelection {
  private readonly _snapshot: SelectionSnapshot;

  get width(): number {
    return this._snapshot.width;
  }

  get height(): number {
    return this._snapshot.height;
  }

  get rect(): SelectionRect {
    return {
      x: this._snapshot.left,
      y: this._snapshot.top,
      width: this._snapshot.width,
      height: this._snapshot.height
    }
  }

  element: HTMLElement;
  canvasElement: HTMLCanvasElement

  get canvasContext() {
    return this.canvasElement.getContext('2d');
  }


  constructor(private readonly cropper: Cropper) {
    this._snapshot = new SelectionSnapshot({
      minHeight: this.cropper.options.selectionMinHeight,
      minWidth: this.cropper.options.selectionMinWidth,
      boxHeight: cropper.boxHeight,
      boxWidth: cropper.boxWidth,
      aspectRatio: this.cropper.options.selectionAspectRatio
    });
    this._snapshot.setSize(this.cropper.options.selectionInitialWidth, this.cropper.options.selectionInitialHeight)


    const element = document.createElement('div')
    element.classList.add('cropper-selection');
    element.style.width = `${this._snapshot.width}px`;
    element.style.height = `${this._snapshot.height}px`;

    element.innerHTML = `
        <div class="drag-zone start"></div>
        <div class="drag-zone end"></div>
        <div class="drag-zone top"></div>
        <div class="drag-zone bottom"></div>
        <div class="drag-zone corner top-start"></div>
        <div class="drag-zone corner top-end"></div>
        <div class="drag-zone corner bottom-start"></div>
        <div class="drag-zone corner bottom-end"></div>
      <canvas id="canvas"></canvas>
    `
    this.element = element;

    const canvasElement = element.querySelector<HTMLCanvasElement>('#canvas')

    canvasElement.draggable = true
    canvasElement.width = this._snapshot.width;
    canvasElement.height = this._snapshot.height;

    this.canvasElement = canvasElement
    element.append(canvasElement)

    cropper.container.appendChild(element);

    this.drawCanvas()
  }

  centering(){
    const y = this.cropper.boxHeight / 2 - this._snapshot.height / 2;
    const x = this.cropper.boxWidth / 2 - this._snapshot.width / 2;
    this._snapshot.setPosition(0, 0);
    this._snapshot.drag(x, y);
    this.update()
  }

  drag(offsetX: number, offsetY: number) {
    this._snapshot.drag(offsetX, offsetY);
    this.update()
  }

  moveBottom(offsetY: number) {
    this._snapshot.moveBottom(offsetY)
    this.update()
  }

  moveTop(offsetY: number) {
    this._snapshot.moveTop(offsetY)
    this.update()
  }

  moveEnd(offsetX: number) {
    this._snapshot.moveEnd(offsetX)
    this.update()
  }

  moveStart(offsetX: number) {
    this._snapshot.moveStart(offsetX)
    this.update()
  }

  moveTopStart(offsetX: number, offsetY: number) {
    this._snapshot.moveStart(offsetX);
    this._snapshot.moveTop(offsetY);
    this.update();
  }

  moveTopEnd(offsetX: number, offsetY: number) {
    this._snapshot.moveEnd(offsetX);
    this._snapshot.moveTop(offsetY);
    this.update();
  }

  moveBottomStart(offsetX: number, offsetY: number) {
    this._snapshot.moveStart(offsetX);
    this._snapshot.moveBottom(offsetY);
    this.update();
  }

  moveBottomEnd(offsetX: number, offsetY: number) {
    this._snapshot.moveEnd(offsetX);
    this._snapshot.moveBottom(offsetY);
    this.update();
  }

  getDragZone(position: DragZone): HTMLElement {
    return this.element.querySelector(`.drag-zone.${position}`)
  }

  update() {
    this.element.style.left = `${this._snapshot.left}px`;
    this.element.style.top = `${this._snapshot.top}px`;
    this.element.style.width = `${this._snapshot.width}px`;
    this.element.style.height = `${this._snapshot.height}px`;

    this.canvasElement.height = this._snapshot.height;
    this.canvasElement.width = this._snapshot.width;
    this.drawCanvas()
  }

  drawCanvas() {
    const ctx = this.canvasContext!;
    ctx.clearRect(0,0, this.width, this.height);
    const h = this.height
    const w = this.width


    ctx.strokeStyle = 'rgb(255 255 255 / 0.5)'
    ctx.lineWidth = 2
    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.height);
    ctx.stroke()


    ctx.beginPath()
    ctx.strokeStyle = 'rgb(255 255 255)'
    ctx.lineWidth = 3

    ctx.moveTo(3, 23);
    ctx.lineTo(3, 3)
    ctx.lineTo(23, 3)

    ctx.moveTo(w - 23, 3);
    ctx.lineTo(w - 3, 3);
    ctx.lineTo(w - 3, 23);

    ctx.moveTo(w - 3, h - 23);
    ctx.lineTo(w - 3, h - 3);
    ctx.lineTo(w - 23, h - 3);

    ctx.moveTo(23, h - 3);
    ctx.lineTo(3, h - 3);
    ctx.lineTo(3, h - 23);
    ctx.stroke();

  }
}
