import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
   private isOpen = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    const dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu');
    if (this.isOpen) {
      this.renderer.addClass(dropdownMenu, 'show');
    } else {
      this.renderer.removeClass(dropdownMenu, 'show');
    }
  }
}
