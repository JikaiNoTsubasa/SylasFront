import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor() { }

    private _userId: number | null = null;
    private _email: string | null = null;
    private _username: string | null = null;

    setUser(id: number, name: string, email: string) {
        this._userId = id;
        this._email = email;
        this._username = name;
    }

    get userId(): number | null {
        return this._userId;
    }

    get userName(): string | null {
        return this._username;
    }

    get email(): string | null {
        return this._email;
    }

    clear() {
        this._userId = null;
        this._email = null;
        this._username = null;
    }
}