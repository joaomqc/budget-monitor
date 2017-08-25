import {TransactionData} from './transactionData';
import {Http} from '@angular/http';

export class TransactionDatabase {

  data: TransactionData[] = [];

  update(): TransactionData[] {
    // this.http.get('/api/transactions').subscribe(res => this.data = res.json().data);
    return this.data;
  }

  constructor(private http: Http) {
    this.addTransaction({type: 'Health', amount: 34.4, date: new Date(), description: 'Appointment'});
    this.addTransaction({type: 'Health', amount: 25.50, date: new Date('2013-06-13T08:45:32'), description: 'Dentist'});
    this.addTransaction({type: 'Automotive', amount: 214, date: new Date(), description: 'Mechanic'});
    this.addTransaction({type: 'Automotive', amount: 214, date: new Date(), description: 'Mechanic'});
    this.addTransaction({type: 'Automotive', amount: 214, date: new Date(), description: 'Mechanic'});
    this.addTransaction({type: 'Food', amount: 34.59, date: new Date('2017-08-21T09:54:03')});
  }

  addTransaction(transaction: TransactionData) {
    this.update();
    this.data.push(transaction);
    this.data.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date === b.date) {
        return 0;
      }
      return -1;
    });
  }

  removeTransaction(transaction: TransactionData) {
    this.update();
    const index = this.data.indexOf(transaction);
    if (index > -1) {
      this.data.splice(index, 1);
    }
  }

}
