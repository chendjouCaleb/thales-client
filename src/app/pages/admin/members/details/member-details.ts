import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {Member} from "@entities/member";

@Component({
  templateUrl: 'member-details.html',
  selector: '[MemberDetails]',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class MemberDetails implements OnInit{
  @Input()
  member: Member

  ngOnInit() {
    if (!this.member) {
      throw new Error("Member should not be null")
    }
  }
}
