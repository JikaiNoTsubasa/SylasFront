import { Customer } from "./Customer";
import { User } from "./User";

export enum IssueStatus {
    NEW,
    ASSIGNED,
    IN_PROGRESS,
    ON_HOLD,
    RESOLVED,
    CLOSED,
    CANCELLED
}

export enum DevelopmentTime{
    SHORT = 'SHORT',
    MEDIUM = 'MEDIUM',
    LONG = 'LONG'
}

export enum Priority{
    LOW,
    MEDIUM,
    HIGH
}

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
    complexity: number; // 1-10
    developmentTime: DevelopmentTime;
    isDeleted: boolean;
    labels: Label[] | null;
    milestone: Milestone | null;
    priority: Priority;
    status: IssueStatus;
    dueDate: Date;
    quests: Quest[] | null;
    activities: IssueActivity[] | null;
    completionPercent: number | null;
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

export interface IssueActivity{
    id: number;
    name: string;
}

export interface Quest{
    id: number;
    name: string;
    description: string;
    xpFrontEnd: number;
    xpBackEnd: number;
    xpTest: number;
    xpManagement: number;
}