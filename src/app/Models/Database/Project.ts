import { User } from "./User";

export interface Project{
    id:number;
    owner: User;
    name: string;
}