import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_core/_services/backend.service';
import { SharedService } from 'src/app/_core/_services/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'hrm-today-leaves',
  templateUrl: './today-leaves.component.html',
  styleUrls: ['./today-leaves.component.scss']
})
export class TodayLeavesComponent implements OnInit {

  leavesList: any[] = [];
  isFetchingData: boolean = true;

  constructor(private _backendService: BackendService, private _sharedService: SharedService) { }

  ngOnInit(): void {
    const momentDate = moment();
    let dateFormatted = this._sharedService.getFormattedDate(momentDate);

    //subscribing to get today's attendance analytics api request
    this._backendService.getTodaysAttendance(dateFormatted).subscribe({
      next: (data: any) => {
        //console.log("TODAYS LEAVES: ", data);
        this.isFetchingData = false;
        this.leavesList = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
