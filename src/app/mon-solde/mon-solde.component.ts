import { Component } from '@angular/core';
import { solde } from '../solde';

@Component({
  selector: 'app-mon-solde',
  templateUrl: './mon-solde.component.html',
  styleUrls: ['./mon-solde.component.css']
})
export class MonSoldeComponent {
  monSolde = solde.solde;
}
