import { PlanningItem } from "../Database/PlanningItem";

export interface ResponsePlanningWeek{
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    week: number;
    year: number;
    planningItems: PlanningItem[];
}