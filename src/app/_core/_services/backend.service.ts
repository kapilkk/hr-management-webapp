import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  local_api_url: string = "http://localhost:5000/api";
  prod_api_url: string = "https://hr-management-api.herokuapp.com/api";
  api_url: string = "";

  constructor(private _http: HttpClient) {
    if (window.location.hostname === "localhost")
      this.api_url = this.local_api_url;
    else
      this.api_url = this.prod_api_url;
  }



  //======Employees requests
  //api function to get current employee 
  getCurrentEmployee() {
    return this._http.get(`${this.api_url}/employees/search/current`).pipe(
      catchError(this.handleError)
    );
  }

  //api function to serach employees by name
  searchEmployees(text: string) {
    return this._http.get(`${this.api_url}/employees/search/name?text=${text}`).pipe(
      catchError(this.handleError)
    );
  }

  //api function to get recently enrolled employees
  getRecentEmployees() {
    return this._http.get(`${this.api_url}/employees/search/recent`).pipe(
      catchError(this.handleError)
    );
  }

  //api function to get employee by id
  getEmployeeById(employee_id: string) {
    return this._http.get(`${this.api_url}/employees/${employee_id}`).pipe(
      catchError(this.handleError)
    );
  }

  //api function to enroll an employee
  addEmployee(employee: any) {
    return this._http.post(`${this.api_url}/employees`, employee).pipe(
      catchError(this.handleError)
    );
  }

  //api function to update an employee details
  updateEmployee(employee_id: string, employee: any) {
    return this._http.put(`${this.api_url}/employees/${employee_id}`, employee).pipe(
      catchError(this.handleError)
    );
  }


  //======Analytics requests
  //api function to get employees analytics
  getEmployeesCount() {
    return this._http.get(`${this.api_url}/analytics/employees`).pipe(
      catchError(this.handleError)
    );
  }

  //api function to get attendance analytics
  getTodaysAttendance(date: string) {
    return this._http.get(`${this.api_url}/analytics/attendance?date=${date}`).pipe(
      catchError(this.handleError)
    );
  }

  //api function to get current year leaves analytics by employee id
  getLeavesForCurrentYearByEmployeeId(employee_id: string) {
    return this._http.get(`${this.api_url}/analytics/yearly/employees/${employee_id}`).pipe(
      catchError(this.handleError)
    );
  }

  //api function to get current year leaves analytics for current employee 
  getLeavesForCurrentYearForCurrentEmployee() {
    return this._http.get(`${this.api_url}/analytics/yearly/current`).pipe(
      catchError(this.handleError)
    );
  }


  //======Leaves requests
  //api function to get all leave requests by limit or without it
  getLeaves(limit?: number) {
    if (limit)
      return this._http.get(`${this.api_url}/leaves?limit=${limit}`).pipe(
        catchError(this.handleError)
      );
    else
      return this._http.get(`${this.api_url}/leaves`).pipe(
        catchError(this.handleError)
      );
  }

  //api function to get all leave requests by limit or without it for current employee
  getEmployeeLeaves(limit?: number) {
    if (limit)
      return this._http.get(`${this.api_url}/leaves/employees?limit=${limit}`).pipe(
        catchError(this.handleError)
      );
    else
      return this._http.get(`${this.api_url}/leaves/employees`).pipe(
        catchError(this.handleError)
      );
  }

  //api function to get leave request by id
  getLeaveById(leave_id: string) {
    return this._http.get(`${this.api_url}/leaves/${leave_id}`).pipe(
      catchError(this.handleError)
    );
  }

  //api function to add leave request
  addLeave(leave: any) {
    return this._http.post(`${this.api_url}/leaves`, leave).pipe(
      catchError(this.handleError)
    );
  }

  //api function to update a leave request
  updateLeave(leave_id: string, leave: any) {
    return this._http.patch(`${this.api_url}/leaves/${leave_id}`, leave).pipe(
      catchError(this.handleError)
    );
  }

  //api function to udpate leave request's status
  updateLeaveStatus(leave_id: string, leave: any) {
    return this._http.patch(`${this.api_url}/leaves/${leave_id}/status`, leave).pipe(
      catchError(this.handleError)
    );
  }

  //api function to delete a leave request
  deleteLeave(leave_id: string) {
    return this._http.delete(`${this.api_url}/leaves/${leave_id}`).pipe(
      catchError(this.handleError)
    );
  }



  //function to handle error for api requests
  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      //client error or network error
      errorMessage = err.error.message;
    }
    else {
      //backend returned unsusscessful response code
      errorMessage = err.error;
    }

    return throwError(errorMessage);
  }
}
