import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_core/_services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentEmployee: any;
  employeesCount: any;
  imageUrl: any;

  constructor(private _backendService: BackendService) { }

  ngOnInit(): void {
    //subscribing to get current employee api request
    this._backendService.getCurrentEmployee().subscribe({
      next: (data) => {
        this.currentEmployee = data;

        if (this.currentEmployee.role == 'HR') {
          //subscribing to get employees count analytics api request
          this._backendService.getEmployeesCount().subscribe({
            next: (data: any) => {
              this.employeesCount = data;
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
