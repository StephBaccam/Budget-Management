import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonSoldeComponent } from './mon-solde/mon-solde.component';
import { DepensesComponent } from './depenses/depenses.component';
import { AjoutDepenseComponent } from './ajout-depense/ajout-depense.component';
import { ConfigSoldeComponent } from './config-solde/config-solde.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MonSoldeComponent,
    DepensesComponent,
    AjoutDepenseComponent,
    ConfigSoldeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AjoutDepenseComponent },
      { path: 'solde', component: ConfigSoldeComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
