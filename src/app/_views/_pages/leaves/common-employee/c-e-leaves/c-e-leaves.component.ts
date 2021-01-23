import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/_core/_services/backend.service';

@Component({
  selector: 'app-c-e-leaves',
  templateUrl: './c-e-leaves.component.html',
  styleUrls: ['./c-e-leaves.component.scss']
})
export class CELeavesComponent implements OnInit {

  displayedColumns: string[] = ['title', 'start_date', 'end_date', 'status', 'actions'];
  filteredLeavesDataSource: any[] = [];
  leavesDataSource: MatTableDataSource<any>;
  leaveStatusFilter: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _backendService: BackendService, private _router: Router) { }

  ngOnInit(): void {
    //subscribing to get employee leaves api request
    this._backendService.getEmployeeLeaves().subscribe({
      next: (data: any) => {
        //console.log("RECENT LEAVES: ", data);

        const finalData = data.map(leave => {
          return {
            ...leave,
            start_date: new Date(leave.start_date),
            end_date: new Date(leave.end_date)
          }
        });

        this.leavesDataSource = new MatTableDataSource(finalData);
        this.leavesDataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  //function to handle redirection to edit leave request route
  onEditLeaveRequest(leave_request_id: string) {
    this._router.navigate(['leaves/edit', leave_request_id]);
  }


  //function to handle the deletion of leave request
  onDeleteLeaveRequest(leave_request_id: string) {
    this._backendService.deleteLeave(leave_request_id).subscribe({
      next: (data) => {
        //console.log(data);
        this.leavesDataSource.data = this.leavesDataSource.data.filter(leave => leave._id != leave_request_id);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
