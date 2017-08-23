import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TransactionData} from './transactionData';
import {Http} from '@angular/http';

export class TransactionDatabase {

  dataChange: BehaviorSubject<TransactionData[]> = new BehaviorSubject<TransactionData[]>([]);

  get data(): TransactionData[] {
    return this.dataChange.value;
  }

  constructor(private http: Http) {
    // this.addTransaction({type: 'Health', amount: 34.4, date: new Date(), description: 'Appointment'});
    // this.addTransaction({type: 'Health', amount: 25.50, date: new Date('2013-06-13T08:45:32'), description: 'Dentist'});
    // this.addTransaction({type: 'Automotive', amount: 214, date: new Date(), description: 'Mechanic'});
    // this.addTransaction({type: 'Automotive', amount: 214, date: new Date(), description: 'Mechanic'});
    // this.addTransaction({type: 'Automotive', amount: 214, date: new Date(), description: 'Mechanic'});
    // this.addTransaction({type: 'Food', amount: 34.59, date: new Date('2017-08-21T09:54:03')});
    this.http.get('/api/transactions').subscribe(res => res.json().data.forEach(t => this.addTransaction(t)));
  }

  addTransaction(transaction: TransactionData) {
    const copiedData = this.data.slice();
    copiedData.push(transaction);
    this.dataChange.next(copiedData);
  }

  removeTransaction(transaction: TransactionData) {
    const index = this.data.indexOf(transaction);
    if (index > -1) {
      const changedData = this.data.slice(index, 1);
      this.dataChange.next(changedData);
    }
  }

}
