import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DayTime } from '../../Models/Database/DayTime';
import { SyService } from '../../Services/SyService';
import { NotificationService } from '../../Services/NotificationService';
import { CommonModule } from '@angular/common';
import { ResponseMyTimeInfo } from '../../Models/Requests/ResponseMyTimeInfo';
import { TohoursPipe } from '../../pipes/tohours.pipe';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
    selector: 'app-time',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, TohoursPipe, BaseChartDirective],
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

  myTimeData: ResponseMyTimeInfo | null = null;

  barChartData: ChartData<'bar'>;
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        
      },
      y: {
        //min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  ngOnInit(){
    this.refreshMyLatestTimes();
    this.refreshTimeData();
  }

  refreshChart(){
    let labels: string[] = [];
    let data: number[] = [];
    this.myTimeData?.totalByMonth.forEach((tot) => {
      labels.push(`${tot.month}-${tot.year}`);
      data.push(tot.total);
    });
    this.barChartData = {
      labels: labels,
      datasets: [
        { 
          data: data,
          label: 'Minutes',
          backgroundColor: ['#1D201D']
        }
      ],
    };
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
    if (this.timeForm.value.date == null || this.timeForm.value.date == undefined || this.timeForm.value.minutes == null || this.timeForm.value.minutes == undefined){
      this.notService.error("Could not validate form");
      return;
    }
    
    this.syService.addTime(this.timeForm.value.date, parseFloat(this.timeForm.value.minutes)).subscribe({
      next: () => {
        this.refreshMyLatestTimes();
        this.refreshTimeData();
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.notService.info("Added date "+this.timeForm.value.date+" - "+this.timeForm.value.minutes+"mins");
      },
    });
  }

  refreshTimeData(){
    this.syService.getMyTimeInfo().subscribe({
      next: (data) => {
        this.myTimeData = data;
      },
      error: (err) => {
        this.notService.error(err.message);
      },
      complete: () => {
        this.refreshChart();

      }
    })
  }

}
