import { Customer } from "./Customer";
import { User } from "./User";

export interface Project{
    id:number;
    owner: User;
    name: string;
    description: string;
    issues: Issue[] | null;
    customer: Customer | null;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}

export interface Issue{
    id:number;
    name: string;
    description: string;
    gitlabTicket: string;
    complexity: string;
    developmentTime: string;
    isDeleted: boolean;
    labels: Label[] | null;
    milestone: Milestone | null;
    priority: string;
    status: string;
    dueDate: Date;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}

export interface Label{
    id: number;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}

export interface Milestone{
    id: number;
    name: string;
}