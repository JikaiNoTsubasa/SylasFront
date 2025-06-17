import { User } from "./User";

export interface PlanningItem{
    id: number;
    name: string;
    description: string | null;
    plannedDate: Date;
    user: User | null;
}