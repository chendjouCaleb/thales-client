import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {NavRouteContext, NavRouteDef} from "./route";
import {NavHistory} from "./nav-history";

@Component({
  selector: 'nav-host',
  standalone: true,
  template: `
    <ng-container #container></ng-container>
  `
})
export class NavHost implements AfterViewInit{
  private readonly _history = new NavHistory();

  @Input()
  startUrl: string = null;

  @Output()
  onchange = new EventEmitter<NavRouteDef>();

  @ContentChildren(forwardRef(() => NavRouteDef))
  _routes: QueryList<NavRouteDef>

  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;

  constructor(@SkipSelf()@Inject(forwardRef(() => NavHost)) @Optional() private navHost: NavHost) {
    this._history = new NavHistory();

  }

  ngAfterViewInit() {
    console.log(this._routes.length)
    this.navigateByUrl(this.startUrl);
  }


  activateRoute(url: string) {
    const route = this._routes.find(r => r.path == url);
    if(!route) {
      throw new Error(`Route matching url: ${url} not found.`);
    }
    this.container.clear();
    const context = new NavRouteContext(true);

   // if(!route._viewRef){
      route._viewRef = this.container.createEmbeddedView(route.templateRef, context);
    //}
    route._viewRef.context = context;
    route._viewRef.detectChanges();


    this.container.insert(route._viewRef);

  }


  navigateByUrl(url: string) {
    this.activateRoute(url);
    this._history.add(url);
  }

  navigateByName(name: string) {

  }

  back(): boolean {
    const url = this._history.back();

    if(url) {
      this.activateRoute(url);
    }
    return !!url;
  }

  forward(): boolean {
    const url = this._history.forward();

    if(url) {
      this.activateRoute(url);
    }
    return !!url;
  }

}
