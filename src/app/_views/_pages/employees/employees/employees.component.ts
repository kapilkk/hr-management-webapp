import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_core/_services/backend.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class EmployeesComponent implements OnInit {

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

  filteredPositionsList: any[] = [];

  searchedText: string = "";
  filterCategories: any = {
    gender: "",
    team: "",
    position: ""
  };

  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'dob', 'gender'];
  employeesDataSource: any[] = [];
  filteredEmployeesDataSource: any[] = [];

  constructor(private _backendService: BackendService) { }

  ngOnInit(): void {

  }

  //function to handle the selction of team, to create list of positions for the same
  onSelectTeam(team_id: string) {
    this.filteredPositionsList = this.positionsList.filter(position => position.team === team_id);
  }


  //function to handle the submission of search employee
  onSearchEmployee() {
    //console.log(this.searchedText);

    this.filterCategories = {
      gender: "",
      team: "",
      position: ""
    };

    //subscribing to seach employee api request
    this._backendService.searchEmployees(this.searchedText).subscribe({
      next: (data: any) => {
        //console.log("EMPLOYEES: ", data);

        this.employeesDataSource = data.map(employee => {
          return {
            ...employee,
            dob: new Date(employee.dob),
            team_name: this.teamsList.filter(team => team.value == employee.team)[0].title,
            position_name: this.positionsList.filter(position => position.value == employee.position)[0].title
          }
        });

        this.filteredEmployeesDataSource = this.employeesDataSource;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //function to handel the filtering of employees list, on the basis of filter categories
  onFilterEmployees() {
    //console.log("ON FILTER", this.filterCategories);

    this.filteredEmployeesDataSource = this.employeesDataSource.filter(employee => {
      if (employee.gender === this.filterCategories.gender &&
        employee.team === this.filterCategories.team &&
        employee.position === this.filterCategories.position)
        return employee;
    });

  }

}
