import {Component, ViewEncapsulation} from "@angular/core";
import {IconButton} from "@app/ui";
import {ArrowLeftIcon, ImagePlus, LaptopIcon, LucideAngularModule, XIcon} from "lucide-angular";
import {UserPhotoEdit} from "@app/identity";
import {Button, MyPersonaText, Persona} from "neo-ui";
import {NavHost} from "@app/navigation";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {UserPhotoEditCropperLauncher} from "@app/identity/photo/edit/cropper";

@Component({
  templateUrl: 'user-photo-edit-upload.html',
  selector: '[user-photo-edit-upload]',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [ UserPhotoEditCropperLauncher ],
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
    class: 'user-photo-edit-upload'
  }
})
export class UserPhotoEditUpload {
  icons = {XIcon, ArrowLeftIcon, LaptopIcon};

  get sourceImageUrl(): string { return this.parent._sourceImageUrl }

  constructor(public readonly parent: UserPhotoEdit,
              public readonly cropper: UserPhotoEditCropperLauncher,
              private _navHost: NavHost,) {
  }

  next() {
    this._navHost.navigateByUrl('confirm')
  }

  back() {
    this._navHost.back()
  }

  handleFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      console.log('Finished')
      this.parent._sourceImageUrl = reader.result as string
      this.cropper.launch(this.sourceImageUrl).subscribe(blob => {
        if(blob) {
          this.parent._imageBlob = blob
          this.parent._imageUrl = URL.createObjectURL(blob)
          this._navHost.navigateByUrl('confirm')
        }
      })
    }
    reader.readAsDataURL(file)
  }

  onUpload(event, input: HTMLInputElement) {

    if (input.files.length < 1) {
      return;
    }
    this.handleFile(input.files[0])
  }

  dragenter(event) {
    event.stopPropagation()
    event.preventDefault()
    //console.log(event)
  }

  dragover(event) {
    event.stopPropagation()
    event.preventDefault()
    //console.log(event)
  }

  drop(event: DragEvent) {
    event.stopPropagation()
    event.preventDefault()

    const dt = event.dataTransfer;
    const files = dt.files;

    this.handleFile(files[0])
  }
}
