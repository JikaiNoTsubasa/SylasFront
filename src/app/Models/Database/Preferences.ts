import { User } from "./User";

export interface Preferences {
    id: number;
    name: string;
    user: User | null;
    timeHistory: string;
    timeChartMonth: number;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
}