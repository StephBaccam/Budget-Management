import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Depense } from '../../fake-data/depense';
import { GestionDepenseService } from '../../services/gestion-depense.service';
import { GestionSoldeService } from '../../services/gestion-solde.service';
import { Solde } from '../../fake-data/solde';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-ajout-depense',
  templateUrl: './ajout-depense.component.html',
  styleUrls: ['./ajout-depense.component.css']
})
export class AjoutDepenseComponent implements OnInit {
  formulaire: FormGroup;
  idDocSolde: any;
  docData: any;
  solde$!: Observable<Solde>;
  solde!: Solde;
  user: any;

  nouvelleDepense: Depense = {
    id: '',
    nom: '',
    prix: 0,
    description: '',
    date: new Date(),
    user:''
  };

  constructor(private depenseService: GestionDepenseService, 
    private soldeService: GestionSoldeService, 
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
    this.formulaire = this.formBuilder.group({
      nom: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(1)]],
      description: [''],
      date: [new Date(), Validators.required]  
    })
   }

  ngOnInit(): void {
    this.sharedService.sharedIdDocSolde$.subscribe((val) => {
      console.log("DocRef in AjoutDepenseComponent", val)
      this.idDocSolde = val;
    })

    this.sharedService.sharedSolde$.subscribe((val) => {
      console.log("Should have Solde in AjoutDepenseComponent : ", val);
      this.solde = val;
    })
    this.sharedService.sharedUser$.subscribe((val) => {
      console.log("Should have User in AjoutDepenseComponent : ", val);
      this.user = val;
    })
  }
  
  clearDepenseForm() {

    this.nouvelleDepense = {
      id: '',
      nom: '',
      prix: 0,
      description: '',
      date: new Date(),
      user:''
    };

    this.formulaire.reset();
    Object.keys(this.formulaire.controls).forEach(key => {
      this.formulaire.get(key)?.setErrors(null);
    })
  }
  
  
  envoyerDepense() {
    this.nouvelleDepense.user = this.user.email;
    this.depenseService.ajoutDepense(this.nouvelleDepense);

    this.solde = {
      solde: this.solde.solde - this.nouvelleDepense.prix,
      user: this.user.email,
      id: this.idDocSolde
    }

    this.soldeService.update(this.solde);
    this.clearDepenseForm();
    this.snackBar.open('Dépense ajouté', "Fermer", {duration: 3000, panelClass: ['green-snackbar']})
  }
}
