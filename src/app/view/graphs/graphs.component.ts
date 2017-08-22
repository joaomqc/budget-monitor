import {Component} from '@angular/core';
import {TransactionsService} from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent {
  pieChartData: any[] = [];
  lineChartData: any[] = [];

  lineChartXLabel = 'Year';
  lineChartYLabel = 'Total Spent';

  constructor(private transactions: TransactionsService) {
    this.pieChartData = this.transactions.pieChart();
    this.lineChartData = this.transactions.lineChart();
  }

}
