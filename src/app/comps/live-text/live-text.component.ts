import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'live-text',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './live-text.component.html',
  styleUrl: './live-text.component.scss'
})
export class LiveTextComponent {

  @Input() text: string = '';
  @Input() type: string = 'text';

  @Output() onTextChange: EventEmitter<string> = new EventEmitter<string>();

  onChange(){
    this.onTextChange.emit(this.text);
  }
}
