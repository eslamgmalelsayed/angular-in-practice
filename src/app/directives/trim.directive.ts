import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appTrim]',
})
export class TrimDirective {
  private el = inject(ElementRef);

  @HostListener('blur', ['$event']) onBlur(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (value) {
      target.value = value.trim();
      // Trigger input event to update form control
      target.dispatchEvent(new Event('input'));
    }
  }
}
