import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[PhoneFormat]',
})
export class PhoneFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input')
  onInput() {
    const inputValue = this.el.nativeElement.value;
    const formattedValue = this.formatPhoneNumber(inputValue);
    this.el.nativeElement.value = formattedValue;
  }

  private formatPhoneNumber(value: string): string {
    const digitsOnly = value.replace(/\D/g, ''); // Remove non-digit characters
  
    const countryCode = '+998';
    const areaCode = digitsOnly.slice(0, 2);
    const firstPart = digitsOnly.slice(2, 4);
    const secondPart = digitsOnly.slice(4, 7);
    const thirdPart = digitsOnly.slice(7, 9);
    const fourthPart = digitsOnly.slice(9, 11);
  
    return `${countryCode}-${areaCode}-${firstPart}-${secondPart}-${thirdPart}-${fourthPart}`;
  }
}
