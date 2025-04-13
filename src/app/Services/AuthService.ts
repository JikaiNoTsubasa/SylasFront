import { inject, Injectable } from "@angular/core";
import { SyService } from "./SyService";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../Models/Requests/JwtPayload";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }

    syService = inject(SyService);
    router = inject(Router);

    async login(login: string, password: string) {
        let res = await firstValueFrom(this.syService.login(login, password));
        localStorage.setItem('token', res.token);
        return true;
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }

    getUserFromToken() {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded;
          } catch (e) {
            console.error('Token decoding failed', e);
            return null;
          }

        return null;
    }

    isLoggedIn(): boolean {
        const payload = this.getUserFromToken();
        return payload != null && Date.now() < payload.exp * 1000;
      }
}