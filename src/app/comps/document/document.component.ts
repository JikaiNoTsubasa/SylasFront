import { Component, Input } from '@angular/core';
import { Document } from '../../Models/Database/Document';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'document',
  imports: [ CommonModule ],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent {

  @Input() document: Document;
}
