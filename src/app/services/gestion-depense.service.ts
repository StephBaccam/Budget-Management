import { Injectable } from '@angular/core';
import { Depense, depenses } from '../fake-data/depense';

@Injectable({
  providedIn: 'root'
})
export class GestionDepenseService {

  constructor() { }
  items = [...depenses]

  ajoutDepense(depense: Depense) {
    this.items.push(depense);
  }

  getDepenses() {
    return this.items;
  }

  deleteDepense(idDepense: number) {
    const index = this.items.findIndex(x => x.id === idDepense);
    if(index !== -1) {
      this.items.splice(index, 1);
    }
    else {
      console.log("Erreur dans la suppression de la dépense");
    }

    return this.items;
  }
}
