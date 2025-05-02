import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'mk-field',
  standalone: true,
  imports: [MarkdownModule, FormsModule, CommonModule],
  templateUrl: './mk-field.component.html',
  styleUrl: './mk-field.component.scss'
})
export class MkFieldComponent {

  @Input() content: string = "# Test markdown\n\n## Test markdown\n\n### Test markdown\n\n#Test markdown\n\nThis is a **test** for _markdown_";
  @Output() onSave: EventEmitter<string> = new EventEmitter<string>();

  editMode = false;

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  save() {
    this.editMode = false;
    this.onSave.emit(this.content);
  }
}
