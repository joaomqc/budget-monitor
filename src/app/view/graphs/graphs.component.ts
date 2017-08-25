import {Component} from '@angular/core';
import {TransactionsService} from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent {
  expensesByTypePieChartData: any[] = [];
  expensesByTypeAndYearLineChartData: any[] = [];
  expensesByMonthLineChartData: any[] = [];

  constructor(private transactions: TransactionsService) {
    this.expensesByTypePieChartData = this.transactions.expensesByTypePieChart();
    this.expensesByTypeAndYearLineChartData = this.transactions.expensesByTypeAndYearLineChart();
    this.expensesByMonthLineChartData = this.transactions.expensesByMonthLineChart();
  }

}
