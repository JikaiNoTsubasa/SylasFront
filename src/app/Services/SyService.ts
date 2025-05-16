import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseLogin } from "../Models/Requests/ResponseLogin";
import { ResponseCreateProject } from "../Models/Requests/ResponseCreateProject";
import { Observable } from "rxjs";
import { User } from "../Models/Database/User";
import { DevelopmentTime, Issue, Priority, Project } from "../Models/Database/Project";
import { DayTime } from "../Models/Database/DayTime";
import { ResponseMyTimeInfo } from "../Models/Requests/ResponseMyTimeInfo";
import { environment } from "../../environments/environment";
import { Preferences } from "../Models/Database/Preferences";
import { Customer } from "../Models/Database/Customer";
import { GlobalParameter } from "../Models/Database/GlobalParameter";
import { RequestUpdateProject } from "../Models/Requests/RequestUpdateProject";
import { Todo } from "../Models/Database/Todo";
import { RequestUpdateTodo } from "../Models/Requests/RequestUpdateTodo";

@Injectable({
    providedIn: 'root'
})
export class SyService {
    constructor(private http: HttpClient) { }

    getEnvUrl(): string{
        return sessionStorage.getItem('env') ?? environment.apiUrl;
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

    fetchUsers(page?: number, limit?: number): Observable<User[]> {
        let params = new HttpParams();
        if (page){
            params = params.append('page', page.toString());
        }
        if (limit){
            params = params.append('limit', limit.toString());
        }
        return this.http.get<User[]>(`${this.getEnvUrl()}/api/users`, {params: params});
    }

    createUser(name: string, email: string, password: string): Observable<User> {
        let data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);
        return this.http.post<User>(`${this.getEnvUrl()}/api/user`, data);
    }
//#endregion

//#region Preferences
    fetchMyPreferences(): Observable<Preferences> {
        return this.http.get<Preferences>(`${this.getEnvUrl()}/api/preferences/me`);
    }
//#endregion

//#region Projects
    fetchMyProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.getEnvUrl()}/api/myprojects`);
    }

    fetchProject(id: number): Observable<Project> {
        return this.http.get<Project>(`${this.getEnvUrl()}/api/project/${id}`);
    }

    createProject(name: string, description: string, customerId: number): Observable<ResponseCreateProject> {
        let data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('customerId', customerId.toString());
        return this.http.post<ResponseCreateProject>(`${this.getEnvUrl()}/api/project`, data);
    }

    deleteProject(id: number): Observable<Project> {
        return this.http.delete<Project>(`${this.getEnvUrl()}/api/project/${id}`);
    }

    updateProject(id: number, req: RequestUpdateProject): Observable<Project>{
        let data = new FormData();
        if (req.name){
            data.append('name', req.name);
        }
        if (req.description){
            data.append('description', req.description);
        }
        return this.http.patch<Project>(`${this.getEnvUrl()}/api/project/${id}`, data);
    }

    createIssue(projectId: number, name: string, devTime: DevelopmentTime, complexity: number, priority: Priority, description?: string, gitlabTicket?: string, dueDate?: string, milestoneId?: number, labels?: number[]): Observable<Issue> {
        let data = new FormData();
        data.append('name', name);
        data.append('projectId', projectId.toString());
        data.append('developmentTime', devTime.toString());
        data.append('complexity', complexity.toString());
        data.append('priority', priority.toString());
        if (description){
            data.append('description', description);
        }
        if (gitlabTicket){
            data.append('gitlabTicket', gitlabTicket);
        }
        if (dueDate){
            data.append('dueDate', dueDate);
        }
        if (milestoneId){
            data.append('milestoneId', milestoneId.toString());
        }
        if (labels){
            data.append('labels', JSON.stringify(labels));
        }
        return this.http.post<Issue>(`${this.getEnvUrl()}/api/issue`, data);
    }

    fetchIssue(issueId: number): Observable<Issue> {
        return this.http.get<Issue>(`${this.getEnvUrl()}/api/issue/${issueId}`);
    }

    createQuest(name: string, description: string, issueId: number, assigneeId: number): Observable<Issue> {
        let data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('issueId', issueId.toString());
        data.append('assigneeId', assigneeId.toString());
        return this.http.post<Issue>(`${this.getEnvUrl()}/api/quest`, data);
    }
//#endregion

//#region Customers
    fetchCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.getEnvUrl()}/api/customers`);
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

//#region GlobalParameter
    fetchGlobalParameters(): Observable<GlobalParameter[]> {
        return this.http.get<GlobalParameter[]>(`${this.getEnvUrl()}/api/globalparameters`);
    }

    updateGlobalParameter(id: number, value: string): Observable<GlobalParameter> {
        let data = new FormData();
        data.append('value', value);
        return this.http.patch<GlobalParameter>(`${this.getEnvUrl()}/api/globalparameter/${id}`, data);
    }
//#endregion
//#region Todo
    fetchMyTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.getEnvUrl()}/api/mytodos`);
    }

    createTodo(name: string, description?: string, dueDate?: string): Observable<Todo> {
        let data = new FormData();
        data.append('name', name);
        if (dueDate){
            data.append('dueDate', dueDate);
        }
        if (description){
            data.append('description', description);
        }
        return this.http.post<Todo>(`${this.getEnvUrl()}/api/todo`, data);
    }

    updateTodo(id: number, req: RequestUpdateTodo): Observable<Todo> {
        let data = new FormData();
        if (req.name){
            data.append('name', req.name);
        }
        if (req.description){
            data.append('description', req.description);
        }
        if (req.status){
            data.append('status', req.status.toString());
        }
        if (req.dueDate){
            data.append('dueDate', req.dueDate);
        }
        return this.http.patch<Todo>(`${this.getEnvUrl()}/api/todo/${id}`, data);
    }
//#endregion
}