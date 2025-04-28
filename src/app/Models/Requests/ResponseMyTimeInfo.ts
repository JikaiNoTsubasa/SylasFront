export interface ResponseMyTimeInfo{
    totalTimeBalance: number;
    totalEntries: number;
    moyBalance: number;
    monthTimeBalance: number;
    totalByMonth: ResponseTotalByMonth[];
}

export interface ResponseTotalByMonth{
    month: string;
    total: number;
    year: number;
}