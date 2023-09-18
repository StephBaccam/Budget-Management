import { Component } from '@angular/core';
import { Depense, depenses } from '../depense';

@Component({
  selector: 'app-ajout-depense',
  templateUrl: './ajout-depense.component.html',
  styleUrls: ['./ajout-depense.component.css']
})
export class AjoutDepenseComponent {

  items = [...depenses]
  
  nouvelleDepense: Depense = {
    id: 0,
    nom: '',
    prix: 0,
    description: '',
    date: new Date()
  };

  envoyerDepense() {
    this.items.push(this.nouvelleDepense);
  }
}
