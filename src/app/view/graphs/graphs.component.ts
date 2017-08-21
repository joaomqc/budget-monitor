import {Component} from '@angular/core';
import {TransactionsService} from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent {
  single: any[];

  view: any[] = [700, 400];

  // options
  showLegend = true;

  // pie
  showLabels = true;

  constructor(private transactions: TransactionsService) {
    const single = transactions.pieChart();
    Object.assign(this, {single});
  }

  onSelect(event) {
    console.log(event);
  }
}
