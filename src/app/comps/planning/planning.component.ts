import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { ResponsePlanningWeek } from '../../Models/Requests/ResponsePlanningWeek';
import { getDatesOfISOWeek, getISOWeekNumber, isSameDay } from '../../Services/Global';
import { SyService } from '../../Services/SyService';
import { PlanningItem } from '../../Models/Database/PlanningItem';
import { PopupService } from '../../Services/PopupService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'planning',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent {

  syService = inject(SyService);
  popupService = inject(PopupService);

  days: Date[];
  plannings: ResponsePlanningWeek;

  selectedWeek: number;
  selectedYear: number;

  formAddPlan = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(){
    // Initialize current week and year
    this.selectedWeek = getISOWeekNumber(new Date());
    this.selectedYear = new Date().getFullYear();

    this.refreshData();
  }

  refreshData(){
    this.syService.fetchWeekPlanning(this.selectedWeek, this.selectedYear).subscribe({
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

  nextWeek(){
    this.selectedWeek += 1;
    if (this.selectedWeek > 52){
      this.selectedWeek = 1;
      this.selectedYear += 1;
    }
    this.refreshData();
  }

  previousWeek(){
    this.selectedWeek -= 1;
    if (this.selectedWeek < 1){
      this.selectedWeek = 52;
      this.selectedYear -= 1;
    }
    this.refreshData();
  }

  getPlanItemForDate(date: Date): PlanningItem[]{
    if (!this.plannings || !this.plannings.planningItems) return [];
    return this.plannings.planningItems.filter((item) => item && item.plannedDate && isSameDay(new Date(item.plannedDate), date)).map((item) => item);
  }

  openAddPlanningItemModal(template: TemplateRef<any>, context: any = {}, currentDate: Date = new Date()) {
    // console.log(currentDate);
    this.formAddPlan.reset();
    this.formAddPlan.patchValue(
      {
        date: this.formatDateForInput(currentDate),
      }
    )
    this.popupService.open(template, context);
  }

  selectedItem: PlanningItem | null = null;

  openEditPlanningItemModal(template: TemplateRef<any>, context: any = {}, item: PlanningItem) {
    this.selectedItem = item;
    this.formAddPlan.reset();
    this.formAddPlan.patchValue(
      {
        name: item.name,
        date: this.formatDateForInput(new Date(item.plannedDate)),
        description: item.description,
      }
    )
    this.popupService.open(template, context);
  }

  deleteCurrentItem(){
    if (this.selectedItem){
      this.syService.deletePlan(this.selectedItem.id).subscribe({
        next: (data) => {
          this.popupService.close();
          this.refreshData();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  onSubmitAddPlan(){
    if (this.formAddPlan.valid){
      let name: string = this.formAddPlan.value.name ?? "Default Name";
      let date: string = this.formAddPlan.value.date ?? new Date().toISOString();
      let description: string = this.formAddPlan.value.description ?? "";
      this.syService.createPlan(name, date, description).subscribe({
        next: (data) => {
          this.popupService.close();
          this.refreshData();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  onSubmitUpdatePlan(){
    if (this.formAddPlan.valid && this.selectedItem){
      let name: string = this.formAddPlan.value.name ?? "Default Name";
      let date: string = this.formAddPlan.value.date ?? new Date().toISOString();
      let description: string = this.formAddPlan.value.description ?? "";
      this.syService.updatePlan(this.selectedItem.id, name, date, description).subscribe({
        next: (data) => {
          this.popupService.close();
          this.refreshData();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
