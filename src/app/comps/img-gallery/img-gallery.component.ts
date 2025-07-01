import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface GalleryImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'img-gallery',
  imports: [ CommonModule ],
  templateUrl: './img-gallery.component.html',
  styleUrl: './img-gallery.component.scss'
})
export class ImgGalleryComponent {

  @Input() items: GalleryImage[] = [];
}
