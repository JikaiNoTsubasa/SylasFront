import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-xp-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './xp-bar.component.html',
    styleUrl: './xp-bar.component.scss'
})
export class XpBarComponent {

  @Input() xp: number = 0;
  @Input() level: number = 0;
  @Input() label: string | null = null;
  @Input() icon: string | null = null;

}
