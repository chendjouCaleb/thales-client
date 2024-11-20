import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {
  LucideAngularModule,
  PlusIcon, XIcon, BuildingIcon
} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {CustomerInfoModel, JobInfo, Phone} from "@entities/customer";
import {NgForOf} from "@angular/common";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'CustomerFormJob, [CustomerFormJob]',
  standalone: true,
  imports: [
    TextField,
    TextFieldInput,
    TextFieldLabel,
    LucideAngularModule,
    Button,
    MatRipple,
    NgForOf,
    IconButton,
    ReactiveFormsModule
  ],
  template: `
    <div>
      <div class="d-flex align-items-center" style="gap: 16px">
        <lucide-angular [img]="icons.BuildingIcon" class="my-icon"></lucide-angular>
        <div class="fontSize-18 fontWeight-semiBold">Expériences professionnelles</div>
      </div>
      <div class="flex-grow-1" style="margin-left: 40px">
        <div *ngFor="let job of formGroup.jobs; let i=index"
             class="w-100 d-flex" [class.mt-3]="i != 0" style="gap: 16px">
          <div class="flex-grow-1">
            <div class="d-flex w-100" style="gap: 16px">
              <TextField class="flex-grow-1">
                <label for="job-enterpriseName" TextFieldLabel>Nom de l'entreprise</label>
                <input type="text" TextFieldInput id="job-label"
                       [formControl]="job.controls.enterpriseName"
                >
              </TextField>

              <TextField class="flex-grow-1">
                <label for="country" TextFieldLabel>Poste</label>
                <input type="text" TextFieldInput id="jobTitle"
                >
              </TextField>
            </div>
            <div class="d-flex w-100 mt-2" style="gap: 16px">
              <TextField class="flex-grow-1">
                <label for="job-service" TextFieldLabel>Service</label>
                <input type="text" TextFieldInput id="job-service"
                       [formControl]="job.controls.serviceName"
                >
              </TextField>

              <TextField class="flex-grow-1">
                <label for="address" TextFieldLabel>Adresse du bureau</label>
                <input type="text" TextFieldInput id="address"
                       [formControl]="job.controls.address"
                >
              </TextField>
            </div>

            <div class="d-flex w-100 mt-2" style="gap: 16px">
              <TextField class="flex-grow-1">
                <label for="start-at" TextFieldLabel>Année de début</label>
                <input type="text" TextFieldInput id="start-at"

                >
              </TextField>

              <TextField class="flex-grow-1">
                <label for="end-at" TextFieldLabel>Année de fin</label>
                <input type="text" TextFieldInput id="end-at"

                >
              </TextField>
            </div>

          </div>

          <button MyIconButton mat-ripple (click)="formGroup.removeJob(job)">
            <lucide-angular [img]="icons.XIcon" class="my-icon "></lucide-angular>
          </button>
        </div>

        <div class="mt-3 w-100 align-end">
          <button MyButton class="alpha-primary" mat-ripple (click)="formGroup.addJob()">

            <lucide-angular [img]="icons.PlusIcon" class="my-icon "></lucide-angular>
            Ajouter une expérience
          </button>
        </div>
      </div>
    </div>
  `
})
export class CustomerFormJob {
  icons = { BuildingIcon, PlusIcon, XIcon };
  id = 0

  constructor(public form: CustomerForm) {
  }

  get model(): CustomerInfoModel {
    return this.form.model
  }

  addJob() {
    let job = new JobInfo();
    job.id = ++this.id;
    this.model.jobs.push(job)
  }

  removeJob(id: number) {
    this.model.jobs = this.model.jobs.filter(m => m.id != id)
  }

  get formGroup(): CustomerFormGroup {
    return this.form.formGroup
  }
}
