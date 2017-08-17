import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Transaction} from '../../model/transaction';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  list: Transaction[] = [
    new Transaction('Health', 34.4, 'appointment', new Date()),
    new Transaction('Health', 25.50, 'Dentist', new Date('2013-06-13T08:45:32')),
    new Transaction('Automotive', 214, 'Mechanic'),
    new Transaction('Food', 34.59)
  ];

  type: string;
  amount: number;
  date: Date;
  description: string;

  constructor() {
  }

  submit() {
    if (!isNullOrUndefined(this.type) && !isNullOrUndefined(this.amount) && this.type.trim() !== '' && this.amount > 0) {
      this.list.push(new Transaction(this.type, this.amount, this.description, this.date));
    }
  }

}
