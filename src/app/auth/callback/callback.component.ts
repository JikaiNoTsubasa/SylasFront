import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService';
import { SyService } from '../../Services/SyService';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent {

  authService = inject(AuthService);
  syService = inject(SyService);
  router = inject(Router);

  ngOnInit() {
    this.authService.handleCallback().then(token => {
      if (token) {
        // ici tu envoies token à ton backend pour l'échanger
        this.syService.loginAsGoogle(token).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }
  
}
