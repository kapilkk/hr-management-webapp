import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_core/_services/backend.service';

@Component({
  selector: 'app-hr-leaves',
  templateUrl: './hr-leaves.component.html',
  styleUrls: ['./hr-leaves.component.scss']
})
export class HrLeavesComponent implements OnInit {

  leaveRequestsList: any[] = [];
  filteredLeaveRequestList: any[] = [];
  leaveStatusFilter: string;

  dayTypeList: any[] = [
    {
      title: "First half of day",
      value: "FIRST_HALF"
    },
    {
      title: "Second half of day",
      value: "SECOND_HALF"
    },
    {
      title: "Full day",
      value: "FULLDAY"
    },
    {
      title: "Multi day",
      value: "MULTIDAY"
    }
  ];

  leaveTypeList: any[] = [
    {
      title: "Casual",
      value: "CASUAL"
    },
    {
      title: "Sick",
      value: "SICK"
    },
    {
      title: "Earned",
      value: "EARNED"
    }
  ];

  constructor(private _backendService: BackendService) { }

  ngOnInit(): void {
    //subscribing to get all leaves api request
    this._backendService.getLeaves().subscribe({
      next: (data: any) => {
        this.leaveRequestsList = data.map(leave => {
          return {
            ...leave,
            start_date: new Date(leave.start_date),
            end_date: new Date(leave.end_date),
            leave_type_name: this.leaveTypeList.filter(leave_type => leave_type.value == leave.leave_type)[0].title,
            day_type_name: this.dayTypeList.filter(day_type => day_type.value == leave.day_type)[0].title
          }
        });

        this.filteredLeaveRequestList = this.leaveRequestsList.slice(0);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //fucntion to filter the leave requests globally
  leaveStatusGlobalChanged(event) {
    //console.log(event.value);

    this.filteredLeaveRequestList = this.leaveRequestsList.filter(leave => leave.status == event.value);
  }

  //function to reset the filter status and leave requests list
  resetLeaveRequestFilteration() {
    this.filteredLeaveRequestList = this.leaveRequestsList.slice(0);

    this.leaveStatusFilter = "";
  }


  //function to handle the updation of leave status for a leave request
  leaveStatusChanged(event, leave_request) {

    this._backendService.updateLeaveStatus(leave_request._id, { status: event.value }).subscribe(
      {
        next: (data) => {
          this.filteredLeaveRequestList = this.filteredLeaveRequestList
            .map(leave => {
              if (leave._id == leave_request._id)
                return {
                  ...leave,
                  status: event.value
                }
              else
                return leave;
            });
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

}
