import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'side-panel',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();
  @Input() content?: TemplateRef<any>;
  @Input() context: any = {};

  close() {
    this.isOpen = false;
    this.closed.emit();
  }
}
