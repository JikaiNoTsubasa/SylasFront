import { User } from "./User";

export interface Project{
    id:number;
    owner: User;
    name: string;
    description: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}