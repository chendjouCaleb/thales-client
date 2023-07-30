import {NavHost} from "./nav-host";

export class NavHistory {
  private _items: string[] = [];
  private _index = -1;

  public get length(): number { return this._items.length; }

  add(url: string) {
    this.clearAfter();
    this._index += 1;
    this._items.push(url);
  }

  forward(): string | null {
    if (this._index >= this.length -1) {
      return null;
    }
    this._index += 1;
    return this.current();
  }

  back(): string | null {
    if (this._index < 1){
      return  null;
    }

    this._index -= 1;
    return this.current();
  }

  current(): string | null {
    if(this._index < 0)
      return null;
    return this._items[this._index];
  }

  private clearAfter() {
    if(this.length == 0){
      return;
    }
    this._items = this._items.slice(this._index);
  }
}
