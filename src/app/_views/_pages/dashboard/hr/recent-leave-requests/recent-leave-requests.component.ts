import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_core/_services/backend.service';

@Component({
  selector: 'hrm-recent-leave-requests',
  templateUrl: './recent-leave-requests.component.html',
  styleUrls: ['./recent-leave-requests.component.scss']
})
export class RecentLeaveRequestsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'employee', 'start_date', 'end_date', 'status'];
  leavesDataSource: any[] = [];

  constructor(private _backendService: BackendService,) { }

  ngOnInit(): void {

    //subscribing to get leaves api request
    this._backendService.getLeaves(5).subscribe({
      next: (data: any) => {
        //console.log("RECENT LEAVES: ", data);

        this.leavesDataSource = data.map(leave => {
          return {
            ...leave,
            start_date: new Date(leave.start_date),
            end_date: new Date(leave.end_date)
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
