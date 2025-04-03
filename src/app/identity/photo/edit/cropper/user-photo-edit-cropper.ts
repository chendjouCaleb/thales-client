import {AfterViewInit, Component, ElementRef, Inject, ViewChild, ViewEncapsulation} from "@angular/core";
import {IconButton} from "@app/ui";
import {ArrowLeftIcon, LaptopIcon, LucideAngularModule, XIcon} from "lucide-angular";
import {Button, MyPersonaText, Persona} from "neo-ui";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import Cropper, {CropperOptions} from "cropperjs";

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

  @ViewChild('imageElement')
  imageElementRef: ElementRef<HTMLImageElement>

  imageUrl: string = ''

  constructor(@Inject(DIALOG_DATA) data: any,
              private _dialogRef: DialogRef< Blob>) {
    if(!data.imageUrl) {
      throw new Error('Cropper should have imageUrl')
    }

    this.imageUrl = data.imageUrl
  }

  ngAfterViewInit() {

    this.cropper = new Cropper(this.imageElementRef.nativeElement)
    this.cropper.getCropperSelection().aspectRatio = 1
    // this.cropper.getCropperSelection().
    this.cropper.getCropperImage().initialCenterSize = 'cover'
    this.cropper.getCropperImage().$addStyles(`:host {height: 256px; width: 600px}`)
    //this.cropper.getCropperCanvas().$addStyles(`:host {height: 256px; width: 600px}`)
  }

  async crop() {
    const canvas = await this.cropper.getCropperSelection().$toCanvas();
    canvas.toBlob(blob => {
      this._dialogRef.close(blob)
    })
  }

  close() {
    this._dialogRef.close()
  }
}
