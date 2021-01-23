import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_core/_services/backend.service';

@Component({
  selector: 'hrm-c-e-analytics-leaves-yearly',
  templateUrl: './c-e-analytics-leaves-yearly.component.html',
  styleUrls: ['./c-e-analytics-leaves-yearly.component.scss']
})
export class CEAnalyticsLeavesYearlyComponent implements OnInit {

  leavesSummary: any;

  constructor(private _backendService: BackendService) { }

  ngOnInit(): void {

    //subscribing to get current year's leaves analytics for current employee api request
    this._backendService.getLeavesForCurrentYearForCurrentEmployee().subscribe({
      next: (data) => {
        //console.log("LEAVE REQ:", data);
        this.leavesSummary = data;
      },
      error: err => {
        console.log(err);
      }
    });

  }

}
