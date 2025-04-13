import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseLogin } from "../Models/Requests/ResponseLogin";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SyService {
    constructor(private http: HttpClient) { }

    getEnvUrl(): string{
        return sessionStorage.getItem('env') ?? 'http://localhost:5222';
    }

//#region Login
    login(login: string, password: string): Observable<ResponseLogin> {
        let data = new FormData();
        data.append('login', login);
        data.append('password', password);
        return this.http.post<ResponseLogin>(`${this.getEnvUrl()}/api/auth/login`, data);
    }
//#endregion
}