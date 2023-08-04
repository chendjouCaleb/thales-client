import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Procedure} from "@entities/procedure";


@Component({
  templateUrl: 'procedure-applies.page.html',
  selector: 'procedure-applies'
})
export class ProcedureAppliesPage implements OnInit {
  @Input()
  procedure: Procedure;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

  }

}
