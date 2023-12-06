import { Component, OnInit } from '@angular/core';
import { GestionSoldeService } from '../../services/gestion-solde.service';
import {  Solde } from '../../fake-data/solde';
import { Observable } from 'rxjs';
import { Firestore, collection, query, where, getDocs, limit } from '@angular/fire/firestore';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-mon-solde',
  templateUrl: './mon-solde.component.html',
  styleUrls: ['./mon-solde.component.css']
})
export class MonSoldeComponent implements OnInit {
  constructor(private soldeService: GestionSoldeService, private fs: Firestore, private sharedService: SharedService) { }
  solde: any;
  solde$!: Observable<Solde>;
  idDocRef: any;
  isSoldeFound: boolean | undefined;

  ngOnInit() {
    this.sharedService.sharedUser$.subscribe((val) => {
      console.log("Should have User : ", val.email);
      if(val.email === undefined) {
        console.log("val is undefined")
      }
      else {
        console.log("val is defined, fetching solde of user")
        this.getUserSolde(val.email);
      }
    })  
  }

  async getUserSolde(user: string) {
    const collectionInstance = collection(this.fs, 'solde');
    console.log("Fetching solde of user : ", user)
    const q = query(collectionInstance, where("user", "==", user), limit(1));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty) {
      console.log("Solde of user not found, must be a first login - User should configure his Solde")
      this.isSoldeFound = false;
    }
    else {
      this.isSoldeFound = true;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.sharedService.updateIdDocSolde(doc.id)  //Initialisation idDoc SharedService pour ne pas réutiliser le query
        this.solde$ = this.soldeService.get(doc.id);
        this.sharedService.updateSolde(doc.data() as Solde); //Initialisation Solde SharedService pour ne pas réutiliser le query
        console.log("this.solde$ onInit : ", this.solde$)
      })
    }
  }
}
