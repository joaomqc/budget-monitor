import {Component, OnInit, ViewChild} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {TransactionsService} from '../../services/transactions/transactions.service';
import {TransactionData} from '../../model/transactionData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hideTypeMessage = true;
  hideDateMessage = true;
  hideAmountMessage = true;
  type: string;
  amount: number;
  date: string;
  description: string;

  rows: TransactionData[] = this.transactionsService.database.data;
  types: string[];
  selected = [{}];

  @ViewChild('myTable') table;

  constructor(private transactionsService: TransactionsService) {
  }

  ngOnInit() {
    this.types = this.transactionsService.types();
  }

  submit() {
    this.hideMessages();
    let valid = true;
    if (isNullOrUndefined(this.type) || this.type.trim() === '') {
      this.hideTypeMessage = false;
      valid = false;
    }
    if (isNullOrUndefined(this.amount) || isNaN(this.amount) || this.amount <= 0) {
      this.hideAmountMessage = false;
      valid = false;
    }
    if (isNullOrUndefined(this.date) || isNaN(Date.parse(this.date))) {
      this.hideDateMessage = false;
      valid = false;
    }
    if (valid) {
      this.transactionsService.addTransaction({
        type: this.type,
        amount: this.amount,
        date: new Date(this.date),
        description: this.description
      });
      this.clear();
      this.types = this.transactionsService.types();
    }
  }

  clear() {
    this.type = null;
    this.amount = null;
    this.date = null;
    this.description = null;
  }

  hideMessages() {
    this.hideTypeMessage = true;
    this.hideDateMessage = true;
    this.hideAmountMessage = true;
  }

  removeTransaction(transaction: TransactionData) {
    this.transactionsService.removeTransaction(transaction);
    this.types = this.transactionsService.types();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
