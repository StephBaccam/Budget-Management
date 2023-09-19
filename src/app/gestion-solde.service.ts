//Pas besoin du service pour l'instant

import { Injectable } from '@angular/core';
import { solde } from './solde';

@Injectable({
  providedIn: 'root'
})
export class GestionSoldeService {

  constructor() { }
  solde = solde.solde;

  soldeApresDepense(depensePrix: number) {
    this.solde = this.solde - depensePrix;
    return this.solde;
  }

  getSolde() {
    return this.solde
  }

}
