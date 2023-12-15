import { Injectable } from '@angular/core';
import { collectionData, docData, CollectionReference, DocumentData, doc, setDoc, updateDoc, deleteDoc, Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
import { Feedback } from '../fake-data/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackCollection: CollectionReference<DocumentData>

  constructor(private fs: Firestore, private sharedService: SharedService) { 
    this.feedbackCollection = collection(this.fs, 'feedback');
  }

  getAll() {
    return collectionData(this.feedbackCollection, {idField:'id'}) as Observable<Feedback[]>
  }

  get(id: string) {
    const feedbackDocumentReference = doc(this.fs, `feedback/${id}`);
    return docData(feedbackDocumentReference, {idField: 'id'}) as Observable<Feedback>;
  }

  create(feedback: Feedback) {
    //Fonction à changer, mais l'import UUID ne fonctionne pas...
    feedback.id = Math.floor(Math.random() * 500000).toString();
    //Create with a code-generated UUID for easy document tracking
    return setDoc(doc(this.fs, 'feedback', feedback.id), feedback)
  }

  update(feedback: Feedback) {
    const feedbackDocumentReference = doc(this.fs, `feedback/${feedback.id}`)
    return updateDoc(feedbackDocumentReference, {...feedback});
  }

  delete(id: string) {
    const feedbackDocumentReference = doc(this.fs, `feedback/${id}`);
    return deleteDoc(feedbackDocumentReference);
  }
}
function uuidv4() {
  throw new Error('Function not implemented.');
}

