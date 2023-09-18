import { Component, OnInit } from '@angular/core';
import { Depense, depenses } from '../depense';
import { GestionDepenseService } from '../gestion-depense.service';

@Component({
  selector: 'app-ajout-depense',
  templateUrl: './ajout-depense.component.html',
  styleUrls: ['./ajout-depense.component.css']
})
export class AjoutDepenseComponent implements OnInit {
  constructor(private depenseService: GestionDepenseService) { }

  ngOnInit(): void {
    console.log("Initialisation de AjoutDepenseComponent");
  }
  
  nouvelleDepense: Depense = {
    id: 0,
    nom: '',
    prix: 0,
    description: '',
    date: new Date()
  };

  envoyerDepense() {
    this.depenseService.ajoutDepense(this.nouvelleDepense);
  }
}
