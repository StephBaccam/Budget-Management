import { Component, Input } from '@angular/core';
import { Solde } from '../solde';

@Component({
  selector: 'app-mon-solde',
  templateUrl: './mon-solde.component.html',
  styleUrls: ['./mon-solde.component.css']
})
export class MonSoldeComponent {
  @Input() solde: Solde | undefined;
  
}
