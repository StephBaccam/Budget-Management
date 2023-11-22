import { Injectable } from '@angular/core';
import { Depense } from '../fake-data/depense';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionDepenseService {

  constructor(private fs: Firestore) { }
  depenseCollection = collection(this.fs, 'depenses');
  ajoutDepense(depense: Depense) {
    return addDoc(this.depenseCollection, depense);
  }

  getDepenses() {
    const q = query(this.depenseCollection, orderBy("date", "desc"))
    return collectionData(q, {idField:'id'}) as Observable<Depense[]>;
  }

  deleteDepense(idDepense: number) {
    let docRef = doc(this.fs, 'depenses/'+idDepense);
    return deleteDoc(docRef);
  }
}
