import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Solde } from '../fake-data/solde';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedIdDocRefSoldeSource = new BehaviorSubject<string>('default');
  private sharedSoldeSource = new BehaviorSubject<Solde>({solde: 0, user: '', id:''})

  sharedIdDocRefSolde$ = this.sharedIdDocRefSoldeSource.asObservable();
  sharedSolde$ = this.sharedSoldeSource.asObservable();

  updateIdDocRefSolde(newValue: string) {
    console.log("Shared Service Called with new Value of IdDocRefSolde : ", newValue)
    this.sharedIdDocRefSoldeSource.next(newValue);
  }

  updateSolde(newSolde: Solde) {
    console.log("Shared Service Called with new Value of Solde : ", newSolde)
    this.sharedSoldeSource.next(newSolde)
  }
}
