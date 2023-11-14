import { Component, OnInit } from '@angular/core';
import { Depense, depenses } from '../../fake-data/depense';
import { GestionDepenseService } from '../../services/gestion-depense.service';
import { GestionSoldeService } from '../../services/gestion-solde.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {
  constructor(private depenseService: GestionDepenseService, private soldeService: GestionSoldeService) { }

  depenses: Depense[] = [];
  
  ngOnInit(): void {
    this.depenses = this.depenseService.getDepenses();
  }

  deleteDepense(depense: Depense) {
    this.depenses = this.depenseService.deleteDepense(depense.id);
    this.soldeService.soldeApresSupprDepense(depense.prix);
  }

}
