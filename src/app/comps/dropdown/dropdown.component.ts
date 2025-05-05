import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export class DropdownOption {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent  implements ControlValueAccessor{
  @Input() options: DropdownOption[] = [];
  isOpen = false;
  selectedValue: DropdownOption | null = null;

  private onChange = (value: number | null) => {};
  private onTouched = () => {};
  
  constructor(private eRef: ElementRef) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.onTouched(); // marquer comme touché
  }

  selectOption(option: DropdownOption) {
    this.selectedValue = option;
    this.onChange(option.id);
    this.isOpen = false;
  }

  writeValue(value: number | null): void {
    this.selectedValue = this.options.find(opt => opt.id === value) || null;;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

}
