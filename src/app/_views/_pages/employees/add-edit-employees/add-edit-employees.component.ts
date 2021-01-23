import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/_core/_services/backend.service';
import { SharedService } from 'src/app/_core/_services/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-edit-employees',
  templateUrl: './add-edit-employees.component.html',
  styleUrls: ['./add-edit-employees.component.scss']
})
export class AddEditEmployeesComponent implements OnInit {

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

  employeeForm: FormGroup;
  employee: any;
  isNewEmployee: boolean = true;

  constructor(private _fb: FormBuilder, private _backendService: BackendService,
    private _sharedService: SharedService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    //initializing employee form for add and update
    this.employeeForm = this._fb.group({
      first_name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      last_name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern('[6-9]{1}[0-9]{9}')]],
      dob: ["", Validators.required],
      gender: ["", Validators.required],
      team: ["", Validators.required],
      position: ["", Validators.required],
      salary: ["", Validators.required],
      permanent_address: ["", Validators.required],
      current_address: ["", Validators.required],
      is_address_same: [""]
    });


    //subscribing to route params
    this._route.params.subscribe(
      (params) => {
        if (params.id != 0) {
          this.isNewEmployee = false;

          //subscribing to get employee by id api request
          this._backendService.getEmployeeById(params.id).subscribe({
            next: (data) => {
              //console.log("EMPLOYEE:", data);

              this.employee = data;
              this.editEmployee(data);
            },
            error: err => {
              console.log(err);
            }
          });
        }
      }
    );
  }

  //fucntion to handle the selection of team selection
  onSelectTeam(team_id: string) {
    this.filteredPositionsList = this.positionsList.filter(position => position.team === team_id);
  }


  //function to handle the change in same address checkbox field
  onChangeCheckbox(value) {
    //if its checked then diable the current address input field as permanent address can be used for the same
    if (value) {
      this.employeeForm.controls.current_address.disable();
      this.employeeForm.get("current_address").updateValueAndValidity();
    }
    else {
      this.employeeForm.controls.current_address.enable();
      this.employeeForm.get("current_address").updateValueAndValidity();
    }

  }


  //function to deal with the update employee flow 
  editEmployee(employeeData: any) {
    //patching employee form to pre-populate it with the employee details to be updated
    this.employeeForm.patchValue({
      first_name: employeeData.first_name,
      last_name: employeeData.last_name,
      email: employeeData.email,
      phone: employeeData.phone,
      dob: moment(employeeData.dob),
      gender: employeeData.gender,
      team: employeeData.team,
      position: employeeData.position,
      salary: employeeData.salary,
      permanent_address: employeeData.permanent_address,
      current_address: employeeData.current_address,
      is_address_same: employeeData.is_address_same
    });

    //disabling the email input field, while updating employee as its unique
    //so user should not be allowed to update it
    this.employeeForm.controls.email.disable();
    this.employeeForm.get("email").updateValueAndValidity();

    //setting team in team select input field
    this.onSelectTeam(employeeData.team);

    //setting "is same address" input field
    this.onChangeCheckbox(employeeData.is_address_same);
  }


  //fucntion to handel the form submission for add and update employee
  onSubmitEmployeeForm() {
    const formValue = this.employeeForm.value;


    //creating empoyee object to be sent for add and update employee
    let employee = {
      first_name: formValue.first_name,
      last_name: formValue.last_name,
      email: formValue.email,
      phone: formValue.phone,
      dob: this._sharedService.getFormattedDate(formValue.dob),
      gender: formValue.gender,
      team: formValue.team,
      position: formValue.position,
      salary: formValue.salary,
      permanent_address: formValue.permanent_address,
      current_address: formValue.is_address_same ? formValue.permanent_address : formValue.current_address,
      is_address_same: formValue.is_address_same
    }

    //if employee is new to be added, else existing to be updated
    if (this.isNewEmployee) {
      this._backendService.addEmployee(employee).subscribe({
        next: (data) => {
          //console.log(data);
          this._router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else {
      employee.email = this.employee.email;

      this._backendService.updateEmployee(this.employee._id, employee).subscribe({
        next: (data) => {
          //console.log(data);
          this._router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }

}
