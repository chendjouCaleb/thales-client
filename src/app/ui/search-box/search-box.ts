import {
  AfterContentInit,
  Component,
  contentChild,
  ContentChild,
  effect,
  ElementRef,
  ViewEncapsulation
} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {LucideAngularModule, SearchIcon} from "lucide-angular";

@Component({
  selector: 'MySearchBox, [MySearchBox]',
  templateUrl: 'search-box.html',
  styleUrl: 'search-box.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FormsModule,
    LucideAngularModule
  ],
  host: {
    class: 'my-search-box',
    '[class.focus]' : 'focus'
  }
})
export class SearchBox implements AfterContentInit {
  icons = { SearchIcon }

  focus: boolean = false


  @ContentChild('searchBoxInput', {read: ElementRef})
  inputElement: ElementRef<HTMLInputElement>


  ngAfterContentInit(): void {

    this.inputElement.nativeElement.addEventListener('focus', () => {
      this.focus = true
    });

    this.inputElement.nativeElement.addEventListener('blur', () => {
      this.focus = false
    });
  }
}
