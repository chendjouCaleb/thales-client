import {CropperSelection, DragZone} from './selection';
import {CropperShade} from './cropper-shade';
import {Image} from './image';
import {CropperOptions} from './cropper-options';

export class Cropper {
  private _image: Image

  private _selection: CropperSelection
  private _shade: CropperShade

  private _dragImage: boolean = false;
  private _dragMode: boolean = false;
  private _dragZone: DragZone = 'center'
  public readonly options: CropperOptions

  get boxHeight(): number {
    return this.container.getBoundingClientRect().height
  }

  get boxWidth(): number {
    return this.container.getBoundingClientRect().width;
  }

  constructor(public readonly container: HTMLElement,
              public readonly imageUrl: string,
              options: CropperOptions = new CropperOptions()) {
    this.options = {... new CropperOptions(), ...options };
    container.classList.add('cropper');
    this._image = this._addImage();
    this._selection = this._addSelection()

    this._shade = this._addShade()

    this._selection.canvasElement.addEventListener('mousedown', (e) => {
      this._activateDrag(e, 'center')
    });

    this._selection.getDragZone('bottom').addEventListener('mousedown', e => {
      this._activateDrag(e, 'bottom')
    });

    this._selection.getDragZone('top').addEventListener('mousedown', e => {
      this._activateDrag(e, 'top')
    });

    this._selection.getDragZone('start').addEventListener('mousedown', e => {
      this._activateDrag(e, 'start')
    });

    this._selection.getDragZone('end').addEventListener('mousedown', e => {
      this._activateDrag(e, 'end')
    });

    this._selection.getDragZone('top-start').addEventListener('mousedown', e => {
      this._activateDrag(e, 'top-start')
    });

    this._selection.getDragZone('top-end').addEventListener('mousedown', e => {
      this._activateDrag(e, 'top-end')
    });

    this._selection.getDragZone('bottom-start').addEventListener('mousedown', e => {
      this._activateDrag(e, 'bottom-start')
    });

    this._selection.getDragZone('bottom-end').addEventListener('mousedown', e => {
      this._activateDrag(e, 'bottom-end')
    });

    this.container.addEventListener('mousedown', (e) => {
      e.stopPropagation()
      this._activateDragImage()

    })

    document.addEventListener('mouseup', (e) => {
      ///e.preventDefault()
      this._deactivateDrag()
      this._deactivateDragImage()
    });

    this.container.addEventListener('wheel', e => {
      e.preventDefault()
      console.log(e.deltaX, e.deltaY)
      this._image.zoom(e.deltaY * -0.001)
    })

    document.addEventListener('mousemove', (e) => {
      if (this._dragMode) {
        e.preventDefault()
        switch (this._dragZone) {
          case "center":
            this._selection.drag(e.movementX, e.movementY);
            break;
          case 'bottom':
            this._selection.moveBottom(e.movementY);
            break;
          case 'top':
            this._selection.moveTop(e.movementY);
            break;
          case 'start':
            this._selection.moveStart(e.movementX);
            break;
          case 'end':
            this._selection.moveEnd(e.movementX);
            break;
          case 'top-start':
            this._selection.moveTopStart(e.movementX, e.movementY);
            break;
          case 'top-end':
            this._selection.moveTopEnd(e.movementX, e.movementY);
            break;
          case 'bottom-start':
            this._selection.moveBottomStart(e.movementX, e.movementY);
            break;
          case 'bottom-end':
            this._selection.moveBottomEnd(e.movementX, e.movementY);
            break;
        }

        const rect = this._selection.rect;
        this._shade.setClearRect(rect.x, rect.y, rect.width, rect.height)
      }

      else if(this._dragImage) {
        this._image.translate(e.movementX, e.movementY)
      }
    })
  }

  toCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = this._selection.width
    canvas.height = this._selection.height;

    const ctx = canvas.getContext('2d')
    const image = this._image.element;
    const rect = this._selection.rect;
    const ratio = image.naturalWidth / this._image.scaledWidth;
    const x = rect.x * ratio - this._image._snapshot.x * ratio + this._image._snapshot._ajustX() * ratio
    const y = rect.y * ratio - this._image._snapshot.y * ratio + this._image._snapshot._ajustY() * ratio
    const width = this._selection.width * ratio;
    const height = this._selection.height * ratio;
    ctx.drawImage(this._image.element, x, y, width, height, 0, 0, rect.width, rect.height)

    return canvas;
  }

  centering() {
    this._selection.centering()
    const rect = this._selection.rect;
    this._shade.setClearRect(rect.x, rect.y, rect.width, rect.height)
  }

  private _addShade(): CropperShade {
    const shade = new CropperShade(this);
    shade.setWidth(this.boxWidth);
    shade.setHeight(this.boxHeight);
    const rect = this._selection.rect;
    shade.setClearRect(rect.x, rect.y, rect.width, rect.height);

    return shade;
  }

  private _addSelection(): CropperSelection {
    return new CropperSelection(this);
  }

  private _addImage(): Image {
    const imageElement = document.createElement('img');
    imageElement.src = this.imageUrl;
    imageElement.draggable = false;
    imageElement.classList.add('cropper-image')
    this.container.append(imageElement);


    const image = new Image(imageElement);

    setTimeout(() => {

      const boxHeight = this.container.getBoundingClientRect().height;
      image.imageWidth = imageElement.getBoundingClientRect().width;
      image.imageHeight = imageElement.getBoundingClientRect().height;

      image.boxHeight = boxHeight
    }, 10)


    return image;
  }

  private _activateDrag(event: MouseEvent, zone: DragZone) {
    event.preventDefault()
    event.stopPropagation()
    this._dragMode = true;
    this._dragZone = zone;
    console.log('Drag is active')
  }

  private _deactivateDrag() {
    if(!this._dragMode)
      return

    this._dragMode = false;
    console.log('Drag mode is deactivate')
  }

  private _activateDragImage() {
    this._dragImage = true;
    this._shade.element.classList.add('grabbing')
    console.log('Drag image is active')
  }

  private _deactivateDragImage() {
    if(!this._dragImage)
      return;

    this._dragImage = false;
    this._shade.element.classList.remove('grabbing')
    console.log('Drag image is deactive')
  }
}
