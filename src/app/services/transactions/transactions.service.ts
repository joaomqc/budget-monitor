import {Injectable} from '@angular/core';
import {TransactionDatabase} from '../../model/TransactionDatabase';
import {TransactionData} from '../../model/transactionData';
import {Http} from '@angular/http';

@Injectable()
export class TransactionsService {

  database: TransactionDatabase;

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

  public expensesByTypePieChart() {
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

  public expensesByTypeAndYearLineChart() {
    const keys = [] = this.types();
    const data = [];
    const years = this.yearSpan();
    keys.forEach(k => {
      const series = [];
      years.forEach(y => {
        series.push({name: y.toString(), value: 0});
      });
      data.push({name: k, series: series});
    });
    this.database.data.forEach(t => {
      const typeIndex = keys.indexOf(t.type);
      const yearIndex = t.date.getFullYear() - years[0];
      data[typeIndex].series[yearIndex].value += t.amount;
    });
    return data;
  }

  public expensesByMonthLineChart() {
    const data = [];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    const years = this.yearSpan();
    years.forEach(y => {
      const series = [];
      months.forEach(m => {
        series.push({name: m, value: 0});
      });
      data.push({name: y.toString(), series: series});
    });
    this.transactions().forEach(t => {
      data[t.date.getFullYear() - years[0]].series[t.date.getMonth()].value += t.amount;
    });
    return data;
  }

  private yearSpan() {
    const years = [];
    const currYear = new Date().getFullYear();
    const lowYear = this.database.data.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date === b.date) {
        return 0;
      }
      return 1;
    })[0].date.getFullYear();
    for (let i = lowYear; i <= currYear; i++) {
      years.push(i);
    }
    return years;
  }

}
