//Pas besoin du service pour l'instant

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solde } from '../fake-data/solde';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, DocumentData, updateDoc, CollectionReference, docData } from '@angular/fire/firestore';
import { SharedService } from './shared.service';

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
    return addDoc(this.soldeCollection, solde);
  }

  update(solde: Solde) {
    const soldeDocumentReference = doc(this.fs, `solde/${solde.id}`)
    this.sharedService.updateSolde(solde);
    return updateDoc(soldeDocumentReference, {...solde});
  }

  delete(id: string) {
    const soldeDocumentReference = doc(this.fs, `solde/${id}`);
    return deleteDoc(soldeDocumentReference);
  }
}
