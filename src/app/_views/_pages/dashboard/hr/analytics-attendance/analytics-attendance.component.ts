import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { BackendService } from 'src/app/_core/_services/backend.service';
import { SharedService } from 'src/app/_core/_services/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'hrm-analytics-attendance',
  templateUrl: './analytics-attendance.component.html',
  styleUrls: ['./analytics-attendance.component.scss']
})
export class AnalyticsAttendanceComponent implements OnInit {

  @Input() employeesCount: any;

  attendanceChartLabels: Label[] = ['Absent', 'Present', 'All'];
  attendanceChartData: MultiDataSet = [];
  attendanceChartType: ChartType = 'doughnut';

  constructor(private _backendService: BackendService, private _sharedService: SharedService) { }

  ngOnInit(): void {
    const momentDate = moment();
    let dateFormatted = this._sharedService.getFormattedDate(momentDate);

    //subscribing to get today's attendance analytics api request
    this._backendService.getTodaysAttendance(dateFormatted).subscribe({
      next: (data: any) => {
        this.attendanceChartData = [
          [data.length, this.employeesCount.male + this.employeesCount.female - data.length, this.employeesCount.male + this.employeesCount.female]
        ];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
