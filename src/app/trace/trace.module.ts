import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {EventList} from "./list/event-list";
import {EventItem} from "./item/event-item";
import {TraceService} from "./trace-service";
import {MatIconModule} from "@angular/material/icon";
import {EventItemTemplate} from "./template/event-item-template";
import {RouterModule} from "@angular/router";
import {MatRippleModule} from "@angular/material/core";

@NgModule({ declarations: [EventList, EventItem, EventItemTemplate],
    exports: [EventList, EventItem, EventItemTemplate], imports: [CommonModule, MatIconModule, RouterModule, MatRippleModule], providers: [TraceService, provideHttpClient(withInterceptorsFromDi())] })
export class TraceModule { }
