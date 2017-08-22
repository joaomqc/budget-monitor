import {Component} from '@angular/core';
import {Transaction} from '../../model/transaction';
import {isNullOrUndefined} from 'util';
import {TransactionsService} from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  hideTypeMessage = true;
  hideDateMessage = true;
  hideAmountMessage = true;
  type: string;
  amount: number;
  date: string;
  description: string;
  list: Transaction[] = this.transactions.transactions();
  types: string[] = this.transactions.types();
  sortType = 'date';

  constructor(private transactions: TransactionsService) {
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
      this.transactions.addTransaction(new Transaction(this.type, this.amount, new Date(this.date), this.description));
      this.clear();
    }
  }

  clear() {
    this.type = null;
    this.amount = null;
    this.date = null;
    this.description = null;
    this.types = this.transactions.types();
  }

  hideMessages() {
    this.hideTypeMessage = true;
    this.hideDateMessage = true;
    this.hideAmountMessage = true;
  }

  remove(transaction: Transaction) {
    this.transactions.removeTransaction(transaction);
    this.list = this.transactions.transactions();
  }

}
