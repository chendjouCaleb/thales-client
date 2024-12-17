import {Component, Input, OnInit} from "@angular/core";
import {Button, IconButton} from "@app/ui";
import {
  AlertCircleIcon,
  ArchiveIcon,
  ArchiveXIcon,
  ArrowLeftIcon,
  LucideAngularModule,
  StarIcon,
  Trash2Icon
} from "lucide-angular";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AlertError} from "@app/ui/alert/alert-error";
import {Member} from "@entities/member";
import {Task} from "@app/utils";
import {HorizontalPager, PageContentDef, TabRow, TabRowItem} from "@app/NeoUI";
import {PaymentModule, ProcedureApplyModule} from "@app/Components";
import {TraceModule} from "@app/trace";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {PlaneTicketList} from "@app/Components/plane-tickets/list/plane-ticket-list";
import {ProcedureApplyList} from "@app/Components/procedure-apply/list/procedure-apply-list";
import {MemberHttpClient} from "@app/services";
import {MemberDetails} from "@app/pages/admin/members/details/member-details";

@Component({
  standalone: true,
  selector: '[MemberHomePager]',
  imports: [
    Button,
    LucideAngularModule,
    IconButton,
    MatTooltip,
    NgIf,
    RouterLink,
    MatProgressSpinner,
    AlertError,
    TabRow,
    TabRowItem,
    HorizontalPager,
    PageContentDef,
    ProcedureApplyModule,
    TraceModule,
    PaymentModule,
    PaymentsList,
    PlaneTicketList,
    MemberDetails
  ],
  templateUrl: 'member-home.pager.html'
})
export class MemberHomePager implements OnInit {
  icons = {StarIcon, ArrowLeftIcon, Trash2Icon, ArchiveIcon, ArchiveXIcon, AlertCircleIcon}

  @Input()
  member: Member;
  memberId: number;
  loadMemberTask = new Task<Member>(async () => {
    let member = await this._memberService.getByIdAsync(this.memberId);
    this.member = member;
    return member;
  })

  constructor(private _route: ActivatedRoute,
              public router: Router,
              private _memberService: MemberHttpClient) {
  }

  async ngOnInit() {

  }
}
