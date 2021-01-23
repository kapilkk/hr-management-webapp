import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/_services/auth.service';
import { SharedService } from 'src/app/_core/_services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isError: boolean = false;
  errorMessage: string;

  constructor(private _authService: AuthService, private _router: Router,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    //initialing login form
    this.loginForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  //function to handle google login
  onSubmitLoginForm() {
    this.isError = false;
    this.errorMessage = "";

    //subscribing to login api request
    this._authService.login(this.loginForm.value).subscribe({
      next: (user: any) => {
        if (user && user.token) {
          //setting token to local storage
          localStorage.setItem("jwt", JSON.stringify(user.token));

          //redirecting to dashboard
          this._router.navigate(['/dashboard']);
        }
      },
      error: err => {
        this.isError = true;
        this.errorMessage = err.error;
      }
    });
  }

}
