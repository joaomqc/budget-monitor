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

  type: string;
  amount: number;
  date: Date;
  description: string;
  list: Transaction[] = this.transactions.transactions();

  constructor(private transactions: TransactionsService) {

  }

  submit() {
    if (!isNullOrUndefined(this.type) && !isNullOrUndefined(this.amount) && this.type.trim() !== '' && this.amount > 0) {
      this.transactions.addTransaction(new Transaction(this.type, this.amount, this.description, this.date));
    }
  }

}
