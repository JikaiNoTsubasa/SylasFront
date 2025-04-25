import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseLogin } from "../Models/Requests/ResponseLogin";
import { Observable } from "rxjs";
import { User } from "../Models/Database/User";
import { Project } from "../Models/Database/Project";

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

//#region User
    fetchMyUser(): Observable<User> {
        return this.http.get<User>(`${this.getEnvUrl()}/api/user/me`);
    }
//#endregion

//#region Projects
    fetchMyProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.getEnvUrl()}/api/myprojects`);
    }
//#endregion
}