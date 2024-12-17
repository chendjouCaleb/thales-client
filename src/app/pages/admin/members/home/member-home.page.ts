import {Component, OnInit} from "@angular/core";
import {Button, IconButton} from "@app/ui";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Member} from "@entities/member";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  LockIcon,
  LockOpen,
  LucideAngularModule,
  ShieldCheckIcon,
  ShieldXIcon,
  Trash2Icon
} from 'lucide-angular';
import {Location, NgIf} from '@angular/common';
import {MatTooltip} from "@angular/material/tooltip";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AlertError} from "@app/ui/alert/alert-error";
import {MemberUIService} from "@app/Components/members";
import {MemberHttpClient} from "@app/services";
import {MemberHomePager} from "@app/pages/admin/members/home/member-home.pager";

@Component({
  standalone: true,
  imports: [
    Button,
    LucideAngularModule,
    IconButton,
    MatTooltip,
    NgIf,
    RouterLink,
    MatProgressSpinner,
    AlertError,
    MemberHomePager
  ],
  providers: [MemberUIService],
  templateUrl: 'member-home.page.html'
})
export class MemberHomePage implements OnInit {
  icons = { ArrowLeftIcon, Trash2Icon, ShieldXIcon, ShieldCheckIcon, LockIcon, LockOpen, AlertCircleIcon }
  member: Member;
  memberId: number;
  loadMemberTask = new Task<Member>(async () => {
    let member = await this._memberService.getByIdAsync(this.memberId);
    this.member = member;
    return member;
  })
  constructor(private _route: ActivatedRoute,
              public router: Router,
              public location: Location,
              private _memberUIService: MemberUIService,
              private _memberService: MemberHttpClient) {
  }

  async ngOnInit() {
    this.memberId = this._route.snapshot.params['memberId'];
    await this.loadMemberTask.launch()
  }


  async toggleLock(member: Member) {
    if(member.isLocked) {
      this._memberUIService.unlock(member);
    }else{
      this._memberUIService.lock(member);
    }
  }


  async toggleAdmin(member: Member) {
    if(member.isAdmin) {
      this._memberUIService.unsetAdmin(member);
    }else{
      this._memberUIService.setAdmin(member);
    }
  }

  delete(member: Member) {
    const dialogRef = this._memberUIService.delete(member);
    dialogRef.subscribe((deleted => {
      if(deleted) {
        this.location.back();
      }
    }))
  }
}
