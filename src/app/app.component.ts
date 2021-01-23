import { Component } from '@angular/core';
import { SharedService } from './_core/_services/shared.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _updates: SwUpdate, private _sharedService: SharedService) {
    //checking the latest version of pwa app and reloading the page if available
    this._updates.available.subscribe(event => {
      this._updates.activateUpdate().then(() => document.location.reload());
    });

    //listener to check if webapp is pwa enabled, end emits the event for the same
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();

      //event if shared with shared service to be usedd in base component or any other component
      this._sharedService.setPromptEvent(event);
    });
  }
}
