import { Component, OnInit } from '@angular/core';
import { Depense } from '../../fake-data/depense';
import { GestionDepenseService } from '../../services/gestion-depense.service';
import { GestionSoldeService } from '../../services/gestion-solde.service';
import { Observable } from 'rxjs';
import { Solde } from 'src/app/fake-data/solde';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {
  constructor(private depenseService: GestionDepenseService, private soldeService: GestionSoldeService, private sharedService: SharedService) { }

  depenses: Depense[] = [];
  idDocRef: any;
  docData: any;
  solde$!: Observable<Solde>
  solde: any;
  
  ngOnInit(): void {
    this.refreshDepense();
    this.sharedService.sharedIdDocRefSolde$.subscribe((val) => {
      console.log("val in DepenseComponent", val)
      this.idDocRef = val;
    })

    this.sharedService.sharedSolde$.subscribe((val) => {
      console.log("Should have Solde : ", val);
      this.solde = val;
    })
  }

  refreshDepense() {
    this.depenseService.getDepenses().subscribe((res) => {
      this.depenses = res;
    });
  }

  deleteDepense(depense: Depense) {
    this.depenseService.deleteDepense(depense.id).then((res) => {
      console.log('Res deleted from Firestore', res)
    });

    this.solde = {
      solde: this.solde.solde + depense.prix,
      user: 'stephane.baccam1@gmail.com',
      id: this.idDocRef
    }

    this.soldeService.update(this.solde);
  }
}
