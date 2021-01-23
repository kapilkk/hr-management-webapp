import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BackendService } from 'src/app/_core/_services/backend.service';
import { SharedService } from 'src/app/_core/_services/shared.service';

@Component({
  selector: 'app-c-e-add-edit-leaves',
  templateUrl: './c-e-add-edit-leaves.component.html',
  styleUrls: ['./c-e-add-edit-leaves.component.scss']
})
export class CEAddEditLeavesComponent implements OnInit {

  leaveRequestForm: FormGroup;
  minStartDate: moment.Moment = moment();
  minEndDate: moment.Moment = moment();
  isNewLeaveRequest: boolean = true;
  leaveRequest: any;

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


  constructor(private _fb: FormBuilder, private _sharedService: SharedService,
    private _backendService: BackendService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    //initializing the leave request form for add and udpate it
    this.leaveRequestForm = this._fb.group({
      title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      reason: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(250)]],
      leave_type: ["", Validators.required],
      day_type: ["", Validators.required],
      start_date: [null, Validators.required],
      end_date: [{ value: null, disabled: true }]
    });


    //subscribing to route params
    this._route.params.subscribe(
      (params) => {
        if (params.id != 0) {
          this.isNewLeaveRequest = false;

          this._backendService.getLeaveById(params.id).subscribe({
            next: (data) => {
              this.leaveRequest = data;
              this.editLeaveRequest(data);
            },
            error: err => {
              console.log(err);
            }
          });
        }
      }
    );
  }

  //function to deal with update leave request flow
  editLeaveRequest(leaveRequest: any) {
    this.leaveRequestForm.setValue({
      title: leaveRequest.title,
      reason: leaveRequest.reason,
      leave_type: leaveRequest.leave_type,
      day_type: leaveRequest.day_type,
      start_date: moment(leaveRequest.start_date),
      end_date: moment(leaveRequest.end_date)
    });
  }


  //fucntion to handle the submission of leave request form for add and udpate of the same
  onSubmitLeaveRequestForm() {
    const formValue = this.leaveRequestForm.value;

    //creating leave request object
    let leaveRequest = {
      title: formValue.title,
      reason: formValue.reason,
      leave_type: formValue.leave_type,
      day_type: formValue.day_type,
      start_date: this._sharedService.getFormattedDate(formValue.start_date),
      end_date: formValue.end_date != null ? this._sharedService.getFormattedDate(formValue.end_date) : this._sharedService.getFormattedDate(formValue.start_date)
    }

    //if leave request in new, else existing to be updated
    if (this.isNewLeaveRequest) {
      this._backendService.addLeave(leaveRequest).subscribe({
        next: (data) => {
          this._router.navigate(['leaves/my-leaves']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else {
      this._backendService.updateLeave(this.leaveRequest._id, leaveRequest).subscribe({
        next: (data) => {
          this._router.navigate(['leaves/my-leaves']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


  //filtering of dates for calendar, to exclude saturdays and sundays(assuming those 2 days are weekly holidays)
  myFilter = (d: any | null): boolean => {
    //console.log("DATE", d);

    const day = (d || moment()).day();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  //function to handle the selection of day type
  onSelectDayType(event: any) {
    //if day type is multiday, then enabling the end_date input field and adding validation to it, 
    //else removing validation and disabling it
    //end_date is not applicable to otehr type of day_type
    if (event.value == "MULTIDAY") {
      this.leaveRequestForm.controls.end_date.setValidators(Validators.required);
      this.leaveRequestForm.get("end_date").enable();
      this.leaveRequestForm.get("end_date").updateValueAndValidity();
    }
    else {
      this.leaveRequestForm.controls.end_date.clearValidators();
      this.leaveRequestForm.get("end_date").disable();
      this.leaveRequestForm.get("end_date").updateValueAndValidity();
    }
  }

  //function to handle the changing of start date
  //setting end_date to the same
  onChangeStartDate(type: string, event: any) {
    this.minEndDate = event.value;

    this.leaveRequestForm.patchValue({
      end_date: event.value
    });
  }



}
