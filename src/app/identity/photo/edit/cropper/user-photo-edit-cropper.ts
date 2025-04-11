import {AfterViewInit, Component, ElementRef, Inject, ViewChild, ViewEncapsulation} from "@angular/core";
import {IconButton} from "@app/ui";
import {ArrowLeftIcon, LaptopIcon, LucideAngularModule, XIcon} from "lucide-angular";
import {Button, MyPersonaText, Persona} from "neo-ui";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Cropper} from "cropper";

@Component({
  templateUrl: 'user-photo-edit-cropper.html',
  styleUrl: 'user-photo-edit-cropper.css',
  selector: '[user-photo-edit-cropper]',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    IconButton,
    LucideAngularModule,
    Button,
    Button,
    Button,
    Persona,
    MyPersonaText,
    NgOptimizedImage,
    NgIf
  ],
  host: {
    class: 'user-photo-edit-cropper'
  }
})
export class UserPhotoEditCropper implements AfterViewInit {
  icons = {XIcon, ArrowLeftIcon, LaptopIcon};
  cropper: Cropper

  @ViewChild('cropperContainer')
  cropperContainerRef: ElementRef<HTMLElement>

  imageUrl: string = ''

  constructor(@Inject(DIALOG_DATA) data: any,
              private _dialogRef: DialogRef< Blob>) {
    if(!data.imageUrl) {
      throw new Error('Cropper should have imageUrl')
    }

    this.imageUrl = data.imageUrl
  }

  ngAfterViewInit() {

    this.cropper = new Cropper(this.cropperContainerRef.nativeElement, this.imageUrl, {
      selectionAspectRatio: 1
    })
    //this.cropper.centering()
  }

  async crop() {
    const canvas = this.cropper.toCanvas()
    canvas.toBlob(blob => {
      this._dialogRef.close(blob)
    })
  }

  close() {
    this._dialogRef.close()
  }
}
