import {Route, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './view/home/home.component';
import {GraphsComponent} from './view/graphs/graphs.component';
import {FormsModule} from '@angular/forms';
import {SuggestComponent} from './view/suggest/suggest.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TransactionsService} from "./services/transactions/transactions.service";
import {OrderByPipe} from "./util/pipes/orderby";

const appRoute: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'graphs', component: GraphsComponent},
  {path: 'suggest', component: SuggestComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GraphsComponent,
    SuggestComponent, OrderByPipe
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, NgxChartsModule, RouterModule.forRoot(appRoute), FormsModule
  ],
  providers: [TransactionsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
