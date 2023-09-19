import { Component, Input, OnInit } from '@angular/core';
import { GestionSoldeService } from '../gestion-solde.service';
import { solde, Solde } from '../solde';

@Component({
  selector: 'app-mon-solde',
  templateUrl: './mon-solde.component.html',
  styleUrls: ['./mon-solde.component.css']
})
export class MonSoldeComponent implements OnInit {
  constructor(private soldeService: GestionSoldeService) { }
  solde: Solde | undefined;
  ngOnInit() {
    this.soldeService.initSolde(1000);
    
    this.soldeService.getSolde().subscribe(solde => {
      this.solde = solde;
    });
  }
}
