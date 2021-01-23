import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_core/_services/backend.service';

@Component({
  selector: 'hrm-recent-employees',
  templateUrl: './recent-employees.component.html',
  styleUrls: ['./recent-employees.component.scss']
})
export class RecentEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'team_name', 'position_name'];
  employeesDataSource: any[] = [];


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

  constructor(private _backendService: BackendService) { }

  ngOnInit(): void {

    //subscribing to get recent employees api request
    this._backendService.getRecentEmployees().subscribe({
      next: (data: any) => {
        //console.log("RECENT EMPLOYEES: ", data);

        this.employeesDataSource = data.map(employee => {
          return {
            ...employee,
            team_name: this.teamsList.filter(team => team.value == employee.team)[0].title,
            position_name: this.positionsList.filter(position => position.value == employee.position)[0].title
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}


