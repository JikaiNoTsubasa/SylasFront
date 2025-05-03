import { Component, inject } from '@angular/core';
import { UserService } from '../../Services/UserService';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/AuthService';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userService = inject(UserService);
  authService = inject(AuthService);

  userName: string | null = null;

  ngOnInit() {
    this.userName = this.userService.userName;
  }

  logout() {
    this.authService.logout();
  }
}
