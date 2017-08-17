import { Route, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GraphsComponent } from './graphs/graphs.component';
import {FormsModule} from '@angular/forms';
import { SuggestComponent } from './suggest/suggest.component';

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
    SuggestComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoute), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
