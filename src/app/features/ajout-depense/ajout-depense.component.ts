import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Depense } from '../../fake-data/depense';
import { GestionDepenseService } from '../../services/gestion-depense.service';
import { GestionSoldeService } from '../../services/gestion-solde.service';
import { Solde } from '../../fake-data/solde';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ajout-depense',
  templateUrl: './ajout-depense.component.html',
  styleUrls: ['./ajout-depense.component.css']
})
export class AjoutDepenseComponent implements OnInit {
  formulaire: FormGroup;
  idDocRef: any;
  docData: any;
  solde$!: Observable<Solde>;
  solde!: Solde;
  constructor(private depenseService: GestionDepenseService, 
    private soldeService: GestionSoldeService, 
    private sharedService: SharedService,
    private formBuilder: FormBuilder) {
    this.formulaire = this.formBuilder.group({
      nom: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(1)]],
      description: [''],
      date: [(new Date()).toISOString().substring(0,10), Validators.required]  
    })
   }

  ngOnInit(): void {
    this.sharedService.sharedIdDocRefSolde$.subscribe((val) => {
      console.log("DocRef in AjoutDepenseComponent", val)
      this.idDocRef = val;
    })

    this.sharedService.sharedSolde$.subscribe((val) => {
      console.log("Should have Solde in AjoutDepenseComponent : ", val);
      this.solde = val;
    })
  }
  
  nouvelleDepense: Depense = {
    id: 0,
    nom: '',
    prix: 0,
    description: '',
    date: new Date()
  };
  
  envoyerDepense() {
    this.nouvelleDepense.date = new Date(this.nouvelleDepense.date);
    this.depenseService.ajoutDepense(this.nouvelleDepense).then((res) => {
      console.log('Res added to Firestore', res);
    })

    this.solde = {
      solde: this.solde.solde - this.nouvelleDepense.prix,
      user: 'stephane.baccam1@gmail.com',
      id: this.idDocRef
    }

    this.soldeService.update(this.solde);
  }
}
