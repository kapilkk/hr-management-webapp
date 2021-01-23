import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/_core/_services/backend.service';

@Component({
  selector: 'app-hr-leaves-summary-employee',
  templateUrl: './hr-leaves-summary-employee.component.html',
  styleUrls: ['./hr-leaves-summary-employee.component.scss']
})
export class HrLeavesSummaryEmployeeComponent implements OnInit {

  employeeData: any;
  leavesSummary: any;

  teamsList: any[] = [
    {
      title: "Business team",
      value: "BUSINESS_TEAM"
    },
    {
      title: "Development team",
      value: "DEVELOPMENT_TEAM"
    }
  ];


  positionsList: any[] = [
    {
      title: "Software Developer",
      value: "SOFTWARE_DEV",
      team: "DEVELOPMENT_TEAM"
    },
    {
      title: "Software Tester",
      value: "SOFTWARE_TESTER",
      team: "DEVELOPMENT_TEAM"
    },
    {
      title: "Project Manager",
      value: "PROJECT_MANAGER",
      team: "DEVELOPMENT_TEAM"
    },
    {
      title: "Human Resource Manager",
      value: "HR_MANAGER",
      team: "BUSINESS_TEAM"
    },
    {
      title: "Marketing Manager",
      value: "MARKETING_MANAGER",
      team: "BUSINESS_TEAM"
    }
  ];

  constructor(private _route: ActivatedRoute, private _backendService: BackendService) { }

  ngOnInit(): void {
    //subscribing to route params
    this._route.params.subscribe(
      (params) => {

        //subscribing to get employee by id api request
        this._backendService.getEmployeeById(params.employeeId).subscribe({
          next: (data: any) => {
            this.employeeData = {
              ...data,
              dob: new Date(data.dob),
              team_name: this.teamsList.filter(team => team.value == data.team)[0].title,
              position_name: this.positionsList.filter(position => position.value == data.position)[0].title
            };
          },
          error: err => {
            console.log("ERROR:", err);
          }
        });

        //subscribing to get current year leaves analytics for by employee id api request
        this._backendService.getLeavesForCurrentYearByEmployeeId(params.employeeId).subscribe({
          next: (data) => {
            this.leavesSummary = data;
          },
          error: err => {
            console.log(err);
          }
        });
      });
  }

}
