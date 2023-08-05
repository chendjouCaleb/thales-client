import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation} from "@angular/core";
import {BreadcrumbItem} from "@app/Components";

@Component({
  selector: 'breadcrumb, [breadcrumb]',
  templateUrl: 'breadcrumb.html',
  styleUrls: [ 'breadcrumb.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'breadcrumb'
  }
})
export class Breadcrumb {
  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  @Input()
  set items(value: BreadcrumbItem[]) {
    this._items = value;
    this._changeDetectorRef.markForCheck();
  }
  get items(): BreadcrumbItem[] { return this._items.slice(); }
  private _items: BreadcrumbItem[]  = []
}
