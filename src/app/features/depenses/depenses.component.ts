import { Component, OnInit, inject } from '@angular/core';
import { Depense } from '../../fake-data/depense';
import { GestionDepenseService } from '../../services/gestion-depense.service';
import { GestionSoldeService } from '../../services/gestion-solde.service';
import { Observable } from 'rxjs';
import { Solde } from 'src/app/fake-data/solde';
import { SharedService } from 'src/app/services/shared.service';
import { Auth, user } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {
  constructor(private depenseService: GestionDepenseService, 
    private soldeService: GestionSoldeService, 
    private sharedService: SharedService,
    private snackBar: MatSnackBar) { }

  depenses: Depense[] = [];
  idDocRef: any;
  docData: any;
  solde$!: Observable<Solde>
  solde: any;
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  user:any;
  
  
  ngOnInit(): void {
    this.refreshDepense();
    this.sharedService.sharedIdDocSolde$.subscribe((val) => {
      console.log("val in DepenseComponent", val)
      this.idDocRef = val;
    })

    this.sharedService.sharedSolde$.subscribe((val) => {
      console.log("Should have Solde : ", val);
      this.solde = val;
    })

    this.sharedService.sharedUser$.subscribe((val) => {
      console.log("Should have User : ", val);
      this.user = val;
    })
  }

  refreshDepense() {
    this.depenseService.getDepenses().subscribe((res) => {
      this.depenses = res.filter(x => x.user == this.user.email)
    });
  }

  deleteDepense(depense: Depense) {
    this.depenseService.deleteDepense(depense.id).then((res) => {
      console.log('Res deleted from Firestore', res)
    });

    this.solde = {
      solde: this.solde.solde + depense.prix,
      user: this.user.email,
      id: this.idDocRef
    }

    this.soldeService.update(this.solde);
    this.snackBar.open('Dépense supprimée', "Fermer", { duration: 3000, panelClass: ['red-snackbar']})
  }
}
