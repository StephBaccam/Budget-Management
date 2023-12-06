import { Injectable } from '@angular/core';
import { Depense } from '../fake-data/depense';
import { Firestore, collection, collectionData, deleteDoc, doc, orderBy, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class GestionDepenseService {
  constructor(private fs: Firestore) { }
  depenseCollection = collection(this.fs, 'depenses');

  async ajoutDepense(depense: Depense) {
    const id = uuidv4();
    depense.id = id;
    console.log("Depense created");
    return await setDoc(doc(this.fs, "depenses", depense.id), depense);
  }

  getDepenses() {
    const q = query(this.depenseCollection, orderBy("date", "desc"))
    return collectionData(q, {idField:'id'}) as Observable<Depense[]>;
  }

  deleteDepense(idDepense: string) {
    console.log("Depense deleted");
    let docRef = doc(this.fs, 'depenses/'+idDepense);
    return deleteDoc(docRef);
  }
}
