import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  local_api_url: string = "http://localhost:5000/api";
  prod_api_url: string = "https://hr-management-api.herokuapp.com/api";
  api_url: string = "";

  constructor(private _http: HttpClient, private _router: Router) {
    if (window.location.hostname === "localhost")
      this.api_url = this.local_api_url;
    else
      this.api_url = this.prod_api_url;
  }

  //api function for logging in employee
  login(credentials: any) {
    return this._http.post(`${this.api_url}/auth/signin`, credentials).pipe(catchError(this.handleError));
  }

  //api fucntion to signout employee
  async signout() {
    await this._http.get(`${this.api_url}/auth/signout`).pipe(catchError(this.handleError));
    localStorage.removeItem('jwt');

    this._router.navigate(['/auth/login']);
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
