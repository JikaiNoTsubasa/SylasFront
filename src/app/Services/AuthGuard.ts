import { inject } from '@angular/core';
import { AuthService } from './AuthService';
import { Router } from '@angular/router';

export const authGuard = () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (authService.isLoggedIn()) {
        return true;
    }
    router.navigate(['/login']);
    return false;
};