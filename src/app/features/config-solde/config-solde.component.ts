import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solde } from 'src/app/fake-data/solde';
import { GestionSoldeService } from 'src/app/services/gestion-solde.service';
import { SharedService } from 'src/app/services/shared.service';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-solde',
  templateUrl: './config-solde.component.html',
  styleUrls: ['./config-solde.component.css']
})
export class ConfigSoldeComponent implements OnInit {
  formulaire: FormGroup;
  soldeValue: number = 0;
  idDocSolde: any;
  user: any;
  newSolde: Solde = {
    id: '',
    solde: 0,
    user: ''
  };

  constructor(
    private formBuilder: FormBuilder, 
    private sharedService: SharedService, 
    private gestionSoldeService: GestionSoldeService,
    private snackBar: MatSnackBar,
    private router: Router
    ) {
    this.formulaire = this.formBuilder.group({
      soldeFormValue: [0, [Validators.required, Validators.min(1)]],
    })
  }

  ngOnInit(): void {
    this.sharedService.sharedUser$.subscribe((val) => {
      console.log("Should have User in ConfigSoldeComponent : ", val);
      this.user = val;
    })
    this.sharedService.sharedIdDocSolde$.subscribe((val) => {
      console.log("Should have IdDocRefSolde in ConfigSoldeComponent : ", val);
      this.idDocSolde = val;
    })
  }

  updateSolde() {
    if(this.idDocSolde === "default") {
      console.log("IdDoc of Solde not found, creating. %c!!! if it's not a first login then it's a bug", 'color: red')
      
      //Create Document
      this.newSolde.user = this.user.email;
      this.gestionSoldeService.create(this.newSolde)
    }
    else {
      console.log("IdDoc of Solde found, updating.")

      //Update Document
      this.newSolde.id = this.idDocSolde;
      this.newSolde.user = this.user.email;
      this.gestionSoldeService.update(this.newSolde);
    }
    this.snackBar.open("Votre budget a été mis à jour", "Fermer",  {duration: 3000, panelClass: ['green-snackbar']})
    this.router.navigate([""])
  }

}
