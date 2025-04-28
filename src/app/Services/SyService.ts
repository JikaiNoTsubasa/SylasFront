import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseLogin } from "../Models/Requests/ResponseLogin";
import { Observable } from "rxjs";
import { User } from "../Models/Database/User";
import { Project } from "../Models/Database/Project";
import { DayTime } from "../Models/Database/DayTime";
import { ResponseMyTimeInfo } from "../Models/Requests/ResponseMyTimeInfo";

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

    loginAsGoogle(token: string): Observable<ResponseLogin> {
        let data = new FormData();
        data.append('accessToken', token);
        return this.http.post<ResponseLogin>(`${this.getEnvUrl()}/api/auth/google-login`, data);
    }
//#endregion

//#region User
    fetchMyUser(): Observable<User> {
        return this.http.get<User>(`${this.getEnvUrl()}/api/user/me`);
    }

    updateMyUser(email?: string, password?: string, street?: string, city?: string, zipcode?: string, country?: string, avatar?: string): Observable<User> {
        let data = new FormData();
        if (email){
            data.append('email', email ?? "");
        }
        if (password){
            data.append('password', password ?? "");
        }
        if (street){
            data.append('street', street ?? "");
        }
        if (city){
            data.append('city', city ?? "");
        }
        if (zipcode){
            data.append('zipcode', zipcode ?? "");
        }
        if (country){
            data.append('country', country ?? "");
        }
        if (avatar){
            data.append('avatar', avatar ?? "");
        }
        return this.http.patch<User>(`${this.getEnvUrl()}/api/user/me`, data);
    }
//#endregion

//#region Projects
    fetchMyProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.getEnvUrl()}/api/myprojects`);
    }
//#endregion

//#region Time
    fetchMyTime(): Observable<DayTime[]> {
        return this.http.get<DayTime[]>(`${this.getEnvUrl()}/api/mytime`);
    }

    fetchMyLatestTimes(): Observable<DayTime[]> {
        return this.http.get<DayTime[]>(`${this.getEnvUrl()}/api/time/me/latest`);
    }

    addTime(date: string, minutes: number): Observable<DayTime> {
        let data = new FormData();
        data.append('date', date);
        data.append('minutes', minutes.toString());
        return this.http.post<DayTime>(`${this.getEnvUrl()}/api/time/me`, data);
    }

    getMyTimeInfo(): Observable<ResponseMyTimeInfo>{
        return this.http.get<ResponseMyTimeInfo>(`${this.getEnvUrl()}/api/time/me/info`)
    }
//#endregion
}