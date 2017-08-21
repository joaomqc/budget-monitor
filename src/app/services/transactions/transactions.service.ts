import {Injectable} from '@angular/core';
import {Transaction} from '../../model/transaction';

@Injectable()
export class TransactionsService {
  private list: Transaction[] = [
    new Transaction('Health', 34.4, 'appointment', new Date()),
    new Transaction('Health', 25.50, 'Dentist', new Date('2013-06-13T08:45:32')),
    new Transaction('Automotive', 214, 'Mechanic'),
    new Transaction('Food', 34.59)
  ];

  constructor() {
  }

  public transactions(): Transaction[] {
    return this.list;
  }

  public addTransaction(transaction: Transaction) {
    this.list.push(transaction);
  }

  public pieChart() {
    const keys: string[] = [];
    const values: number[] = [];
    let i;
    this.list.forEach(t => {
      i = keys.indexOf(t.type);
      if (i > -1) {
        values[i] += t.amount;
      } else {
        keys.push(t.type);
        values.push(t.amount);
      }
    });
    const array: any[] = [];
    for (i = 0; i < keys.length; i++) {
      array.push({name: keys[i], value: values[i]});
    }
    return array;
  }

}
