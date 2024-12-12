import {Component, OnDestroy, OnInit} from "@angular/core";
import {Procedure, ProcedureStep} from "@entities/procedure";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProcedureService} from "@app/services";
import {ProcedureChangeName} from "../change-name/procedure-change-name";
import {ProcedureDelete} from "../delete/procedure-delete";
import {ProcedureChangeDescription} from "../change-description/procedure-change-description";
import {LucideAngularModule, PencilIcon, PlusIcon, Trash2Icon} from "lucide-angular";
import {Button} from "@app/ui";
import {NgForOf, NgIf} from "@angular/common";
import {Dialog} from "@angular/cdk/dialog";
import {AdminPage} from "@app/pages/admin/admin.page";
import {ProcedureStepSettings} from "@app/pages/admin/procedures/step-settings/procedure-step-settings";
import {Subscription} from "rxjs";
import {ProcedureStepAdd} from "@app/pages/admin/procedures/step-add/procedure-step-add";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'procedure-settings.page.html',
  selector: 'ProcedureSettings',
  standalone: true,
  styleUrl: 'procedure-settings.page.scss',
  imports: [LucideAngularModule, Button, NgIf, RouterLink, NgForOf, CdkDropList, CdkDrag]
})
export class ProcedureSettingsPage implements OnInit, OnDestroy {
  icons = { PencilIcon, PlusIcon, Trash2Icon }
  procedure: Procedure;
  steps: ProcedureStep[] = [];

  deleteStepSubscription: Subscription
  addStepSubscription: Subscription

  constructor(private route: ActivatedRoute,
              private _dialog: Dialog,
              private _router: Router,
              public parent: AdminPage,
              private _snackbar: MatSnackBar,
              private _service: ProcedureService) {}

  async ngOnInit() {
    const procedureId = +this.route.snapshot.params['procedureId'];
    this.procedure = await this._service.getByIdAsync(procedureId);
    this.steps = await this._service.getStepsAsync(this.procedure);

    this.deleteStepSubscription = this._service.onStepDelete.subscribe(step => {
      this.steps = this.steps.filter(s => s.id != step.id);
      this.steps.forEach((step, index) => {
        step.index = index;
      });
    });

    this.addStepSubscription = this._service.onStepAdd.subscribe(step => {
      if(!this.steps.find(s => s.id == step.id)) {
        this.steps.push(step);
      }
    })
  }

  ngOnDestroy() {
    this.addStepSubscription.unsubscribe();
    this.deleteStepSubscription.unsubscribe();
  }

  openStepSettings(procedureStep: ProcedureStep) {
    const dialogRef = this._dialog.open(ProcedureStepSettings, {
      data: {procedureStep}})
  }

  editName() {
    const dialogRef = this._dialog.open(ProcedureChangeName, {
      data: {procedure: this.procedure}})
  }

  editDescription() {
    const dialogRef = this._dialog.open(ProcedureChangeDescription, {
      data: {procedure: this.procedure}})
  }

  addStep() {
    const dialogRef = this._dialog.open(ProcedureStepAdd, {
      data: {procedure: this.procedure}})
  }

  delete() {
    const dialogRef = this._dialog.open(ProcedureDelete, {
      data: {procedure: this.procedure}})

    dialogRef.closed.subscribe(deleted => {
      if(deleted) {
        this._router.navigateByUrl('/admin/procedures').then();
      }
    })
  }

  async onDragStep(event: CdkDragDrop<any>) {
    console.log(event)
    const step = this.steps[event.previousIndex];
    console.log(step)
    await this._service.changeStepIndexAsync(step, event.currentIndex);
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    this.steps.forEach((step, index) => {
      step.index = index
    });
    this._snackbar.open(`la position de l'étape a été changée..`, '', {duration: 3000})
  }

  protected readonly open = open;
}
