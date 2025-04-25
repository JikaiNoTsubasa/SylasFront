import { Component, inject } from '@angular/core';
import { NotificationService } from '../../Services/NotificationService';
import { UserService } from '../../Services/UserService';
import { User } from '../../Models/Database/User';
import { SyService } from '../../Services/SyService';
import { XpBarComponent } from "../../comps/xp-bar/xp-bar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [XpBarComponent,RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  notification = inject(NotificationService);
  syService = inject(SyService);
  userService = inject(UserService);

  user: User | null = null;

  loading: boolean = true;

  ngOnInit(){
    // this.notification.info('Welcome to Sylas');
    this.refreshUser();
  }

  refreshUser(){
    this.syService.fetchMyUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error : (e) => {
        this.notification.error(e.message);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
