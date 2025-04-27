import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/AuthService';
import { UserService } from './Services/UserService';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SylasFront';

  authService = inject(AuthService);
  userService = inject(UserService);

  ngOnInit() {
    const payload = this.authService.getUserFromToken();
    if (payload) {
      this.userService.setUser(parseInt(payload.nameid), payload.username, payload.email);
    }
  }
}
