import { Component, OnInit } from '@angular/core';
import {UserRegistration} from '../../../../shared/models/user.registration';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    user: UserRegistration;
  constructor() { }

  ngOnInit() {
  }

}
