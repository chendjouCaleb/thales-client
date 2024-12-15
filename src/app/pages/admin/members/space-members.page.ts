import {Component, ViewChild} from "@angular/core";
import {Space} from "@entities/index";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {LucideAngularModule, UserPlusIcon} from "lucide-angular";
import {Button} from "@app/ui";
import {AdminPage} from "@app/pages/admin/admin.page";
import {MemberList, MemberUIService} from "@app/Components/members";
import {MemberHttpClient} from "@app/services";

@Component({
  templateUrl: 'space-members.page.html',
  selector: 'SpaceMembersPage',
  imports: [
    MemberList,
    MatIcon,
    MatButton,
    Button,
    LucideAngularModule
  ],
  providers: [MemberUIService],
  standalone: true
})
export class SpaceMembersPage {
  icons = { UserPlusIcon }
  @ViewChild(MemberList)
  memberList: MemberList

  space: Space;

  constructor(private _service: MemberHttpClient,
              private _parent: AdminPage,
              private _uiService: MemberUIService) {
    this.space = _parent.space;
  }

  addMember() {
    this._uiService.add(this.space).subscribe(member => {
      if (member) {
        this.memberList.addMembers(member);
      }
    })
  }

  onClick(row) {
    console.log(row)
  }
}
