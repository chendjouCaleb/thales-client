import {Directive, EmbeddedViewRef, Input, TemplateRef} from "@angular/core";

export class NavRouteContext {
  constructor(public readonly isActive: boolean) {
  }
}

@Directive({
  selector: '[nav-route]',
  standalone: true
})
export class NavRouteDef {
  _viewRef: EmbeddedViewRef<NavRouteContext>;

  @Input('nav-route')
  path: string = null;

  @Input('nav-routeName')
  name: string = '';



  constructor(private _templateRef: TemplateRef<NavRouteContext>) { }

  get templateRef(): TemplateRef<NavRouteContext> {
    return this._templateRef;
  }

  get host(): HTMLElement {
    if (this._viewRef) {
      return this._viewRef.rootNodes[0];
    }
    return undefined;
  }

}
