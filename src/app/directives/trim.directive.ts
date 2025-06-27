import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTrim]',
})
export class TrimDirective {
  constructor(private el: ElementRef) {}

  @HostListener('blur', ['$event']) onBlur(event: any) {
    const value = event.target.value;
    if (value) {
      event.target.value = value.trim();
      // Trigger input event to update form control
      event.target.dispatchEvent(new Event('input'));
    }
  }
}
