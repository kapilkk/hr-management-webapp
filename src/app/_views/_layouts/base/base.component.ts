import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_core/_services/auth.service';
import { BackendService } from 'src/app/_core/_services/backend.service';
import { SharedService } from 'src/app/_core/_services/shared.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isSidenavOpened: boolean = true;
  mode: string = "side";
  promptEvent: any;
  isHR: boolean = false;
  isUser: boolean = false;

  constructor(private _sharedService: SharedService, private _authService: AuthService,
    private _backendService: BackendService, private _breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    //subscribing to shared state of sidenav
    this._sharedService.sidenavEvent.subscribe(
      (data) => {
        this.isSidenavOpened = data;
      });

    //subscribing to promt event for pwa detection
    this._sharedService.promptEvent.subscribe(
      (data) => {
        this.promptEvent = data;
      });


    //subscribing to screen breakpoints to handle the sidenav
    this._breakpointObserver.observe(['(orientation: landscape)']).subscribe(result => {
      /* console.log(result);*/

      if (!result.breakpoints["(orientation: landscape)"])
        this.updateSidenavAttributes("over");
      else
        this.updateSidenavAttributes("side");
    });


    //subscribing to current employee api request
    this._backendService.getCurrentEmployee().subscribe({
      next: (employee: any) => {
        if (employee.role == "HR")
          this.isHR = true;
        else
          this.isUser = true;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  //fucntion to toggle the state of sidenav, by passing it to shared behavior subject
  sidenavToggled() {
    this._sharedService.setSidenavEvent(!this.isSidenavOpened);
  }

  //fucntion to update the mode of sidenav, based on window width
  updateSidenavAttributes(mode: string) {
    this.mode = mode;
    if (mode === "over") {
      this._sharedService.setSidenavEvent(false);
    }
    else if (mode === "side") {
      this._sharedService.setSidenavEvent(true);
    }
  }

  //fucntion to handle the closing of sidenav in over mode
  onSidenavClosedStart() {
    this._sharedService.setSidenavEvent(false);
  }

  //function to handle the signing out from the app
  signout() {
    this._authService.signout();
  }

  //function to prompt UI for pwa install
  installPwa() {
    if (this.promptEvent) {
      this.promptEvent.prompt();

      this.promptEvent.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }

        this.promptEvent = null;
      });
    }
  }

  //function to hide UI for pwa install
  hideBanner() {
    this.promptEvent = null;
  }




}
