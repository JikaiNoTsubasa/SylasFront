import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DayTime } from '../../Models/Database/DayTime';
import { SyService } from '../../Services/SyService';
import { NotificationService } from '../../Services/NotificationService';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-time',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './time.component.html',
    styleUrl: './time.component.scss'
})
export class TimeComponent {

  syService = inject(SyService);
  notService = inject(NotificationService);

  timeForm = new FormGroup({
    date: new FormControl('', Validators.required),
    minutes: new FormControl('', Validators.required),
  });

  latestTimes: DayTime[] | null = null;
  loadingLatestTimes: boolean = false;

  ngOnInit(){
    this.refreshMyLatestTimes();
  }

  refreshMyLatestTimes(){
    this.loadingLatestTimes = true;
    this.syService.fetchMyLatestTimes().subscribe({
      next: (times) => {
        this.latestTimes = times;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.loadingLatestTimes = false;
      }
    });
  }

  onAddTime(){
    if (!this.timeForm.valid) return;
    if (this.timeForm.value.date == null || this.timeForm.value.date == undefined || this.timeForm.value.minutes == null || this.timeForm.value.minutes == undefined) return;
    
    this.syService.addTime(this.timeForm.value.date, parseFloat(this.timeForm.value.minutes)).subscribe({
      next: () => {
        this.refreshMyLatestTimes();
      },
      error: (e) => {
        this.notService.error(e.message);
      }
    });
  }
}
