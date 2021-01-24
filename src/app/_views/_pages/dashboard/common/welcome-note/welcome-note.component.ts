import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hrm-welcome-note',
  templateUrl: './welcome-note.component.html',
  styleUrls: ['./welcome-note.component.scss']
})
export class WelcomeNoteComponent implements OnInit {

  @Input() currentEmployee: any;

  constructor() { }

  ngOnInit(): void {
  }

}
