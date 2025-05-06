import { Preferences } from "./Preferences";

export interface User{
    id: number;
    name: string;
    email: string;
    avatar: string;
    street: string;
    city: string;
    zipcode: string;
    country: string;
    levelFrontEnd: number;
    levelBackEnd: number;
    levelTests: number;
    levelManagement: number;
    xpFrontEnd: number;
    xpBackEnd: number;
    xpTests: number;
    xpManagement: number;
    xpPercentFrontEnd: number;
    xpPercentBackEnd: number;
    xpPercentTests: number;
    xpPercentManagement: number;
    preferences: Preferences | null;
    lastConnection: Date;
    canLogin: boolean;
}