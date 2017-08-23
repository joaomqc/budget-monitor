import {Injectable} from '@angular/core';
import {TransactionDatabase} from '../../model/TransactionDatabase';
import {TransactionData} from '../../model/transactionData';
import {Http} from '@angular/http';

@Injectable()
export class TransactionsService {
  /* private list: Transaction[] = [
     new Transaction('Health', 34.4, new Date(), 'Appointment'),
     new Transaction('Health', 25.50, new Date('2013-06-13T08:45:32'), 'Dentist'),
     new Transaction('Automotive', 214, new Date(), 'Mechanic'),
     new Transaction('Food', 34.59, new Date('2017-08-21T09:54:03'))
   ];
 */

  database;

  constructor(private http: Http) {
    this.database = new TransactionDatabase(http);
  }

  public transactions(): TransactionData[] {
    return this.database.data;
  }

  public addTransaction(transaction: TransactionData) {
    this.database.addTransaction(transaction);
  }

  public removeTransaction(transaction: TransactionData) {
    this.database.removeTransaction(transaction);
  }

  public types(): string[] {
    const types: string[] = [];
    this.database.data.forEach(t => {
      if (types.indexOf(t.type) === -1) {
        types.push(t.type);
      }
    });
    return types;
  }

  public pieChart() {
    const keys: string[] = [];
    const values: number[] = [];
    let i;
    this.database.data.forEach(t => {
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

  public lineChart() {
    const keys = [] = this.types();
    const data = [];
    const currYear = new Date().getFullYear();
    const lowYear = this.database.data.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date === b.date) {
        return 0;
      }
      return 1;
    })[0].date.getFullYear();
    keys.forEach(k => {
      const years = [];
      for (let i = lowYear; i <= currYear; i++) {
        years.push({name: i.toString(), value: 0});
      }
      data.push({name: k, series: years});
    });
    this.database.data.forEach(t => {
      const typeIndex = keys.indexOf(t.type);
      const yearIndex = t.date.getFullYear() - lowYear;
      data[typeIndex].series[yearIndex].value += t.amount;
    });
    console.log(data);
    return data;
  }

  /*  public transactions(): TransactionData[] {
      return this.list;
    }

    public addTransaction(transaction: Transaction) {
      this.list.push(transaction);
    }

    public removeTransaction(transaction: Transaction) {
      const index = this.list.indexOf(transaction);
      if (index > -1) {
        this.list.splice(index, 1);
      }
    }

    public types() {
      const types: string[] = [];
      this.list.forEach(t => {
          if (types.indexOf(t.type) === -1) {
            types.push(t.type);
          }
        }
      )
      ;
      return types;
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

    public lineChart() {
      const keys = [] = this.types();
      const data = [];
      const currYear = new Date().getFullYear();
      const lowYear = this.list.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        } else if (a.date === b.date) {
          return 0;
        }
        return 1;
      })[0].date.getFullYear();
      keys.forEach(k => {
        const years = [];
        for (let i = lowYear; i <= currYear; i++) {
          years.push({name: i.toString(), value: 0});
        }
        data.push({name: k, series: years});
      });
      this.list.forEach(t => {
        const typeIndex = keys.indexOf(t.type);
        const yearIndex = t.date.getFullYear() - lowYear;
        data[typeIndex].series[yearIndex].value += t.amount;
      });
      console.log(data);
      return data;
    }
  */
}
