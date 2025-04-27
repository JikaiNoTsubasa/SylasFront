import { inject, Injectable } from "@angular/core";
import { SyService } from "./SyService";
import { Router } from "@angular/router";
import { firstValueFrom, Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../Models/Requests/JwtPayload";
import { NotificationService } from "./NotificationService";
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }

    syService = inject(SyService);
    oauthService = inject(OAuthService);
    router = inject(Router);
    notService = inject(NotificationService);

    authConfig: AuthConfig = {
        issuer: 'https://accounts.google.com',
        redirectUri: 'https://localhost:4200/auth/callback', // Redirection après login
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        loginUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        clientId: '508626920995-qv6hteombtuto6nr34549i7hau8o0vru.apps.googleusercontent.com',
        scope: 'openid profile email',
        responseType: 'code', // Authorization Code Flow
        showDebugInformation: true,
        strictDiscoveryDocumentValidation: false,
        disableAtHashCheck: true
    }

    ngOnInit() {
        console.log("Init auth service");
        // this.initGoogleLogin();
    }

    async login(login: string, password: string) {
        let res = await firstValueFrom(this.syService.login(login, password));
        localStorage.setItem('token', res.token);
        return true;
    }

    initGoogleLogin() {
        this.oauthService.configure(this.authConfig);
        this.oauthService.loadDiscoveryDocumentAndLogin();
    }

    loadGoogleConfig() {
        this.oauthService.configure(this.authConfig);
    }

    loginWithGoogle() {
        this.initGoogleLogin();
        this.oauthService.initLoginFlow();
    }

    async handleCallback() {
        await this.oauthService.tryLoginCodeFlow();
        const accessToken = this.oauthService.getAccessToken();
        return accessToken;
    }
    
    logout() {
        this.oauthService.revokeTokenAndLogout();
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
    }

    isLoggedIn(): boolean {
        const payload = this.getUserFromToken();
        return payload != null && Date.now() < payload.exp * 1000;
      }
}