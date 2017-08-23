import {Component, OnInit, ViewChild} from '@angular/core';
import {Transaction} from '../../model/transaction';
import {isNullOrUndefined} from 'util';
import {TransactionsService} from '../../services/transactions/transactions.service';
import {TransactionDataSource} from '../../model/transactionDataSource';
import {TransactionDatabase} from '../../model/TransactionDatabase';
import {MdPaginator} from '@angular/material';

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
  // list: Transaction[] = this.transactions.transactions();
  // types: string[] = this.transactions.types();
  // sortType = 'date';

  database: TransactionDatabase = this.transactionsService.database;
  dataSource: TransactionDataSource | null;
  displayedColumns = ['type', 'amount', 'date'];
  currency = '€ ';
  types: string[];

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private transactionsService: TransactionsService) {
  }

  ngOnInit() {
    this.dataSource = new TransactionDataSource(this.database, this.paginator);
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
      // this.transactions.addTransaction(new Transaction(this.type, this.amount, new Date(this.date), this.description));
      this.transactionsService.addTransaction({
        type: this.type,
        amount: this.amount,
        date: new Date(this.date),
        description: this.description
      });
      this.clear();
      // this.types = this.transactions.types();
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

  remove(transaction: Transaction) {
    this.transactionsService.removeTransaction(transaction);
    this.types = this.transactionsService.types();
    // this.list = this.transactions.transactions();
  }

}
