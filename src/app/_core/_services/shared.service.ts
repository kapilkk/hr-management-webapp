import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sidenavEventSource = new BehaviorSubject<boolean>(true);
  sidenavEvent = this.sidenavEventSource.asObservable();

  private promptEventSource = new BehaviorSubject<any>(null);
  promptEvent = this.promptEventSource.asObservable();

  constructor() { }

  //fucntion to share the sidenav event data across the app, so as to sidenav keep opened or closed
  setSidenavEvent(sidenavEvent: boolean) {
    this.sidenavEventSource.next(sidenavEvent);
  }


  //function to share the event data for pwa installation
  setPromptEvent(promptEvent: any) {
    this.promptEventSource.next(promptEvent);
  }


  //fucntion to get the window reference
  get windowRef() {
    return window;
  }


  //function to format the value into two digit number(actually its a string formatted as number)
  getTwoDigitValue(value) {
    if (value <= 9)
      return "0" + value;

    return "" + value;
  }

  //function to get date in iso format
  getFormattedDate(momentDate: moment.Moment) {
    return `${momentDate.year()}-${this.getTwoDigitValue(momentDate.month() + 1)}-${this.getTwoDigitValue(momentDate.date())}`
  }
}
