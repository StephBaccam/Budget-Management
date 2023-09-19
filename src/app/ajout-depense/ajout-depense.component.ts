import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Depense, depenses } from '../depense';
import { GestionDepenseService } from '../gestion-depense.service';
import { GestionSoldeService } from '../gestion-solde.service';
import { Solde, solde } from '../solde';

@Component({
  selector: 'app-ajout-depense',
  templateUrl: './ajout-depense.component.html',
  styleUrls: ['./ajout-depense.component.css']
})
export class AjoutDepenseComponent implements OnInit {
  formulaire: FormGroup;
  constructor(private depenseService: GestionDepenseService, private soldeService: GestionSoldeService, private formBuilder: FormBuilder) {
    this.formulaire = this.formBuilder.group({
      nom: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      date: ['', Validators.required]  
    })
   }

  ngOnInit(): void {
    console.log("Initialisation de AjoutDepenseComponent");
  }

  monSolde: Solde = { 
    solde: solde.solde
  };
  
  nouvelleDepense: Depense = {
    id: 0,
    nom: '',
    prix: 0,
    description: '',
    date: new Date()
  };

  envoyerDepense() {
    this.depenseService.ajoutDepense(this.nouvelleDepense);
    // this.monSolde.solde = this.monSolde.solde - this.nouvelleDepense.prix;
    this.soldeService.soldeApresDepense(this.nouvelleDepense.prix);
  }
}
