import {assert} from './assert';

export class SelectionOptions {
  boxWidth?: number = 250
  boxHeight?: number = 250
  minWidth?: number = 50
  minHeight?: number = 50
  aspectRatio?: number = 0
}

export class SelectionSnapshot {
  private _left: number = 0;
  get left(): number {
    return this._left;
  }

  private _top: number = 0;
  get top(): number {
    return this._top;
  }

  private _width: number = 0;
  get width(): number {
    return this._width;
  }

  private _height: number = 0;
  get height(): number {
    return this._height;
  }

  private _aspectRatio: number = 0
  get aspectRatio(): number {
    return this._aspectRatio;
  }

  public readonly options: SelectionOptions;

  constructor(options: SelectionOptions) {
    const defaultOptions = new SelectionOptions();
    this.options = {...defaultOptions, ...options };

    this._width = options.minWidth
    this._height = options.minHeight;
    this._aspectRatio = options.aspectRatio;
  }


  setWidth(width: number) {
    assert(width >= this.options.minWidth, `Width(${width}) should be upper than minWidth(${this.options.minWidth})`)
    assert(width <= this.options.boxWidth, `Width(${width}) should be lower than maxWidth(${this.options.boxWidth})`)

    const offsetX = width - this.width;
    this._width = width;

    if(this.left - offsetX > 0) {
      this._left -= offsetX / 2;
    }else {
      this._left = 0;
    }

    if (this._left + width > this.options.boxWidth) {
      if (this._left - offsetX / 2 > 0) {
        this._left -= offsetX / 2;
      }else {
        this._left = 0;
      }
    }
  }

  setHeight(height: number) {
    assert(height <= this.options.boxHeight, `Height(${height}) should be lower than maxHeight(${this.options.boxHeight})`)
    assert(height >= this.options.minHeight, `Height(${height}) should be upper than minHeight(${this.options.minHeight})"`)

    const offsetY = height - this.height
    this._height = height
    if (this._top - offsetY / 2 > 0) {
      this._top -= offsetY / 2
    }else {
      this._top = 0
    }

    if (this._top + height > this.options.boxHeight) {
      if (this._top - offsetY / 2 > 0) {
        this._top -= offsetY / 2
      } else {
        this._top = 0
      }
    }
  }


  expandX(offsetY: number) {
    if (this.options.aspectRatio == 0) {
      return
    }
    const offsetX = offsetY / this.options.aspectRatio

    this.setWidth(this.width + offsetX)
  }


  expandY(offsetX: number) {
    if (this.options.aspectRatio === 0) {
      return
    }
    const offsetY = offsetX * this.options.aspectRatio
    this.setHeight(this.height + offsetY);
  }


  setPosition(left: number, top: number) {
    this._left = left;
    this._top = top;
  }

  coerceOffsetX(offsetX: number): number {
    if(this.options.aspectRatio === 0) {
      return offsetX
    }
    const offsetY = offsetX * this.options.aspectRatio
    if(offsetX > 0 && offsetY > this.options.boxHeight - this.height){
      return (this.options.boxHeight - this.height) / this.options.aspectRatio
    }
    if(offsetX < 0 && -offsetY > this.height - this.options.minHeight){
      return -(this.height - this.options.minHeight) / this.options.aspectRatio
    }
    return offsetX
  }

  coerceOffsetY(offsetY: number): number {
    if(this.options.aspectRatio == 0) {
      return offsetY
    }
    const offsetX = offsetY / this.options.aspectRatio
    if(offsetY > 0 && offsetX > this.options.boxWidth - this.width){
      return (this.options.boxWidth - this.width) * this.options.aspectRatio
    }
    if(offsetX < 0 && -offsetY > this.width - this.options.minWidth){
      return -(this.width - this.options.minWidth) * this.options.aspectRatio
    }
    return offsetY
  }



  moveStart(offsetX: number) {
    const coercedOffsetX = this.coerceOffsetX(offsetX)
    if (offsetX < 0) {
      this.moveStartNegative(coercedOffsetX)
    } else {
      this.moveStartPositive(coercedOffsetX)
    }
  }

  private moveStartNegative(offsetX: number) {
    let finalOffsetX = offsetX
    if (this.left + offsetX < 0) {
      finalOffsetX = 0 - this.left
    }

    this._left += finalOffsetX
    this._width -= finalOffsetX
    this.expandY(-finalOffsetX)
  }

  private moveStartPositive(offsetX: number) {
    let finalOffsetX = offsetX
    if (this.width - offsetX <= this.options.minWidth) {
      finalOffsetX = this.width - this.options.minWidth
    }

    this._left += finalOffsetX
    this._width -= finalOffsetX
    this.expandY(-finalOffsetX)
  }

  moveEnd(offsetX: number) {
    const coercedOffsetX = this.coerceOffsetX(offsetX)
    if (offsetX < 0) {
      this.moveEndNegative(coercedOffsetX)
    } else {
      this.moveEndPositive(coercedOffsetX)
    }
  }

  private moveEndPositive(offsetX: number) {
    let finalOffsetX = offsetX

    if (this.left + this._width + offsetX > this.options.boxWidth) {
      finalOffsetX = this.options.boxWidth - (this.left + this._width)
    }

    this._width += finalOffsetX
    this.expandY(finalOffsetX)
  }

  private moveEndNegative(offsetX: number) {
    let finalOffsetX = offsetX
    if (this.width + offsetX < this.options.minWidth) {
      finalOffsetX = this.options.minWidth - this.width
    }
    this._width += finalOffsetX
    this.expandY(finalOffsetX)
  }

  moveTop(offsetY: number) {
    const coercedOffsetY = this.coerceOffsetY(offsetY)
    if (offsetY < 0) {
      this.moveTopNegative(coercedOffsetY)
    } else {
      this.moveTopPositive(coercedOffsetY)
    }
  }

  private moveTopNegative(offsetY: number) {
    let finalOffsetY = offsetY
    if (this.top + offsetY < 0) {
      finalOffsetY = -this.top
    }

    this._top += finalOffsetY
    this._height -= finalOffsetY
    this.expandX(-finalOffsetY)
  }

  private moveTopPositive(offsetY: number) {
    let finalOffsetY = offsetY
    if (this.height - offsetY <= this.options.minHeight) {
      finalOffsetY = this.height - this.options.minHeight
    }

    this._top += finalOffsetY
    this._height -= finalOffsetY
    this.expandX(-finalOffsetY)
  }


  moveBottom(offsetY: number) {
    const coercedOffsetY = this.coerceOffsetY(offsetY)
    if (coercedOffsetY < 0) {
      this.moveBottomNegative(coercedOffsetY)
    } else {
      this.moveBottomPositive(coercedOffsetY)
    }
  }

  private moveBottomPositive(offsetY: number) {
    let finalOffsetY = offsetY

    if (this.top + this.height + offsetY > this.options.boxHeight) {
      finalOffsetY = this.options.boxHeight - (this.top + this.height)
    }

    this._height += finalOffsetY
    this.expandX(finalOffsetY)
  }

  private moveBottomNegative(offsetY: number) {
    let finalOffsetY = offsetY
    if (this.height + offsetY < this.options.minHeight) {
      finalOffsetY = this.options.minHeight - this.height
    }
    this._height += finalOffsetY
    this.expandX(finalOffsetY)
  }

  dragX(offsetX: number) {
    if(offsetX === 0) {
      return
    }
    if (offsetX < 0) {
      this.dragXNegative(offsetX)
    } else {
      this.dragXPositive(offsetX)
    }
  }

  dragY(offsetY: number) {
    if (offsetY < 0) {
      this.dragYNegative(offsetY)
    } else {
      this.dragYPositive(offsetY)
    }
  }

  private dragXPositive(offsetX: number) {
    assert(offsetX >= 0, "Expect positive or 0 offsetX")
    if (this.left + offsetX + this.width < this.options.boxWidth) {
      this._left += offsetX
    } else {
      this._left = this.options.boxWidth - this.width
    }
  }

  private dragXNegative(offsetX: number) {
    assert(offsetX < 0, "Expect negative or 0 offsetX")
    if (-offsetX > this.left) {
      this._left = 0
    } else {
      this._left += offsetX
    }
  }


  private dragYPositive(offsetY: number) {
    assert(offsetY >= 0, "Expect positive or 0 offsetY")
    if (this.top + offsetY + this.height < this.options.boxHeight) {
      this._top += offsetY
    } else {
      this._top = this.options.boxHeight - this.height
    }
  }

  private dragYNegative(offsetY: number) {
    assert(offsetY < 0, "Eypect negative or 0 offsetY")
    if (-offsetY > this._top) {
      this._top = 0
    } else {
      this._top += offsetY
    }
  }

  drag(offsetX: number, offsetY: number) {
    this.dragX(offsetX)
    this.dragY(offsetY)
  }

  changeAspectRatio(aspectRatio: number) {
    assert(aspectRatio >= 0, "Aspect ratio must upper or equal than zero, but is is $aspectRatio.")
    this._aspectRatio = aspectRatio;
    if(aspectRatio == 0) {
      return
    }

    let tempHeight = this.width * aspectRatio
    let tempWidth = this.width
    if(tempHeight > this.options.boxHeight) {
      tempHeight = this.options.boxHeight
      tempWidth = tempHeight/aspectRatio
    }

    this.setHeight(tempHeight)
    this.setWidth(tempWidth)
  }

  setSize(width: number, height: number) {
    assert(width >= this.options.minWidth,
      `Width(${width}) should be upper than minWidth(${this.options.minWidth})`
    );
    assert(height >= this.options.minHeight,
      `Height(${height}) should be upper than minHeight(${this.options.minHeight})`
    );

    assert(width <= this.options.boxWidth,
      `Width(${width}) should be lower than boxWidth(${this.options.boxWidth})`
    )
    assert(height <= this.options.boxHeight,
      `Height(${height}) should be lower than boxHeight(${this.options.boxHeight})`
    );

    this._width = width
    this._height = height
  }
}
