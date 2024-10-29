import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {MessageListPage} from "./list/message-list.page";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MessageModule} from "@app/Components/messages";
import {MessageHomePage} from "@app/pages/admin/messages/home/message-home.page";
import {BreadcrumbModule} from "@app/Components";

const routes: Routes = [
  {path: 'list', component: MessageListPage },
  {path: ':messageId', component: MessageHomePage},
  {path: '', component: MessageListPage },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatMenuModule, MatButtonModule, MatTableModule,
    MatDialogModule, MatIconModule, MessageModule, BreadcrumbModule],
  declarations: [ MessageListPage, MessageHomePage ]
})
export class MessagesPageModule {

}
