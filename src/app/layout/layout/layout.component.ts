import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FadeIn } from '../../animations';
import { HeaderComponent } from '../../comps/header/header.component';
import { routeAnimations } from '../../app.component';
import { UserService } from '../../Services/UserService';
import { AuthService } from '../../Services/AuthService';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [RouterModule, HeaderComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    animations: [FadeIn(1000, false)]
})
export class LayoutComponent {

    userService = inject(UserService);
    authService = inject(AuthService);

    ngOnInit() {
        // Initalize user service
        const payload = this.authService.getUserFromToken();
        if (payload) {
          this.userService.setUser(parseInt(payload.nameid), payload.username, payload.email);
        }
    }
}
