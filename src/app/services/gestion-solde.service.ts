//Pas besoin du service pour l'instant

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Solde } from '../fake-data/solde';

@Injectable({
  providedIn: 'root'
})
export class GestionSoldeService {

  constructor() { }
  private soldeSubject = new BehaviorSubject<Solde>({ solde: 0 });

  soldeApresDepense(depensePrix: number) {
    const currentSolde = this.soldeSubject.value;
    const newSolde = { solde: currentSolde.solde - depensePrix };
    this.soldeSubject.next(newSolde);
  }

  getSolde() {
    return this.soldeSubject.asObservable();
  }

  soldeApresSupprDepense(depensePrix: number) {
    const currentSolde = this.soldeSubject.value;
    const newSolde = { solde: currentSolde.solde + depensePrix };
    this.soldeSubject.next(newSolde);
  }

  // Ajoutez une méthode d'initialisation
  initSolde(initialSolde: number) {
    const initialSoldeValue = { solde: initialSolde };
    this.soldeSubject.next(initialSoldeValue);
  }

}
