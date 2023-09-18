import { Injectable } from '@angular/core';
import { Depense, depenses } from './depense';

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
}
