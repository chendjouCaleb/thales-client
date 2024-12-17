import {Component, ViewChild} from "@angular/core";
import {Member, Space} from "@entities/index";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {LucideAngularModule, UserPlusIcon} from "lucide-angular";
import {Button} from "@app/ui";
import {AdminPage} from "@app/pages/admin/admin.page";
import {MemberList, MemberUIService} from "@app/Components/members";
import {MemberHttpClient} from "@app/services";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'space-members.page.html',
  selector: 'SpaceMembersPage',
  imports: [
    MemberList,
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
              private _router: Router,
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

  onClick(member: Member) {
    this._router.navigate(['/admin', this.space.identifier, 'members', member.id])
  }
}
