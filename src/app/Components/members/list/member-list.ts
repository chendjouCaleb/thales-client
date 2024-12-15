import {Component, Input, OnInit} from "@angular/core";
import {Member} from "@entities/member";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";
import {MemberUIService} from "@app/Components/members";
import {MemberHttpClient} from "@app/services";

@Component({
  templateUrl: 'member-list.html',
  selector: '[member-list], MemberList',
  imports: [
    MatProgressSpinner,
    NgIf,
    NgForOf,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon,
    MatRipple
  ],
  standalone: true
})
export class MemberList implements OnInit {
  @Input()
  params: any = {}

  members: Member[];

  isLoading = true;

  constructor(private _memberService: MemberHttpClient,
              private uiService: MemberUIService) {
  }

  async ngOnInit() {
    this.reload(this.params).then()
  }

  addMembers(...members: Member[]) {
    this.members.unshift(...members);
  }

  async reload(params: any) {
    this.params = params;
    this.isLoading = true;
    this.members = await this._memberService.listAsync(this.params);
    this.isLoading = false;
  }

  setAdmin(member: Member) {
    this.uiService.setAdmin(member);
  }

  unsetAdmin(member: Member) {
    this.uiService.unsetAdmin(member);
  }

  delete(member: Member) {
    this.uiService.delete(member).subscribe(deleted => {
      if(deleted) {
        this.members = this.members.filter(e => e.id != member.id);
      }
    });
  }
}
