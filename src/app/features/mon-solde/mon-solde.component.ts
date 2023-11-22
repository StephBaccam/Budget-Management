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

  ngOnInit() {
    this.getUserSolde('stephane.baccam1@gmail.com') //A CHANGER
  }

  async getUserSolde(user: string) {
    const collectionInstance = collection(this.fs, 'solde');
    const q = query(collectionInstance, where("user", "==", user), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.sharedService.updateIdDocRefSolde(doc.id)  //Initialisation idDocRef SharedService pour ne pas réutiliser le query
      this.solde$ = this.soldeService.get(doc.id);
      this.sharedService.updateSolde(doc.data() as Solde); //Initialisation Solde SharedService pour ne pas réutiliser le query
      console.log("this.solde$ onInit : ", this.solde$)
    })
  }
}
