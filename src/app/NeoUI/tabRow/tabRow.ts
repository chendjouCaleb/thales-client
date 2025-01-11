import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {TabRowItem} from '@app/NeoUI';


export interface TabRowChangePayload {
  index: number,
  name: string
}

@Component({
  templateUrl: 'tabRow.html',
  selector: 'TabRow',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['tabRow.scss'],
  host: {
    class: 'tab-row'
  }
})
export class TabRow implements AfterContentInit {
  private _initialized: boolean = false;
  get initialized(): boolean { return this._initialized }

  currentTabRowItem: TabRowItem | undefined
  innerBox: DOMRect | undefined
  outerBox: DOMRect | undefined
  isHover: boolean = false

  thumbLeft: number = 0;
  thumbWidth: number = 0;

  @Input()
  set selectedIndex(value: number) {
    if (this._initialized) {
      this._selectedIndex = value;
      this.selectIndex(value, false)
    } else {
      this._selectedIndex = value
    }
  }

  get selectedIndex(): number {
    return this._selectedIndex
  }

  _selectedIndex: number = 0;

  @Input()
  set selectedName(value: string) {
    if (this._initialized) {
      this._selectedName = value;
      this.selectName(value, false)
    } else {
      this._selectedName = value
    }
  }

  get selectedName(): string {
    return this._selectedName
  }

  _selectedName: string = '';

  @Output()
  change = new EventEmitter<TabRowChangePayload>()


  @ContentChildren(TabRowItem)
  tabRowItems: QueryList<TabRowItem> | undefined


  ngAfterContentInit(): void {
    Promise.resolve().then(() => {
      if (this.selectedName) {
        this.selectName(this._selectedName, false)
      } else {
        this.selectIndex(this.selectedIndex, false);
      }

      setTimeout(() => {
        this.setThumbRect();
        this._initialized = true;
      }, 10)
    })
  }

  getThumbLeft(): number {
    if (this.isHover) {
      return this.currentTabRowItem?.host.offsetLeft!
    }
    return this.currentTabRowItem?.innerBoxHost.offsetLeft!
  }

  getThumbWidth(): number {
    if (this.isHover) {
      return this.currentTabRowItem?.host.offsetWidth!
    }
    return this.currentTabRowItem?.innerBoxHost.offsetWidth!
  }

  activateHover(index: number) {
    if (this._selectedIndex == index) {
      this.isHover = true
      this.setThumbRect()
    }
  }

  deactivateHover() {
    this.isHover = false
    this.setThumbRect()
  }

  selectName(name: string, isHover: boolean = false) {
    const index = this.tabRowItems.toArray().findIndex(t => t.name === name);
    this.selectIndex(index, isHover);
  }

  selectIndex(index: number, isHover: boolean = false) {
    this.isHover = isHover
    this._selectedIndex = index
    this.currentTabRowItem = this.tabRowItems?.get(index);
    this.innerBox = this.currentTabRowItem?.innerBoxHost.getBoundingClientRect()
    this.outerBox = this.currentTabRowItem?.host.getBoundingClientRect()
    this.setThumbRect()
    this._emitChange(index, this.currentTabRowItem.name)
  }

  setThumbRect() {
    this.thumbLeft = this.getThumbLeft()
    this.thumbWidth = this.getThumbWidth()
  }

  private _emitChange(index: number, name: string) {
    this.change.emit({index, name})
  }
}
