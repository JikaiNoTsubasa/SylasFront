import { Component, inject } from '@angular/core';
import { NotificationService } from '../../Services/NotificationService';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  notification = inject(NotificationService);

  ngOnInit(){
    this.notification.info('Bienvenue sur SylasFront');
  }
}
