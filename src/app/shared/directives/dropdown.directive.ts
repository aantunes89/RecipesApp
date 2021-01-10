import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropDownDirective {
  @HostBinding("class.open")
  public open: boolean = false;

  constructor(private elRef: ElementRef) {}

  @HostListener("document:click", ["$event"])
  public clickOut(event: Event): void {
    this.open = this.elRef.nativeElement.contains(event.target) as boolean;
  }
}
