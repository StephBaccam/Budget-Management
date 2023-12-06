//Pas besoin du service pour l'instant

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solde } from '../fake-data/solde';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, DocumentData, updateDoc, CollectionReference, docData, setDoc } from '@angular/fire/firestore';
import { SharedService } from './shared.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class GestionSoldeService {
  private soldeCollection: CollectionReference<DocumentData>

  constructor(private fs: Firestore, private sharedService: SharedService) { 
    this.soldeCollection = collection(this.fs, 'solde');
  }

  getAll() {
    return collectionData(this.soldeCollection, {idField:'id'}) as Observable<Solde[]>
  }

  get(id: string) {
    const soldeDocumentReference = doc(this.fs, `solde/${id}`);
    return docData(soldeDocumentReference, {idField: 'id'}) as Observable<Solde>;
  }

  create(solde: Solde) {
    const id = uuidv4();
    solde.id = id;
    console.log("Solde created")
    //Create with a code-generated UUID for easy document tracking
    return setDoc(doc(this.fs, 'solde', solde.id), solde)
  }

  update(solde: Solde) {
    const soldeDocumentReference = doc(this.fs, `solde/${solde.id}`)
    this.sharedService.updateSolde(solde);
    console.log("Solde updated")
    return updateDoc(soldeDocumentReference, {...solde});
  }

  delete(id: string) {
    const soldeDocumentReference = doc(this.fs, `solde/${id}`);
    return deleteDoc(soldeDocumentReference);
  }
}
