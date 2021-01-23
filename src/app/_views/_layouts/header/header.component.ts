import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/_core/_services/backend.service';
import { SharedService } from 'src/app/_core/_services/shared.service';

@Component({
  selector: 'hrm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSidenavOpened: boolean;
  currentEmployeeData: any = null;

  private sidenavSub: Subscription;
  private employeeSub: Subscription;

  constructor(private _sharedService: SharedService, private _backendService: BackendService) { }

  ngOnInit(): void {
    //subscribing to shared sidenav state
    this.sidenavSub = this._sharedService.sidenavEvent.subscribe(
      (data) => {
        //console.log(data);
        this.isSidenavOpened = data;
      });

    //subscribing to current employee api request 
    this.employeeSub = this._backendService.getCurrentEmployee().subscribe({
      next: (data: any) => {
        this.currentEmployeeData = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }


  //function to share toggling of sidenav
  sidenavToggled() {
    this._sharedService.setSidenavEvent(!this.isSidenavOpened);
  }


  //fucntion to unsubscribe to subscriptions
  ngOnDestroy() {
    this.employeeSub && this.employeeSub.unsubscribe();
    this.sidenavSub && this.sidenavSub.unsubscribe();
  }

}
