import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MonSoldeComponent } from './features/mon-solde/mon-solde.component';
import { DepensesComponent } from './features/depenses/depenses.component';
import { AjoutDepenseComponent } from './features/ajout-depense/ajout-depense.component';
import { ConfigSoldeComponent } from './features/config-solde/config-solde.component';
import { SpinnerComponent } from './features/spinner/spinner.component';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

import { AuthentificationComponent } from './features/authentification/authentification.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { firebaseConfig } from './environments/environment'

import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { MY_DATE_FORMATS } from './tools/date-format';

@NgModule({
  declarations: [
    AppComponent,
    MonSoldeComponent,
    DepensesComponent,
    AjoutDepenseComponent,
    ConfigSoldeComponent,
    AuthentificationComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MomentDateModule,
    MatNativeDateModule,
    MatCardModule,
    MatListModule,
    RouterModule.forRoot([
      { path: '', component: MonSoldeComponent },
      { path: 'solde', component: ConfigSoldeComponent },
      { path: 'login', component: AuthentificationComponent}
    ]),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();
      // if (location.hostname === 'localhost') {
      //   connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      // }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      // if (location.hostname === 'localhost') {
      //   connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      // }
      return firestore;
    }),
    provideStorage(() => {
      const storage = getStorage();
      // if (location.hostname === 'localhost') {
      //   connectStorageEmulator(storage, '127.0.0.1', 5001);
      // }
      return storage;
    }),
  ],
  providers: [ 
  {
    provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
