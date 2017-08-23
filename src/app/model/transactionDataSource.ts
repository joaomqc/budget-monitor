import {DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Rx';
import {TransactionData} from './transactionData';
import {TransactionDatabase} from './TransactionDatabase';
import {MdPaginator} from '@angular/material';

export class TransactionDataSource extends DataSource<any> {

  constructor(private transactionsDatabase: TransactionDatabase, private paginator: MdPaginator) {
    super();
  }

  connect(): Observable<TransactionData[]> {
    const displayDataChanges = [this.transactionsDatabase.dataChange, this.paginator.page];
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.transactionsDatabase.data.slice();
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect() {
  }

}
