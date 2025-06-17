import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ResponsePlanningWeek } from '../../Models/Requests/ResponsePlanningWeek';
import { getDatesOfISOWeek, getISOWeekNumber, isSameDay } from '../../Services/Global';
import { SyService } from '../../Services/SyService';
import { PlanningItem } from '../../Models/Database/PlanningItem';

@Component({
  selector: 'planning',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent {

  syService = inject(SyService);

  days: Date[];
  plannings: ResponsePlanningWeek;

  selectedWeek: number;
  selectedYear: number;

  constructor(){
    // Initialize current week and year
    this.selectedWeek = getISOWeekNumber(new Date());
    this.selectedYear = new Date().getFullYear();

    this.refreshData();
  }

  refreshData(){
    this.syService.fetchCurrentWeekPlanning().subscribe({
      next: (data) => {
        this.plannings = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

    // Update days
    this.days = getDatesOfISOWeek(this.selectedWeek, this.selectedYear);


  }

  getPlanItemForDate(date: Date): PlanningItem[]{
    if (!this.plannings || !this.plannings.planningItems) return [];
    return this.plannings.planningItems.filter((item) => item && item.plannedDate && isSameDay(new Date(item.plannedDate), date)).map((item) => item);
  }
}
